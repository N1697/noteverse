import express from "express";
import {
  getNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/noteControllers.js";

const router = express.Router();

router.route("/").get(getNotes);
router.route("/:id").get(getSingleNote);
router.route("/").post(createNote);
router.route("/:id").put(updateNote);
router.route("/:id").delete(deleteNote);

export default router;
