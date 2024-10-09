const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const User = require("./models"); // Ensure your models path is correct

// CORS configuration
app.use(cors({
  origin: "*", // Allows all origins (for testing; specify origins in production)
  methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization"
}));

// Parse incoming JSON requests
app.use(express.json());

// Handle preflight (OPTIONS) requests
app.options("*", cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/spacenest") // Removed deprecated options
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Create a new user
app.post("/api/spacenest/user", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

// Get all users
app.get("/api/spacenest/user", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

// Delete a user by ID
app.delete("/api/spacenest/user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

// Update a user by ID (PATCH)
app.patch("/api/spacenest/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true // Ensures that the updates meet schema requirements
    });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

// Update a user by ID (PUT)
app.put("/api/spacenest/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

// Start the server
app.listen(4000, () => {
  console.log("Server has started on port 4000");
});
