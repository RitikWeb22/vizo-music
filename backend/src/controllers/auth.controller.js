const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const redis = require("../config/cache");
const userModel = require("../models/auth.model");

async function register(req, res) {
  const { username, email, password } = req.body;

  //check if user already exists
  const userExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // hash password
  const newPassword = await bcrypt.hash(password, 10);
  // create user
  const user = await userModel.create({
    username,
    email,
    password: newPassword,
  });

  // create token
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );
  res.cookie("token", token);

  res.status(201).json({ message: "User Registered successfully", user });
}

async function login(req, res) {
  const { email, username, password } = req.body;
  // check if user exists
  const user = await userModel
    .findOne({ $or: [{ email }, { username }] }).select("+password");
    
  
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  // check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  // create token
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );
  res.cookie("token", token);
  res.status(200).json({ message: "Login successful", user });
}

async function getMe(req, res) {

  const user = await userModel.findOne({ _id: req.user.id })
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ message: "User fetched successfully", user });
}

// logout function
async function logout(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }
  res.clearCookie("token");
  // add token to blacklisting model
  await redis.set(token, "blacklisted", "EX", 60 * 60);
  res.status(200).json({ message: "Logout successful" });
}
module.exports = { register, login, getMe, logout };
