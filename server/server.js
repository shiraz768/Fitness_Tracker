// server.js
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();


connectDB();

app.get("/", (req, res) => {
    res.send("🏋️‍♂️ Fitness Tracker API is running...");
});
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this to parse form data

// ✅ Use the authentication routes
app.use("/api/auth/", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
