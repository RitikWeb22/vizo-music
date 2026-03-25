import { createContext, useState } from "react";

const DEFAULT_SONG = {
  url: "",
  posterUrl: "https://placehold.co/480x480/1f2937/4ade80?text=♫",
  title: "Detect your mood to play music",
  mood: "neutral",
};

export const SongContext = createContext();

export function SongProvider({ children }) {
  const [songs, setSongs] = useState(DEFAULT_SONG);
  const [loading, setLoading] = useState(false);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);

  const clearAutoplay = () => setShouldAutoplay(false);

  return (
    <SongContext.Provider
      value={{
        songs,
        setSongs,
        loading,
        setLoading,
        shouldAutoplay,
        setShouldAutoplay,
        clearAutoplay,
      }}
    >
      {children}
    </SongContext.Provider>
  );
}
