const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const { identifyUser } = require("../middlewares/middleware");

const authRouter = Router();

// Registration
authRouter.post("/register", authController.register);

// Login
authRouter.post("/login", authController.login);

// Get current user
authRouter.get("/get-me",identifyUser , authController.getMe);

// Logout
authRouter.get("/logout", authController.logout);

module.exports = authRouter;