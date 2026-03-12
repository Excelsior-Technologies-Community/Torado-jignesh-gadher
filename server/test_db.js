const mysql = require("mysql2/promise");
require("dotenv").config({ path: 'd:/Torado/server/.env' });
async function test() {
    try {
        console.log("Connecting with:", {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME
        });
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        const [rows] = await db.query("SELECT * FROM categories");
        console.log("Categories found:", rows.length);
        console.log(rows);

        const [users] = await db.query("SELECT * FROM users");
        console.log("Users found:", users.length);
        console.log(users);

        const [otps] = await db.query("SELECT * FROM otps");
        console.log("OTPs found:", otps.length);
        console.log(otps);

        await db.end();
    } catch (err) {
        console.error("DB Test Error:", err.message);
    }
}
test();
