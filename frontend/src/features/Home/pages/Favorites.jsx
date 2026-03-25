import { useFavorites } from "../hooks/useFavorites";
import { useSong } from "../hooks/useSong";
import "../styles/favorites.scss";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();
  const { setSongs, setShouldAutoplay } = useSong();

  const handlePlay = (song) => {
    setSongs(song);
    setShouldAutoplay(true);
  };

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <h2>Your Favorites</h2>
        <p className="favorites__empty">
          No favorites yet. Detect your mood and click the ♥ button on a song to add it.
        </p>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <h2>Your Favorites ({favorites.length})</h2>
      <ul className="favorites__list">
        {favorites.map((song) => (
          <li key={song.url + song.title} className="favorites__item">
            <img
              src={song.posterUrl || "https://placehold.co/48x48/1f2937/4ade80?text=♫"}
              alt=""
              className="favorites__poster"
            />
            <div className="favorites__info">
              <span className="favorites__title">{song.title}</span>
              <span className="favorites__mood">{song.mood}</span>
            </div>
            <div className="favorites__actions">
              <button
                type="button"
                className="favorites__play"
                onClick={() => handlePlay(song)}
              >
                ▶ Play
              </button>
              <button
                type="button"
                className="favorites__remove"
                onClick={() => removeFavorite(song)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
