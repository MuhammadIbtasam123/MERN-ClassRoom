import express from "express";
import { getImage } from "../controllers/imageController.js";

const router = express.Router();

// Route to get image data
router.get("/images/:id", getImage);

export default router;
