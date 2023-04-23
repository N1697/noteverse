import express from "express";
import dotenv from "dotenv";
import noteRoutes from "../backend/routes/noteRoutes.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/", (req, res) => {
  res.send("API is running");
});
app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT: ${PORT}`);
});
