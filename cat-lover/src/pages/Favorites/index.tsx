import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFavorites,
  removeFavorite,
  type FavoriteCat,
} from "../../services/cat-api";
import "./Favorites.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState<FavoriteCat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const data = await getFavorites();
        setFavorites(data);
      } catch (err) {
        setError("Failed to fetch favorites");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (favoriteId: number) => {
    try {
      await removeFavorite(favoriteId);
      setFavorites(favorites.filter((fav) => fav.id !== favoriteId));
    } catch (err) {
      setError("Failed to remove from favorites");
      console.error(err);
    }
  };

  const openCatDetails = (imageId: string) => {
    navigate(`/?image_id=${imageId}`);
  };

  if (loading) return <div className="loading">Loading your favorites...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="favorites-container">
      <h2>Your Favorite Cats</h2>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p>You haven't added any cats to your favorites yet.</p>
          <button onClick={() => navigate("/")}>Discover Cats</button>
        </div>
      ) : (
        <>
          <p className="favorites-count">
            You have {favorites.length} favorite cats
          </p>
          <div className="favorites-grid">
            {favorites.map((favorite) => (
              <div key={favorite.id} className="favorite-card">
                <div className="favorite-image-container">
                  <img
                    src={favorite.image.url}
                    alt="Favorite cat"
                    onClick={() => openCatDetails(favorite.image_id)}
                  />
                  <button
                    className="remove-favorite-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFavorite(favorite.id);
                    }}
                  >
                    X
                  </button>
                </div>
                {favorite.image.breeds && favorite.image.breeds.length > 0 && (
                  <div className="favorite-breed">
                    {favorite.image.breeds[0].name}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
