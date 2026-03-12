const mysql = require("mysql2/promise");
require("dotenv").config({ path: 'd:/Torado/server/.env' });

async function checkAndFix() {
    try {
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        // Check Columns
        const [cols] = await db.query("SHOW COLUMNS FROM products");
        console.log("Columns:", cols.map(c => c.Field));

        // Insert test product
        const name = "Test Product " + Date.now();
        await db.query("INSERT INTO products (name, price, description, image_url) VALUES (?, ?, ?, ?)",
            [name, 99.99, "Test Desc", "https://placehold.co/100x100"]);

        console.log("✅ Successfully inserted test product");

        const [rows] = await db.query("SELECT * FROM products");
        console.log("Total Products:", rows.length);

        await db.end();
    } catch (err) {
        console.error("❌ Error:", err.message);
    }
}
checkAndFix();
