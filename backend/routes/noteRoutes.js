import express from "express";
import {
  getNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/noteControllers.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getNotes);
router.route("/:id").get(protect, getSingleNote);
router.route("/").post(protect, createNote);
router.route("/:id").put(protect, updateNote);
router.route("/:id").delete(protect, deleteNote);

export default router;
