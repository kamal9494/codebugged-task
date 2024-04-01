const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); // Commented out for now
const faceapi = require("face-api.js");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const ImageRoute = require("./routes/imgRoutes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
const PORT = process.env.PORT || 3000;
const MODEL_URL = "/model";

// console.log(faceapi.nets);

Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromDisk(path.join(__dirname, "model")),
  faceapi.nets.faceLandmark68Net.loadFromDisk(path.join(__dirname, "model")),
  faceapi.nets.faceRecognitionNet.loadFromDisk(path.join(__dirname, "model")),
])
  .then(() => console.log("Face-API.js models loaded"))
  .catch((error) => console.error("Error loading Face-API.js models:", error));

// MongoDB connection
const url =
  "mongodb+srv://admin:admin@cluster0.dhoaxpq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(url)
  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((err) => {
    console.log("Error with connecting mongodb");
    console.info(err);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/images", ImageRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
