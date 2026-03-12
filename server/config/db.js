const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test connection
db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Database Connection Failed:");
        console.error("Error Code:", err.code);
        console.error("Message:", err.message);
    } else {
        console.log("✅ Database Connected (Pool established)");
        connection.release();
    }
});

module.exports = db.promise();