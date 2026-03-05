const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.static("public"))

// routes
const authRouter = require("./routes/auth.route");
const songRouter = require("./routes/song.route");
app.use("/api/auth", authRouter);


// song route
app.use("/api/songs", songRouter)
module.exports = app;
