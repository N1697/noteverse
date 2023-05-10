import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  setProfile,
} from "../controllers/userControllers.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").post(protect, setProfile);
router.route("/getUser").get(protect, getUser);

export default router;
