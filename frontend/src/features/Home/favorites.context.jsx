import { createContext, useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "moodify_favorites";

export const FavoritesContext = createContext();

function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFavorites(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn("Could not save favorites", e);
  }
}

function getSongId(song) {
  return [song.url, song.title].filter(Boolean).join("::") || Math.random().toString();
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFavorites);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const isFavorite = useCallback(
    (song) => {
      if (!song?.url) return false;
      const id = getSongId(song);
      return favorites.some((f) => getSongId(f) === id);
    },
    [favorites]
  );

  const toggleFavorite = useCallback((song) => {
    if (!song?.url) return;
    const id = getSongId(song);
    setFavorites((prev) => {
      const exists = prev.some((f) => getSongId(f) === id);
      if (exists) return prev.filter((f) => getSongId(f) !== id);
      return [...prev, { ...song, _id: id }];
    });
  }, []);

  const addFavorite = useCallback((song) => {
    if (!song?.url) return;
    const id = getSongId(song);
    setFavorites((prev) => {
      if (prev.some((f) => getSongId(f) === id)) return prev;
      return [...prev, { ...song, _id: id }];
    });
  }, []);

  const removeFavorite = useCallback((song) => {
    if (!song?.url) return;
    const id = getSongId(song);
    setFavorites((prev) => prev.filter((f) => getSongId(f) !== id));
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
