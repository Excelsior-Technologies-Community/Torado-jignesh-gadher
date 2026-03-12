const mysql = require("mysql2/promise");
require("dotenv").config({ path: 'd:/Torado/server/.env' });

async function upgrade() {
    try {
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log("Checking and adding missing columns...");
        const [cols] = await db.query("SHOW COLUMNS FROM products");
        const names = cols.map(c => c.Field);

        if (!names.includes('badge')) {
            await db.query("ALTER TABLE products ADD COLUMN badge VARCHAR(20)");
            console.log("Added badge column");
        }
        if (!names.includes('badge_type')) {
            await db.query("ALTER TABLE products ADD COLUMN badge_type VARCHAR(20)");
            console.log("Added badge_type column");
        }
        if (!names.includes('old_price')) {
            await db.query("ALTER TABLE products ADD COLUMN old_price DECIMAL(10, 2)");
            console.log("Added old_price column");
        }
        if (!names.includes('rating')) {
            await db.query("ALTER TABLE products ADD COLUMN rating DECIMAL(3,1) DEFAULT 0");
            console.log("Added rating column");
        }
        if (!names.includes('reviews_count')) {
            await db.query("ALTER TABLE products ADD COLUMN reviews_count INT DEFAULT 0");
            console.log("Added reviews_count column");
        }
        if (!names.includes('category_id')) {
            await db.query("ALTER TABLE products ADD COLUMN category_id INT");
            console.log("Added category_id column");
        }

        console.log("✅ Database columns upgraded!");
        await db.end();
    } catch (err) {
        console.error("Error:", err.message);
    }
}
upgrade();
