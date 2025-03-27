const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/userDB")
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Define Schema
const StudentSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  course: String,
  emailSentDays: Number,
});

const Student = mongoose.model("students", StudentSchema); // Connect to 'students' collection

// List of 10 Domains
const domains = [
  "Artificial Intelligence",
  "Web Development",
  "Data Science",
  "Cyber Security",
  "Blockchain",
  "Machine Learning",
  "IoT",
  "Cloud Computing",
  "Embedded Systems",
  "Game Development"
];

// Route for homepage - Show 10 domain buttons
app.get("/", async (req, res) => {
    let domainCounts = {};
  
    // Count students for each domain
    for (let domain of domains) {
      domainCounts[domain] = await Student.countDocuments({ course: domain });
    }
  
    res.render("index", { domainCounts });
  });
// Route to fetch students based on selected domain
app.get("/domain/:course", async (req, res) => {
  const courseName = req.params.course;
  const students = await Student.find({ course: courseName });
  res.render("domain", { courseName, students });
});

// Start server
app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
