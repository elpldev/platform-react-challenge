import React, { useState, useEffect } from "react";
import { fetchCats, type CatImage } from "../services/cat-api";
import CatInfoModal from "../components/CatInfoModal/CatInfoModal";

const Home: React.FC = () => {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCat, setSelectedCat] = useState<CatImage | null>(null);

  useEffect(() => {
    const fetchPageCats = async () => {
      try {
        setLoading(true);
        const data = await fetchCats(10);
        setCats(data);
      } catch (err) {
        setError("Failed to fetch cats");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPageCats();
  }, []);

  const openModal = (cat: CatImage) => {
    setSelectedCat(cat);
  };

  const closeModal = () => {
    setSelectedCat(null);
  };

  useEffect(() => {
    const fetchCatsForGrid = async () => {
      try {
        setLoading(true);
        const data = await fetchCats(10);
        setCats(data);
      } catch (err) {
        setError("Failed to fetch cats");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCatsForGrid();
  }, []);

  const loadMore = async () => {
    try {
      setLoading(true);
      const moreCats = await fetchCats(10);
      setCats((prevCats) => [...prevCats, ...moreCats]);
    } catch (err) {
      setError("Failed to load more cats");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && cats.length === 0) return <div>Loading cats...</div>;
  if (error && cats.length === 0) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Cats</h2>
      <div className="cat-grid">
        {cats.map((cat) => (
          <div key={cat.id} className="cat-card" onClick={() => openModal(cat)}>
            <img src={cat.url} alt="Cat" />
          </div>
        ))}
      </div>

      <div className="load-more-container">
        <button onClick={loadMore} disabled={loading}>
          {loading ? "Loading..." : "Load More Cats"}
        </button>
      </div>
      {selectedCat && <CatInfoModal cat={selectedCat} onClose={closeModal} />}
    </div>
  );
};

export default Home;
