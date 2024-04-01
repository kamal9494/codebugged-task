const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authorization denied: Token not provided",
      });
    }

    const key =
      "94af4a50289ac3d80677038cbcb31b8d450ee8e9b1be43867908e486cd64bbd72cb52d3f233314f91664361b202dcbe5fd200087141529953c35a80fd765a9aa";

    const decoded = jwt.verify(token, key);

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = verifyToken;
