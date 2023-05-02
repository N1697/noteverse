import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/userControllers.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getUser").get(protect, getUser);

export default router;
