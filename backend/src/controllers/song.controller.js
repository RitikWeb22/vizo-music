const songModel = require("../models/song.model");
const storageServices = require("../services/upload");
const id3 = require("node-id3");

async function uploadSong(req, res) {
  try {


    const { mood } = req.body;

    const songBuffer = req.file.buffer;
    const tags = id3.read(songBuffer);

    const [songFile, songPoster] = await Promise.all([
      storageServices.uploadFile({
        buffer: songBuffer,
        fileName: tags.title + ".mp3",
        folder: "/moodify/songs",
      }),
      storageServices.uploadFile({
        buffer: tags.image.imageBuffer,
        fileName: tags.title + ".jpeg",
        folder: "/moodify/poster",
      }),
    ]);

    const song = await songModel.create({
      url: songFile.url,
      posterUrl: songPoster.url,
      title: tags.title,
      mood,
    });

    return res.status(201).json({
      message: "Song uploaded successfully",
      song,
    });
  } catch (error) {
    console.error("Error uploading song:", error);
    return res
      .status(500)
      .json({ message: "Error uploading song", error: error.message });
  }
}

// fetch songs by mood (or all if no mood)
async function songPlay(req, res) {
  try {
    const { mood } = req.query;
    const limitRaw = req.query.limit;

    const limit =
      typeof limitRaw === "string" && limitRaw.trim() !== ""
        ? Math.max(1, Math.min(50, Number(limitRaw)))
        : 1;

    const pipeline = [];

    // mood is optional: if provided, filter by mood
    if (typeof mood === "string" && mood.trim() !== "") {
      pipeline.push({ $match: { mood: mood.trim() } });
    }

    // random selection
    pipeline.push({ $sample: { size: limit } });

    const songs = await songModel.aggregate(pipeline);

    return res.status(200).json({
      message: "Songs fetched successfully",
      songs,
    });
  } catch (error) {
    console.error("Error fetching songs:", error);
    return res
      .status(500)
      .json({ message: "Error fetching songs", error: error.message });
  }
}

module.exports = { uploadSong, songPlay };