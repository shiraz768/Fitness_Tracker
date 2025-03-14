// server.js
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/userRoutes");
const routineRoutes = require("./routes/routineRoutes");
const categoryRoutes= require("./routes/categoryRoutes");
const tagRoutes = require("./routes/tagRoutes")
dotenv.config();
const app = express();


connectDB();

app.get("/", (req, res) => {
    res.send("🏋️‍♂️ Fitness Tracker API is running...");
});
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this to parse form data




app.use("/api/auth/", authRoutes);
app.use("/api/workout", routineRoutes )
app.use("/api/categories", categoryRoutes);
app.use("/api/tags", tagRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
