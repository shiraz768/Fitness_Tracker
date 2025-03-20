// server.js
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/userRoutes");
const routineRoutes = require("./routes/routineRoutes");
const categoryRoutes= require("./routes/categoryRoutes");
const tagRoutes = require("./routes/tagRoutes");
const mealTypeRoutes = require("./routes/mealTypeRoutes");
const nutritionRoutes = require("./routes/nutritionRoutes");
const progressTrackerRoutes = require("./routes/progressRoutes");
const userPreferencesRoutes = require("./routes/userPreferencesRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const goalsRoutes = require("./routes/goalRoutes")
dotenv.config();
const app = express();

app.use("/uploads", express.static("uploads"));
connectDB();

app.get("/", (req, res) => {
    res.send("Fitness Tracker API is running...");
});



app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 




app.use("/api/auth/", authRoutes);
app.use("/api/workout", routineRoutes )
app.use("/api/categories", categoryRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/mealtypes",mealTypeRoutes);
app.use("/api/nutrition", nutritionRoutes )
app.use("/api/progress",progressTrackerRoutes );
app.use("/api/preferences", userPreferencesRoutes);
app.use("/api/reminders",reminderRoutes);
app.use("/api/goals",goalsRoutes) 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
