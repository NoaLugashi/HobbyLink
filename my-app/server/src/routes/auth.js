import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();   // ← כאן יוצרים את router

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body || {};
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const exists = await User.findOne({ email });
        if (exists) return res.status(409).json({ error: "Email already in use" });

        const passwordHash = await bcrypt.hash(password, 12);
        const user = await User.create({ email, passwordHash });

        const token = jwt.sign(
            { sub: user._id.toString(), email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.status(201).json({ token, user: { email: user.email } });
    } catch (e) {
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body || {};
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign(
            { sub: user._id.toString(), email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.json({ token, user: { email: user.email } });
    } catch (e) {
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/me", requireAuth, async (req, res) => {
    res.json({ user: { email: req.user.email } });
});

export default router;   // ← ייצוא ברירת־מחדל