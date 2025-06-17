
import process from"node:process";
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";


dotenv.config(); // reads my credentials from the other file

const app = express();
app.use(express.json());
app.use(cors());

// db connection 
const db = mysql.createConnection({
  host: process.env.DB_HOST ,
  user: process.env.DB_USER  ,
  password: process.env.DB_PASS , 
  database: process.env.DB_NAME ,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

// API for registering a patient
app.post("/register", async (req, res) => {
  const { firstName, lastName, dateOfBirth,sex , cellphone,address  } = req.body;

  try {
    const sql = "INSERT INTO patients (firstName, lastname, dateOfBirth,sex , cellphone,address) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await db.promise().query(sql, [firstName, lastName, dateOfBirth,sex , cellphone,address]);

    res.status(200).json({ message: "Patient registered successfully!", patientId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: "Error inserting data", details: error.message });
  }
});

//for login in
// API for logging in a user

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Only fetch by email — bcrypt handles the password comparison
    const [rows] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// 🚀 Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});