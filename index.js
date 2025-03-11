require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const schoolRoutes = require("./src/routes/schoolRoutes");
const { setupDatabase } = require("./src/config/database");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", schoolRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "School Management API is running" });
});

// Initialize database and start server
setupDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to set up database:", err);
    process.exit(1);
  });
