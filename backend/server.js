import express from "express";
import dotenv from "dotenv";
import noteRoutes from "../backend/routes/noteRoutes.js";
import userRoutes from "../backend/routes/userRoutes.js";
import cors from "cors";
import connectDB from "./config/db.js";
import colors from "colors";
import errorHandler from "./middlewares/errorMiddleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

dotenv.config();
connectDB();

//Routes
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/", (req, res) => {
  res.send("API is running");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT: ${PORT}`);
});
