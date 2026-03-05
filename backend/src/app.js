const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const defaultOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
];

app.use(
    cors({
        origin: [...new Set([...defaultOrigins, ...allowedOrigins])],
        credentials: true,
    })
);
app.use(express.static("public"))

// routes
const authRouter = require("./routes/auth.route");
const songRouter = require("./routes/song.route");
app.use("/api/auth", authRouter);


// song route
app.use("/api/songs", songRouter)
module.exports = app;
