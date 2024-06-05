// getAssignemntRoute.js
import express from "express";
import { getAssignemnt } from "../controllers/getAssignment.js"; // Corrected import path

const router = express.Router();

// Route to get image data
router.get("/assignemnts/:id", getAssignemnt);
router.get("/assignemntRubric/:id", getAssignemnt);

export default router;
