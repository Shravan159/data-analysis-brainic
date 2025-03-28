
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");


// ✅ Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://shravankanna159:wJZVJ1hi0Oy5DIgw@cluster1.g0fnrue.mongodb.net/userDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Atlas Connected Successfully!"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));


// ✅ Define Schema
const StudentSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  course: String,
  emailSentDays: Number,
});

const Student = mongoose.model("students", StudentSchema); // Collection: students

// ✅ List of Domains
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

// ✅ Homepage - Show student counts per domain
app.get("/", async (req, res) => {
  let domainCounts = {};

  for (let domain of domains) {
    let students = await Student.find({ course: domain }); // Fetch all students for debugging
    console.log(`Domain: ${domain}, Count: ${students.length}, Students:`, students);
    domainCounts[domain] = students.length;
  }

  res.render("index", { domainCounts });
});

// ✅ Fetch students based on selected domain
app.get("/domain/:course", async (req, res) => {
  const courseName = req.params.course;
  const students = await Student.find({ course: new RegExp("^" + courseName.trim() + "$", "i") });

  res.render("domain", { courseName, students });
});

// ✅ Start Server
app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));