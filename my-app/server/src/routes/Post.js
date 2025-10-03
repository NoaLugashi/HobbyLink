import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

// כל הפוסטים של מי שאני עוקב אחריו
router.get("/following", requireAuth, async (req, res) => {
    console.log("▶ HIT /posts/following by", req.user?.email);
    try {
        // נניח שיש לכל User שדה following = מערך של ObjectId
        const me = await User.findById(req.user._id).populate("following");
        if (!me) return res.status(404).json({ error: "User not found" });

        const ids = me.following.map((u) => u._id);
        const posts = await Post.find({ userId: { $in: ids } })
            .populate("userId", "email")
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (e) {
        res.status(500).json({ error: "Server error" });
    }
});

// יצירת פוסט חדש
router.post("/", requireAuth, async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) return res.status(400).json({ error: "Missing fields" });

        const created = await Post.create({
            title,
            content,
            userId: req.user._id,
        });

        res.status(201).json(created);
    } catch (e) {
        res.status(500).json({ error: "Server error" });
    }
});

export default router;