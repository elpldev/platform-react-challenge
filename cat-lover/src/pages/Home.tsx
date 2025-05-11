import React, { useState, useEffect } from "react";
import { getCats, type CatImage, getCatById } from "../services/cat-api";
import CatInfoModal from "../components/CatInfoModal/CatInfoModal";
import { useSearchParams } from "react-router-dom";

const Home: React.FC = () => {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCat, setSelectedCat] = useState<CatImage | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log("fetching");
    const fetchPageCats = async () => {
      try {
        setLoading(true);
        const data = await getCats(10);
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

  useEffect(() => {
    const imageId = searchParams.get("image_id");
    if (imageId) {
      const openCatModal = async () => {
        try {
          const cat = await getCatById(imageId);
          setSelectedCat(cat);
        } catch (err) {
          console.error("Failed to fetch cat details:", err);
          setError("Failed to load cat details");
        }
      };

      openCatModal();
    }
  }, [searchParams]);

  const openModal = (cat: CatImage) => {
    setSelectedCat(cat);
    setSearchParams({ image_id: cat.id });
  };

  const closeModal = () => {
    setSelectedCat(null);
    searchParams.delete("image_id");
    setSearchParams(searchParams);
  };

  const loadMore = async () => {
    console.log("loadMore");
    try {
      setLoading(true);
      const moreCats = await getCats(10);
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
