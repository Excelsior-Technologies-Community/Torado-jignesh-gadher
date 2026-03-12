const express = require("express");
const router = express.Router();
const { registerUser, loginUser, verifyOTP, resendOTP, updateActivity } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/ping", updateActivity);

module.exports = router;    