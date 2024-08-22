const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientHealthMetricsRoutes = require("./routes/patientHealthMetricsRoutes");
const { verifyToken } = require("./jwt-middleware");

const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "https://healthcare-pro.netlify.app" }));

// MongoDB Connection
mongoose.connect(MONGO_URI);
mongoose.connection.on("connected", () => console.log("Connected to MongoDB"));
mongoose.connection.on("error", (err) =>
  console.log("Error connecting to MongoDB:", err)
);

app.get("/", (req, res) => {
  res.send("Welcome to the Healthcare API!");
});
app.get("/ping", (_, res) => {
  res.send("pong");
});
app.use("/api/doctors", doctorRoutes);
app.use(verifyToken);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/patient-health-metrics", patientHealthMetricsRoutes);

module.exports = app;
