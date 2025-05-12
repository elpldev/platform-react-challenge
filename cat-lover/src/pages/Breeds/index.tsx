import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getBreeds, type CatBreed } from "../../services/cat-api";
import BreedModal from "../../components/BreedModal/index";
import "./Breeds.css";
const Breeds = () => {
  const [breeds, setBreeds] = useState<CatBreed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBreed, setSelectedBreed] = useState<CatBreed | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setLoading(true);
        const data = await getBreeds();
        setBreeds(data);
      } catch (err) {
        setError("Failed to fetch breeds");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  // Check for breed in URL params for direct modal opening
  useEffect(() => {
    const breedId = searchParams.get("breed");
    if (breedId && breeds.length > 0) {
      const breed = breeds.find((b) => b.id === breedId);
      if (breed) {
        setSelectedBreed(breed);
      }
    }
  }, [searchParams, breeds]);

  const openBreedModal = (breed: CatBreed) => {
    setSelectedBreed(breed);
    setSearchParams({ breed: breed.id });
  };

  const closeBreedModal = () => {
    setSelectedBreed(null);
    searchParams.delete("breed");
    setSearchParams(searchParams);
  };

  if (loading) return <div>Loading breeds...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="breeds-container">
      <h2>Cat Breeds</h2>
      <div className="breeds-grid">
        {breeds.map((breed) => (
          <div
            key={breed.id}
            className="breed-card"
            onClick={() => openBreedModal(breed)}
          >
            <h3>{breed.name}</h3>
            <p className="breed-origin">{breed.origin}</p>
            <p className="breed-temperament">{breed.temperament}</p>
          </div>
        ))}
      </div>

      {breeds.length === 0 && <p className="no-results">No breeds found</p>}

      {selectedBreed && (
        <BreedModal breed={selectedBreed} onClose={closeBreedModal} />
      )}
    </div>
  );
};

export default Breeds;
