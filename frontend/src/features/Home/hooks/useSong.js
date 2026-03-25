import { songFetch } from "../services/song.api";
import { useContext } from "react";
import { SongContext } from "../song.context";

const VALID_MOODS = ["happy", "sad", "surprised", "neutral"];

export const useSong = () => {
  const context = useContext(SongContext);
  const { songs, setSongs, loading, setLoading, setShouldAutoplay } = context;

  async function handleGetSong({ mood }) {
    const normalized =
      typeof mood === "string" && VALID_MOODS.includes(mood.toLowerCase())
        ? mood.toLowerCase()
        : "neutral";

    try {
      setLoading(true);
      const data = await songFetch({ mood: normalized });
      const list = data.songs || [];
      if (list.length > 0) {
        setSongs(list[0]);
        setShouldAutoplay(true);
      }
    } catch (error) {
      console.error("Error fetching song:", error);
    } finally {
      setLoading(false);
    }
  }

  return { songs, setSongs, setShouldAutoplay, loading, handleGetSong };
};

