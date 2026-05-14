const express = require("express");
const cors = require("cors");

require("dotenv").config();

const pool = require("./config/db");
const enquiryRoutes = require("./routes/enquiries");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/enquiries", enquiryRoutes);

app.get("/", async (req, res) => {
  try {
    await pool.query("SELECT NOW()");
    res.send("Database Connected Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Database Connection Failed");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
