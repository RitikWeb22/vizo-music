import { songFetch } from "../services/song.api";
import { useContext } from "react";
import { SongContext } from "../song.context";

export const useSong = () => {
  const context = useContext(SongContext);
  const { songs, setSongs, loading, setLoading } = context;

  async function handleGetSong({ mood }) {
    try {
      setLoading(true);
      const data = await songFetch({ mood });
      // backend returns { songs: [...] }
      const list = data.songs || [];
      if (list.length > 0) {
        // pick the first song for now
        setSongs(list[0]);
      }
    } catch (error) {
      console.error("Error fetching song:", error);
    } finally {
      setLoading(false);
    }
  }

  return { songs, loading, handleGetSong };
};

