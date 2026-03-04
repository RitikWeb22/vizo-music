import { createContext, useState } from "react";

export const SongContext = createContext();

export function SongProvider({ children }) {
  const [songs, setSongs] = useState({
    url: "https://ik.imagekit.io/3wi7dthyny/moodify/songs/Angaaron__From__Pushpa_2_The_Rule____DownloadMing.WS__qaL2IOgyF.mp3?updatedAt=1772569164999",
    posterUrl:
      "https://ik.imagekit.io/3wi7dthyny/moodify/poster/Angaaron__From__Pushpa_2_The_Rule____DownloadMing.WS__pIur_wmfM.jpeg?updatedAt=1772569163183",
    title: 'Angaaron (From "Pushpa 2 The Rule") [DownloadMing.WS]',
    mood: "happy",
  });

  const [loading, setLoading] = useState(false);

  return (
    <SongContext.Provider value={{ songs, setSongs, loading, setLoading }}>
      {children}
    </SongContext.Provider>
  );
}
