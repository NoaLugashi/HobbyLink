import express from "express";
import Hobby from "../models/Hobby.js";

const router = express.Router();

// GET /api/hobbies?userId=required/optional
router.get("/", async (req, res) => {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    const hobbies = await Hobby.find(filter).sort({ createdAt: -1 });
    res.json(hobbies);
});

// POST /api/hobbies  { name, description, userId }
router.post("/", async (req, res) => {
    const { name, description, userId } = req.body;
    const created = await Hobby.create({ name, description, userId });
    res.status(201).json(created);
});

// DELETE /api/hobbies/:id
router.delete("/:id", async (req, res) => {
    await Hobby.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

export default router;