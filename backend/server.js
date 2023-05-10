import express from "express";
import dotenv from "dotenv";
import noteRoutes from "../backend/routes/noteRoutes.js";
import userRoutes from "../backend/routes/userRoutes.js";
import cors from "cors";
import connectDB from "./config/db.js";
import colors from "colors";
import errorHandler from "./middlewares/errorMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

dotenv.config();
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

//========== DEPLOYMENT ==========
if (process.env.NODE_ENV === "production") {
  const frontendBuildPath = path.join(__dirname, "../frontend/build");
  app.use(express.static(frontendBuildPath));

  app.get("*", (req, res) => {
    const indexHtmlPath = path.resolve(frontendBuildPath, "index.html");
    res.sendFile(indexHtmlPath);
  });
} else {
  app.get("/", (req, res) => res.send("Not in production environment"));
}
//========== DEPLOYMENT ==========

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
