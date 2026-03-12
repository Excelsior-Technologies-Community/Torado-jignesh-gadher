const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global Logging Middleware
app.use((req, res, next) => {
    console.log(`${new Date().toLocaleTimeString()} - ${req.method} ${req.url}`);
    if (Object.keys(req.body).length > 0) {
        console.log("Body:", req.body);
    }
    next();
});

// Import Routes
const authRoutes = require("./routes/authRoutes");

// Use Routes
app.use("/api/auth", authRoutes);

// ================= DATABASE INITIALIZATION =================
const initDB = async () => {
    try {
        // 0. Users Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role ENUM('customer', 'admin') DEFAULT 'customer',
                last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        // Migration for existing users
        try { await db.query("ALTER TABLE users ADD COLUMN role ENUM('customer', 'admin') DEFAULT 'customer'"); } catch (e) { }
        try { await db.query("ALTER TABLE users ADD COLUMN last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP"); } catch (e) { }
        try { await db.query("ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP"); } catch (e) { }

        // 1. Contact Messages Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS contact_messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
                email VARCHAR(255),
                phone VARCHAR(20),
                subject VARCHAR(255),
                message TEXT,
                status ENUM('unread', 'read') DEFAULT 'unread',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // 2. Orders Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                customer_name VARCHAR(255),
                email VARCHAR(255),
                phone VARCHAR(20),
                address TEXT,
                city VARCHAR(100),
                state VARCHAR(100),
                zip VARCHAR(20),
                total_amount DECIMAL(10, 2),
                currency VARCHAR(10) DEFAULT 'INR',
                payment_method VARCHAR(50) DEFAULT 'cod',
                payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
                order_status ENUM('processing', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'processing',
                courier_name VARCHAR(100),
                tracking_number VARCHAR(100),
                order_note TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // FINAL FIX: Aligning Database Headers with correct data
        try {
            // First, make sure all columns exist (even if misplaced)
            const addCol = async (name, def) => {
                try { await db.query(`ALTER TABLE orders ADD COLUMN ${name} ${def}`); } catch (e) { }
            };
            await addCol('user_id', 'INT');
            await addCol('payment_status', "ENUM('pending', 'completed', 'failed') DEFAULT 'pending'");
            await addCol('order_status', "ENUM('processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'processing'");
            await addCol('order_note', 'TEXT');
            await addCol('currency', "VARCHAR(10) DEFAULT 'INR'");

            // Now, RE-ORDER specifically to align everything
            await db.query("ALTER TABLE orders MODIFY COLUMN currency VARCHAR(10) DEFAULT 'INR' AFTER total_amount");
            await db.query("ALTER TABLE orders MODIFY COLUMN payment_method VARCHAR(50) AFTER currency");
            await db.query("ALTER TABLE orders MODIFY COLUMN payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending' AFTER payment_method");
            await db.query("ALTER TABLE orders MODIFY COLUMN order_status ENUM('processing', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'processing' AFTER payment_status");

            // Add shipping info columns
            await addCol('courier_name', 'VARCHAR(100) AFTER order_status');
            await addCol('tracking_number', 'VARCHAR(100) AFTER courier_name');

            await db.query("ALTER TABLE orders MODIFY COLUMN order_note TEXT AFTER tracking_number");

            // Product stock migration
            try {
                const [pCols] = await db.query("SHOW COLUMNS FROM products LIKE 'stock_quantity'");
                if (pCols.length === 0) {
                    await db.query("ALTER TABLE products ADD COLUMN stock_quantity INT DEFAULT 10 AFTER category_id");
                    // Set existing products to 10 so they don't show as Out of Stock
                    await db.query("UPDATE products SET stock_quantity = 10 WHERE stock_quantity IS NULL OR stock_quantity = 0");
                    console.log("✅ Column 'stock_quantity' added to products with default 10.");
                }
            } catch (e) { }

            console.log("✅ Database Order table columns and headers aligned successfully.");
        } catch (e) {
            console.error("⚠️ Database Alignment Error:", e.message);
        }

        // 3. Order Items Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS order_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id INT,
                product_id INT,
                product_name VARCHAR(255),
                quantity INT,
                price DECIMAL(10, 2)
            )
        `);

        // 4. Blog Comments Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS blog_comments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
                email VARCHAR(255),
                comment TEXT,
                blog_id INT DEFAULT 1,
                status ENUM('pending', 'approved') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        // Update existing status column if needed
        try {
            await db.query("ALTER TABLE blog_comments MODIFY COLUMN status ENUM('pending', 'approved', 'unread') DEFAULT 'pending'");
            // Migrate old 'unread' data to 'pending'
            await db.query("UPDATE blog_comments SET status = 'pending' WHERE status = 'unread'");
            // Now finalize enum to remove 'unread'
            await db.query("ALTER TABLE blog_comments MODIFY COLUMN status ENUM('pending', 'approved') DEFAULT 'pending'");
        } catch (e) { console.log("Migration error:", e.message); }

        // 5. Admins Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS admins (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) UNIQUE,
                email VARCHAR(255) UNIQUE,
                password VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // 6. OTPs Table (Persistent)
        await db.query(`
            CREATE TABLE IF NOT EXISTS otps (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                otp VARCHAR(10) NOT NULL,
                type ENUM('login', 'register') DEFAULT 'login',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("🚀 Database: OTPs table synced.");

        // Seed default admin if none exists
        const [admins] = await db.query("SELECT * FROM admins LIMIT 1");
        if (admins.length === 0) {
            const bcrypt = require("bcryptjs");
            const hashedPassword = await bcrypt.hash("admin123", 10);
            await db.query(
                "INSERT INTO admins (username, email, password) VALUES (?, ?, ?)",
                ["admin", "admin@torado.com", hashedPassword]
            );
            console.log("👤 Default admin created: admin@torado.com / admin123");
        }

        console.log("✅ Database initialized (All tables ready)");
    } catch (err) {
        console.error("❌ Database initialization failed:", err.message);
    }
};
initDB();

// ================= CONTACT API =================

// Transporter for Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Post contact message
app.post("/api/contact", async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    // Backend Validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, Email and Message are required" });
    }

    try {
        const query = `INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await db.query(query, [name, email, phone, subject, message]);

        // Send Email Notification to Admin
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL || "admin@torado.com",
            subject: `📩 New Contact Message: ${subject || "No Subject"}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #411151;">New Message Received</h2>
                    <p><strong>From:</strong> ${name} (${email})</p>
                    <p><strong>Phone:</strong> ${phone || "N/A"}</p>
                    <p><strong>Subject:</strong> ${subject || "N/A"}</p>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 10px;">
                        <strong>Message:</strong><br/>
                        ${message}
                    </div>
                </div>
            `
        };

        // Send Confirmation to User
        const userMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "We received your message! - TORADO",
            html: `
                <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 10px; text-align: center;">
                    <h1 style="color: #f17840;">Hi ${name}!</h1>
                    <p>Thank you for contacting <strong>TORADO</strong>. We've received your message regarding "<strong>${subject || "General Inquiry"}</strong>".</p>
                    <p>Our team will get back to you within 24-48 hours.</p>
                    <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; color: #999; font-size: 12px;">
                        &copy; 2026 TORADO. All rights reserved.
                    </div>
                </div>
            `
        };

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            transporter.sendMail(adminMailOptions).catch(err => console.error("Admin Email Error:", err));
            transporter.sendMail(userMailOptions).catch(err => console.error("User Email Error:", err));
        }

        res.json({ message: "Success! Your message has been sent.", id: result.insertId });
    } catch (err) {
        console.error("Contact API Error:", err);
        const fs = require("fs");
        fs.appendFileSync("api_errors.log", `${new Date().toISOString()} - Contact API Error: ${err.message}\n${err.stack}\n`);
        res.status(500).json({ error: "Server Error: " + err.message });
    }
});

// Admin: Get all messages
app.get("/api/contact", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM contact_messages ORDER BY created_at DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin: Mark as read
app.put("/api/contact/:id", async (req, res) => {
    try {
        await db.query("UPDATE contact_messages SET status = 'read' WHERE id = ?", [req.params.id]);
        res.json({ message: "Message marked as read" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================= PRODUCTS API =================

// Get all products
app.get("/api/products", async (req, res) => {
    try {
        const [result] = await db.query("SELECT * FROM products ORDER BY id DESC");
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add product
app.post("/api/products", async (req, res) => {
    const { title, name, price, description, image, image_url, category_id, badge, badge_type, old_price, rating, reviews_count, stock_quantity } = req.body;
    try {
        const [cols] = await db.query("SHOW COLUMNS FROM products");
        const names = cols.map(c => c.Field);

        const fields = ["price", "description"];
        const values = [price, description];

        // Handle title/name variations
        if (names.includes('title')) { fields.push("title"); values.push(title || name); }
        else if (names.includes('name')) { fields.push("name"); values.push(name || title); }

        // Handle image/image_url variations
        if (names.includes('image')) { fields.push("image"); values.push(image || image_url); }
        else if (names.includes('image_url')) { fields.push("image_url"); values.push(image_url || image); }

        if (names.includes('category_id')) { fields.push("category_id"); values.push(category_id || 3); }
        if (names.includes('badge')) { fields.push("badge"); values.push(badge || ''); }
        if (names.includes('badge_type')) { fields.push("badge_type"); values.push(badge_type || 'new'); }
        if (names.includes('old_price')) { fields.push("old_price"); values.push(old_price || null); }
        if (names.includes('rating')) { fields.push("rating"); values.push(rating || 0); }
        if (names.includes('reviews_count')) { fields.push("reviews_count"); values.push(reviews_count || 0); }
        if (names.includes('stock_quantity')) { fields.push("stock_quantity"); values.push(stock_quantity || 0); }

        const query = `INSERT INTO products (${fields.join(", ")}) VALUES (${fields.map(() => "?").join(", ")})`;

        await db.query(query, values);
        res.json({ message: "Product Added Success" });
    } catch (err) {
        console.error("Add Product Error:", err);
        res.status(500).json({ error: "Database Error: " + err.message });
    }
});

// Delete product
app.delete("/api/products/:id", async (req, res) => {
    try {
        await db.query(
            "DELETE FROM products WHERE id = ?",
            [req.params.id]
        );
        res.json({ message: "Product Deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update product
app.put("/api/products/:id", async (req, res) => {
    const { title, name, price, description, image, image_url, category_id, badge, badge_type, old_price, stock_quantity } = req.body;
    try {
        const [cols] = await db.query("SHOW COLUMNS FROM products");
        const names = cols.map(c => c.Field);

        const updates = ["price = ?", "description = ?"];
        const values = [price, description];

        // Handle title/name variations
        if (names.includes('title')) { updates.push("title = ?"); values.push(title || name); }
        else if (names.includes('name')) { updates.push("name = ?"); values.push(name || title); }

        // Handle image/image_url variations
        if (names.includes('image')) { updates.push("image = ?"); values.push(image || image_url); }
        else if (names.includes('image_url')) { updates.push("image_url = ?"); values.push(image_url || image); }

        if (names.includes('category_id')) { updates.push("category_id = ?"); values.push(category_id || 3); }
        if (names.includes('badge')) { updates.push("badge = ?"); values.push(badge || ''); }
        if (names.includes('badge_type')) { updates.push("badge_type = ?"); values.push(badge_type || 'new'); }
        if (names.includes('old_price')) { updates.push("old_price = ?"); values.push(old_price || null); }
        if (names.includes('stock_quantity')) { updates.push("stock_quantity = ?"); values.push(stock_quantity || 0); }

        values.push(req.params.id);
        const query = `UPDATE products SET ${updates.join(", ")} WHERE id = ?`;

        await db.query(query, values);
        res.json({ message: "Product Updated" });
    } catch (err) {
        console.error("Update Product Error:", err);
        res.status(500).json({ error: "Database Error: " + err.message });
    }
});

// ================= ORDERS API =================

// Place Order
app.post("/api/orders", async (req, res) => {
    const { user_id, customer_name, email, phone, address, city, state, zip, total_amount, payment_method, order_note, items, currency } = req.body;

    if (!customer_name || !email || !items || items.length === 0) {
        return res.status(400).json({ error: "Missing required order information" });
    }

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Insert into orders
        const [orderResult] = await connection.query(
            `INSERT INTO orders (user_id, customer_name, email, phone, address, city, state, zip, total_amount, payment_method, order_note, currency) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [user_id || null, customer_name, email, phone, address, city, state, zip, total_amount, payment_method, order_note, currency || 'INR']
        );

        const orderId = orderResult.insertId;

        // 2. Insert items
        for (const item of items) {
            await connection.query(
                `INSERT INTO order_items (order_id, product_id, product_name, quantity, price) VALUES (?, ?, ?, ?, ?)`,
                [orderId, item.id, item.name, item.quantity, item.price]
            );
        }

        await connection.commit();

        // 3. Send Confirmation Email
        try {
            // Only send if configured
            if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: "📦 Order Confirmed - TORADO",
                    html: `
                        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); border: 1px solid #e0e0e0;">
                            <div style="background: #411151; padding: 40px 20px; text-align: center;">
                                <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: 2px;">TORADO</h1>
                                <p style="color: #f17840; margin: 10px 0 0; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Order Confirmation</p>
                            </div>
                            <div style="padding: 40px 30px; background: white;">
                                <h2 style="color: #253d4e; margin-top: 0;">Order #TRD-${1000 + parseInt(orderId)} Confirmed!</h2>
                                <p style="color: #666; font-size: 16px; line-height: 1.6;">Hi <strong>${customer_name}</strong>, thank you for shopping with TORADO. Your order has been successfully placed and is now being processed.</p>
                                
                                <div style="margin: 30px 0; background: #f8f9fa; padding: 25px; border-radius: 8px;">
                                    <h3 style="color: #253d4e; margin-top: 0; border-bottom: 2px solid #f17840; padding-bottom: 10px; display: inline-block;">Order Summary</h3>
                                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                                        <tr>
                                            <td style="padding: 8px 0; color: #666;"><strong>Total Amount:</strong></td>
                                            <td style="padding: 8px 0; text-align: right; color: #f17840; font-weight: bold; font-size: 18px;">${currency || 'INR'} ${total_amount}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; color: #666;"><strong>Payment Method:</strong></td>
                                            <td style="padding: 8px 0; text-align: right; color: #253d4e;">${payment_method.toUpperCase()}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; color: #666;"><strong>Shipping Address:</strong></td>
                                            <td style="padding: 8px 0; text-align: right; color: #253d4e;">${address}, ${city}, ${state} - ${zip}</td>
                                        </tr>
                                    </table>
                                </div>

                                <h3 style="color: #253d4e;">Items Ordered</h3>
                                <div style="border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
                                    <table style="width: 100%; border-collapse: collapse;">
                                        <thead style="background: #f8f9fa;">
                                            <tr>
                                                <th style="padding: 12px; text-align: left; color: #253d4e; font-size: 14px; border-bottom: 1px solid #eee;">Item</th>
                                                <th style="padding: 12px; text-align: center; color: #253d4e; font-size: 14px; border-bottom: 1px solid #eee;">Qty</th>
                                                <th style="padding: 12px; text-align: right; color: #253d4e; font-size: 14px; border-bottom: 1px solid #eee;">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${items.map(item => `
                                                <tr>
                                                    <td style="padding: 12px; color: #666; font-size: 14px; border-bottom: 1px solid #eee;">${item.name}</td>
                                                    <td style="padding: 12px; text-align: center; color: #666; font-size: 14px; border-bottom: 1px solid #eee;">${item.quantity}</td>
                                                    <td style="padding: 12px; text-align: right; color: #666; font-size: 14px; border-bottom: 1px solid #eee;">${currency || 'INR'} ${item.price}</td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>

                                <div style="margin-top: 40px; text-align: center;">
                                    <a href="http://localhost:5173/shop-grid" style="background: #f17840; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Continue Shopping</a>
                                </div>
                            </div>
                            <div style="background: #f8f9fa; padding: 30px; text-align: center; color: #999; font-size: 12px;">
                                <p>We are processing your order and will notify you once it's shipped.</p>
                                <p>If you have any questions, visit our <a href="http://localhost:5173/contact-us" style="color: #f17840; text-decoration: none;">Support Center</a></p>
                                <p style="margin-top: 20px;">&copy; 2026 TORADO. All rights reserved.</p>
                            </div>
                        </div>
                    `
                };
                await transporter.sendMail(mailOptions);
                console.log("✅ Confirmation email sent to:", email);
            } else {
                console.log("ℹ️ Email not sent: EMAIL_USER/PASS not configured in .env");
            }
        } catch (mailErr) {
            console.warn("⚠️ Failed to send order email:", mailErr.message);
        }


        res.json({ message: "Order placed successfully!", orderId });
    } catch (err) {
        await connection.rollback();
        console.error("Order API Error:", err);
        res.status(500).json({ error: "Order failed: " + err.message });
    } finally {
        connection.release();
    }
});

// Get all orders (Admin)
app.get("/api/orders", async (req, res) => {
    try {
        const [orders] = await db.query("SELECT * FROM orders ORDER BY id DESC");

        // Fetch all items with a join to get product names (resilient to schema differences)
        // Check column existence dynamically
        const [oiCols] = await db.query("SHOW COLUMNS FROM order_items");
        const oiFields = oiCols.map(c => c.Field);

        const [pCols] = await db.query("SHOW COLUMNS FROM products");
        const pFields = pCols.map(c => c.Field);

        // Build product name reference based on existing columns
        let productNameRef = oiFields.includes('product_name') ? 'oi.product_name' :
            (pFields.includes('title') ? 'p.title' :
                (pFields.includes('name') ? 'p.name' : "'Unknown Product'"));

        const [items] = await db.query(`
            SELECT 
                oi.order_id, 
                ${productNameRef} as name, 
                oi.quantity as qty, 
                oi.price 
            FROM order_items oi 
            LEFT JOIN products p ON oi.product_id = p.id
        `);

        const ordersWithItems = orders.map(order => ({
            ...order,
            items: items.filter(item => item.order_id === order.id)
        }));

        res.json(ordersWithItems);
    } catch (err) {
        console.error("Orders Fetch Error:", err);
        res.status(500).json({ error: "Failed to fetch orders: " + err.message });
    }
});

// Update order status
app.put("/api/orders/:id", async (req, res) => {
    const { status, payment_status, courier_name, tracking_number } = req.body;
    try {
        // Build query dynamically to only update provided fields
        let query = "UPDATE orders SET order_status = ?, payment_status = ?";
        let params = [status, payment_status];

        if (courier_name !== undefined && courier_name !== null) {
            query += ", courier_name = ?";
            params.push(courier_name);
        }
        if (tracking_number !== undefined && tracking_number !== null) {
            query += ", tracking_number = ?";
            params.push(tracking_number);
        }

        query += " WHERE id = ?";
        params.push(req.params.id);

        const [result] = await db.query(query, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Order not found or no changes made" });
        }

        // Notify if shipped (SEND EMAIL TO CUSTOMER)
        if (status === 'shipped' && courier_name && tracking_number) {
            console.log(`📦 Order #${req.params.id} marked as SHIPPED. Sending email...`);

            // Fetch customer email first if not available in req.body
            const [orderRows] = await db.query("SELECT email, customer_name, total_amount, currency FROM orders WHERE id = ?", [req.params.id]);
            const cust = orderRows[0];

            if (cust && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                try {
                    const shippingMailOptions = {
                        from: process.env.EMAIL_USER,
                        to: cust.email,
                        subject: `🚚 Your TORADO Order #TRD-${1000 + parseInt(req.params.id)} is Shipped!`,
                        html: `
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 15px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
                                <div style="background: #411151; padding: 30px; text-align: center;">
                                    <h1 style="color: white; margin: 0; letter-spacing: 3px;">TORADO</h1>
                                    <p style="color: #f17840; font-weight: bold; margin: 10px 0 0;">SHIPPING UPDATE</p>
                                </div>
                                <div style="padding: 40px 30px; background: white; text-align: center;">
                                    <h2 style="color: #253d4e;">Great News, ${cust.customer_name}!</h2>
                                    <p style="color: #666; font-size: 16px;">Your order has been handed over to our courier partner and is on its way to you.</p>
                                    
                                    <div style="margin: 30px 0; background: #f8f9fa; padding: 25px; border-radius: 12px; border-left: 5px solid #f17840;">
                                        <table style="width: 100%; text-align: left;">
                                            <tr>
                                                <td style="color: #888; padding: 5px 0;">Courier Partner:</td>
                                                <td style="color: #253d4e; font-weight: bold; padding: 5px 0;">${courier_name}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #888; padding: 5px 0;">Tracking Number:</td>
                                                <td style="color: #f17840; font-weight: 900; font-size: 18px; padding: 5px 0;">${tracking_number}</td>
                                            </tr>
                                        </table>
                                    </div>

                                    <div style="margin-top: 35px;">
                                        <p style="color: #888; font-size: 14px; margin-bottom: 20px;">Use the button below to track your order status in real-time:</p>
                                        <a href="http://localhost:5173/track-order" style="background: #f17840; color: white; padding: 18px 35px; text-decoration: none; border-radius: 10px; font-weight: bold; display: inline-block; box-shadow: 0 4px 10px rgba(241, 120, 64, 0.3);">TRACK MY ORDER</a>
                                    </div>
                                </div>
                                <div style="background: #f1f1f1; padding: 20px; text-align: center; color: #888; font-size: 12px;">
                                    <p>Thank you for shopping with TORADO!</p>
                                    <p>If you have any issues, reply to this email or visit our Help Center.</p>
                                </div>
                            </div>
                        `
                    };
                    await transporter.sendMail(shippingMailOptions);
                    console.log("✅ Shipping notification email sent to:", cust.email);
                } catch (mailErr) {
                    console.error("⚠️ Shipping Email Failed (Ignoring to complete DB update):", mailErr.message);
                }
            }
        }

        res.json({ message: "Order updated successfully" });
    } catch (err) {
        console.error("❌ Order Update Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// Track Order (Public)
app.get("/api/orders/track/:orderId", async (req, res) => {
    const { orderId } = req.params;
    const { email } = req.query;

    if (!orderId || !email) {
        return res.status(400).json({ error: "Order ID and Email are required" });
    }

    try {
        const input = orderId.trim();
        const userEmail = email ? email.trim() : "";

        // 1. IMPROVED: Extract number from anywhere (handles #TRD-1022, TRD-1022, #1022)
        let possibleId = null;
        const idMatch = input.match(/\d+/);
        if (idMatch) {
            possibleId = parseInt(idMatch[0]);
            // If it's the displayed version (1022), get actual DB ID (22)
            if (possibleId >= 1000 && (input.toUpperCase().includes("TRD") || input.includes("#"))) {
                possibleId -= 1000;
            }
        }

        // 2. Search by ID or EXACT Tracking Number entered by Admin
        const [orders] = await db.query(
            "SELECT id, customer_name, email, total_amount, currency, order_status, payment_status, courier_name, tracking_number, created_at FROM orders WHERE email = ? AND (id = ? OR tracking_number = ?)",
            [userEmail, possibleId, input]
        );

        if (orders.length === 0) {
            return res.status(404).json({ error: "No order found. Check your Email and Order No./Track ID." });
        }

        const order = orders[0];

        // Fetch items
        const [items] = await db.query("SELECT product_name as name, quantity as qty, price FROM order_items WHERE order_id = ?", [order.id]);
        order.items = items;

        res.json(order);
    } catch (err) {
        console.error("Tracking Error:", err);
        res.status(500).json({ error: "Failed to track order" });
    }
});


// ================= USERS API =================

// Get all users
app.get("/api/users", async (req, res) => {
    try {
        console.log("🔍 Fetching users from database...");
        const [result] = await db.query("SELECT * FROM users");
        console.log(`✅ Successfully fetched ${result.length} users`);
        res.json(result);
    } catch (err) {
        console.error("❌ Users API Database Error:", err.message);
        res.status(500).json({ error: "Database error", message: err.message });
    }
});

// Delete user
app.delete("/api/users/:id", async (req, res) => {
    try {
        await db.query("DELETE FROM users WHERE id = ?", [req.params.id]);
        res.json({ message: "User Deleted Successfully" });
    } catch (err) {
        console.error("Delete User Error:", err.message);
        res.status(500).json({ error: "Database error", message: err.message });
    }
});

// ================= BLOG COMMENTS API =================

// Post blog comment
app.post("/api/blog-comments", async (req, res) => {
    const { name, email, comment, blog_id } = req.body;

    if (!name || !email || !comment) {
        return res.status(400).json({ error: "Name, Email and Comment are required" });
    }

    try {
        const query = `INSERT INTO blog_comments (name, email, comment, blog_id) VALUES (?, ?, ?, ?)`;
        const [result] = await db.query(query, [name, email, comment, blog_id || 1]);
        res.json({ message: "Comment posted successfully!", id: result.insertId });
    } catch (err) {
        console.error("Blog Comment Error:", err);
        res.status(500).json({ error: "Failed to post comment: " + err.message });
    }
});

// Get all blog comments (Admin)
app.get("/api/blog-comments", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM blog_comments ORDER BY created_at DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Mark comment as approved
app.put("/api/blog-comments/:id/approve", async (req, res) => {
    try {
        await db.query("UPDATE blog_comments SET status = 'approved' WHERE id = ?", [req.params.id]);
        res.json({ message: "Comment approved successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete comment
app.delete("/api/blog-comments/:id", async (req, res) => {
    try {
        await db.query("DELETE FROM blog_comments WHERE id = ?", [req.params.id]);
        res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get approved comments only (for Website)
app.get("/api/blog-comments/approved", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM blog_comments WHERE status = 'approved' ORDER BY created_at DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================= ADMIN AUTH API =================

// Admin Register
app.post("/api/admin/register", async (req, res) => {
    const { username, email, password } = req.body;
    const bcrypt = require("bcryptjs");

    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if exists
        const [existing] = await db.query("SELECT * FROM admins WHERE email = ? OR username = ?", [email, username]);
        if (existing.length > 0) {
            return res.status(400).json({ error: "Admin with this email or username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            "INSERT INTO admins (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword]
        );

        res.json({ success: true, message: "Admin registered successfully!" });
    } catch (err) {
        console.error("Admin Register Error:", err);
        res.status(500).json({ error: "Failed to register admin" });
    }
});

// Admin Login
app.post("/api/admin/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(`🔑 Admin Login Attempt: ${email}`);

    const bcrypt = require("bcryptjs");
    const jwt = require("jsonwebtoken");

    try {
        const [admins] = await db.query("SELECT * FROM admins WHERE email = ?", [email]);
        if (admins.length === 0) {
            console.log(`❌ Admin email not found: ${email}`);
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const admin = admins[0];
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            console.log(`❌ Admin password mismatch for: ${email}`);
            return res.status(401).json({ error: "Invalid email or password" });
        }

        console.log(`✅ Admin login successful: ${admin.username}`);
        const token = jwt.sign(
            { id: admin.id, username: admin.username, role: 'admin' },
            process.env.JWT_SECRET || "torado_secret_key",
            { expiresIn: "1d" }
        );

        res.json({
            success: true,
            message: "Login successful",
            token,
            admin: { id: admin.id, username: admin.username, email: admin.email }
        });
    } catch (err) {
        console.error("Admin Login Error:", err);
        res.status(500).json({ error: "Server Error" });
    }
});

// Verify Token
app.get("/api/admin/verify", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const jwt = require("jsonwebtoken");
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "torado_secret_key");
        res.json({ success: true, admin: decoded });
    } catch (err) {
        res.status(401).json({ error: "Invalid Token" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});