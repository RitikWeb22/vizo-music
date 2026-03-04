const { Router } = require("express");
const songController = require("../controllers/song.controller");
const multer = require("multer");

// 10 MB size limit for uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});
    
const songRouter = Router();

/**
 * @route -  POST /api/songs/upload-song
 * @desc  -  Upload a song file
 */
songRouter.post(
  "/upload-song",
  upload.single("song"),
  songController.uploadSong,
);

/**
 * @route -  GET /api/songs
 * @query -  mood (optional: happy | sad | surprised | neutral)
 * @desc  -  Fetch songs by mood or all songs
 */
songRouter.get("/", songController.songPlay);

module.exports = songRouter;