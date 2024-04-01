const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");
const Image = require("../models/Image");
const User = require("../models/User");
const mongoose = require("mongoose");

router.post("/", verifyToken, async (req, res) => {
  try {
    const { base64Image } = req.body;
    const { username } = req.user;
    const filtered = username.toLowerCase();
    const user = await User.findOne({ username: filtered });

    const image = new Image({
      user: user._id,
      base64Image,
    });

    await image.save();

    res.status(200).json({ message: "Image uploaded successfully", image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const { username } = req.user;
    const filtered = username.toLowerCase();
    const user = await User.findOne({ username: filtered });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const images = await Image.find({ user: user._id });

    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid image ID" });
    }
    const image = await Image.findByIdAndDelete(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
