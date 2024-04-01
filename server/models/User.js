const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  faceData: [
    {
      type: Map,
      of: Number,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
