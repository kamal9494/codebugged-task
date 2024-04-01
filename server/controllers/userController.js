const faceapi = require("face-api.js");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Image = require("../models/Image");

function decodeBase64(base64String) {
  const matches = base64String.match(/^data:image\/([a-z]+);base64,(.+)$/i);
  if (!matches) {
    throw new Error("Invalid base64 image data");
  }

  const type = matches[1];
  const data = matches[2];

  console.log("Image type:", type);

  const buffer = Buffer.from(data, "base64");
  return { type, buffer };
}

exports.registerUser = async (req, res) => {
  const { descriptors, username, base64Img } = req.body;
  if (!descriptors) {
    return res.status(400).json({ message: "Face Not Found" });
  }
  try {
    const filtered = username.toLowerCase();
    const user = await User.findOne({ username: filtered });
    if (user) {
      return res.status(400).send("Username already exists");
    }
    const newUser = new User({ username: filtered, faceData: descriptors });
    await newUser.save();
    const userImage = new Image({
      base64Image: base64Img,
      user: newUser._id,
    });
    await userImage.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};