const { Readable } = require("stream");
const songModel = require("../models/song.model");
const storageServices = require("../services/upload");
const audiusApi = require("../services/audius.api");
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

// fetch songs by mood - Audius API primary, MongoDB fallback
async function songPlay(req, res) {
  try {
    const moodRaw = req.query.mood;
    const limitRaw = req.query.limit;

    const mood =
      typeof moodRaw === "string" && moodRaw.trim() !== ""
        ? moodRaw.trim().toLowerCase()
        : null;

    const limit =
      typeof limitRaw === "string" && limitRaw.trim() !== ""
        ? Math.max(1, Math.min(50, Number(limitRaw)))
        : 1;

    const validMoods = ["happy", "sad", "surprised", "neutral"];
    const effectiveMood = mood && validMoods.includes(mood) ? mood : "neutral";

    let songs = [];

    // 1. Try Audius API first (mood-based)
    try {
      const audiusTrack = await audiusApi.getSongByMood(effectiveMood);
      if (audiusTrack) {
        // Use proxy URL to avoid CORS in browser
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const proxyUrl = `${baseUrl}/api/songs/stream?url=${encodeURIComponent(audiusTrack.url)}`;
        songs = [{ ...audiusTrack, url: proxyUrl }];
      }
    } catch (audiusErr) {
      console.warn("Audius fallback:", audiusErr.message);
    }

    // 2. Fallback to MongoDB (user uploads) if Audius empty
    if (songs.length === 0) {
      const pipeline = [];
      if (effectiveMood) {
        pipeline.push({ $match: { mood: effectiveMood } });
      }
      pipeline.push({ $sample: { size: limit } });
      songs = await songModel.aggregate(pipeline);
    }

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

// Proxy audio stream to avoid CORS (for Audius & other external URLs)
async function streamProxy(req, res) {
  try {
    const { url } = req.query;
    if (!url || typeof url !== "string") {
      return res.status(400).json({ message: "Missing url parameter" });
    }

    const targetUrl = decodeURIComponent(url);
    const allowedHosts = [
      "discoveryprovider.audius.co",
      "audius-discovery",
      "audius-content",
      "cn0.mainnet.audiusindex.org",
      "ik.imagekit.io",
    ];
    const isAllowed = allowedHosts.some((h) => targetUrl.includes(h));
    if (!isAllowed) {
      return res.status(403).json({ message: "URL not allowed" });
    }

    const response = await fetch(targetUrl, {
      headers: { Range: req.headers.range || "" },
    });
    if (!response.ok) {
      return res.status(response.status).end();
    }

    const ct = response.headers.get("content-type") || "audio/mpeg";
    const cl = response.headers.get("content-length");
    res.set({
      "Content-Type": ct,
      "Accept-Ranges": "bytes",
    });
    if (cl) res.set("Content-Length", cl);

    const nodeStream = Readable.fromWeb(response.body);
    nodeStream.pipe(res);
  } catch (error) {
    console.error("Stream proxy error:", error);
    res.status(500).end();
  }
}

module.exports = { uploadSong, songPlay, streamProxy };