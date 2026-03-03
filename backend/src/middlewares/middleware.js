const redis = require("../config/cache");
const userModel = require("../models/auth.model");
const jwt = require("jsonwebtoken");

async function identifyUser(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Token not available",
      });
    }

    // Check blacklist
    const blacklist = await redis.get(token);
    if (blacklist === "blacklisted") {
      return res.status(401).json({
        message: "Token is blacklisted",
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = {
      id: user._id,
      username: user.username,
    };

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

module.exports = { identifyUser };