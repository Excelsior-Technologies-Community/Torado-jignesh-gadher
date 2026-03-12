const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../utils/mailer");

// Helper: Generate and Send OTP
const sendOtpEmail = async (email, type = 'login') => {
    const sanitizedEmail = email ? email.trim().toLowerCase() : null;
    if (!sanitizedEmail) {
        console.error("❌ Cannot send OTP: Email is empty or invalid");
        return null;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`\n-----------------------------------------`);
    console.log(`🚀 [OTP SYSTEM START]`);
    console.log(`📧 Target: ${sanitizedEmail}`);
    console.log(`🏷️ Type: ${type}`);
    console.log(`🔢 Code: ${otp}`);

    try {
        
        // Save new OTP
        console.log(`📡 [DB] Saving new OTP to database...`);
        const [saveResult] = await db.query(
            "INSERT INTO otps (email, otp, type) VALUES (?, ?, ?)",
            [sanitizedEmail, otp, type]
        );

        if (saveResult && saveResult.insertId) {
            console.log(`✅ [DB] SUCCESS: Stored with ID: ${saveResult.insertId}`);

            // IMMEDIATE VERIFY
            const [rows] = await db.query("SELECT * FROM otps WHERE id = ?", [saveResult.insertId]);
            console.log(`🔍 [DB VERIFY] Data exists in table:`, rows[0] ? "YES" : "NO");
        } else {
            throw new Error("Database insertion succeeded but returned no ID.");
        }
    } catch (dbErr) {
        console.error("❌ [DB ERROR] CRITICAL: Failed to save OTP to database!");
        console.error("Reason:", dbErr.message);
        // We THROW here so the controller stops and doesn't send a fake success response
        throw new Error("OTP Storage Failure: " + dbErr.message);
    }

    // 3. Send Email (Only if DB was successful)
    try {
        console.log(`📧 [MAIL] Sending email...`);
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: sanitizedEmail,
            subject: `🔐 TORADO ${type.toUpperCase()} OTP: ${otp}`,
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                    <h2 style="color: #f17840;">TORADO Verification</h2>
                    <p>Your ${type} verification code is:</p>
                    <div style="font-size: 32px; font-weight: bold; background: #f4f4f4; padding: 10px; display: inline-block; letter-spacing: 5px;">
                        ${otp}
                    </div>
                </div>
            `
        };

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await transporter.sendMail(mailOptions);
            console.log(`✅ [MAIL] SUCCESS: Email sent to ${sanitizedEmail}`);
        } else {
            console.warn(`⚠️ [MAIL] Email credentials missing. OTP is [${otp}]`);
        }
    } catch (mailErr) {
        console.error("❌ [MAIL FAILED]:", mailErr.message);
        // We don't necessarily throw here because it's already in the DB, 
        // but we'll return the OTP for the user to see in terminal
    }

    console.log(`🚀 [OTP SYSTEM COMPLETE]`);
    console.log(`-----------------------------------------\n`);
    return otp;
};

// Register Controller
exports.registerUser = async (req, res) => {
    const { name, password } = req.body;
    const email = req.body.email ? req.body.email.trim().toLowerCase() : null;

    try {
        // Check if user already exists
        const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existing.length > 0) return res.status(400).json({ message: "Email already registered" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password || "default_pass", 10);

        // Insert user
        const [result] = await db.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name || "No Name", email || `user_${Date.now()}@test.com`, hashedPassword]
        );

        const userId = result.insertId;
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" });

        // Trigger OTP
        await sendOtpEmail(email, 'register');

        res.status(201).json({
            success: true,
            message: "Registration successful. OTP sent.",
            token,
            user: { id: userId, name: name || "No Name", email }
        });
    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ success: false, message: error.message || "Registration failed." });
    }
};

// Login Controller
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(`\n📥 [LOGIN ATTEMPT] Email: ${email}`);

    try {
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (users.length === 0) {
            console.warn(`❌ [LOGIN] User not found: ${email}`);
            return res.status(401).json({ message: "Invalid email" });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.warn(`❌ [LOGIN] Wrong password for: ${email}`);
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" });

        // IMPORTANT: Use user.email from DB record to ensure match
        console.log(`\n🔑 [LOGIN SUCCESS] Password verified for: ${email}`);
        console.log(`⚙️ [LOGIN] Triggering sendOtpEmail for login storage...`);

        await sendOtpEmail(user.email, 'login');

        res.json({
            success: true,
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error("❌ [LOGIN] Server Error:", error);
        res.status(500).json({ success: false, message: error.message || "Login failed" });
    }
};

// Verify OTP Controller
exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    console.log(`🔍 VERIFYING: ${email} provided code ${otp}`);
    try {
        const [rows] = await db.query("SELECT * FROM otps WHERE email = ? AND otp = ?", [email, otp]);

        if (rows.length > 0) {
            console.log(`✅ OTP MATCH FOUND. Keeping record in DB...`);
            // await db.query("DELETE FROM otps WHERE email = ?", [email]);
            await db.query("UPDATE users SET last_seen = NOW() WHERE email = ?", [email]);
            res.json({ success: true, message: "OTP verified" });
        } else {
            console.warn(`❌ OTP MISMATCH for ${email}`);
            res.status(400).json({ success: false, message: "Invalid OTP" });
        }
    } catch (error) {
        console.error("❌ Verification error:", error);
        res.status(500).json({ success: false, message: "Verification error" });
    }
};

// Update Activity Controller
exports.updateActivity = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false });

    try {
        await db.query("UPDATE users SET last_seen = NOW() WHERE email = ?", [email]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
};

// Resend OTP Controller
exports.resendOTP = async (req, res) => {
    const { email, type } = req.body; // Expect type from frontend if possible
    console.log(`🔄 RESEND REQUEST: ${email}`);
    try {
        await sendOtpEmail(email, type || 'login');
        res.json({ success: true, message: "OTP Resent Successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to resend OTP" });
    }
};