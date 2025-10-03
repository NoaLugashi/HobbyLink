import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './src/routes/auth.js';
import postRoutes from "./src/routes/Post.js";
import hobbyRoutes from "./src/routes/Hobby.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use("/api/posts", postRoutes);
app.use("/api/hobbies", hobbyRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('MongoDB error', err);
        process.exit(1);
    });

app.use('/api/auth', authRouter);

const port = process.env.PORT || 4000;
app.get("/api/health", (_req, res) => res.send("OK"));
app.listen(port, () => console.log(`API listening on ${port}`));