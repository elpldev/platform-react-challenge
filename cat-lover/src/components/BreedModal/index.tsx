import { useEffect, useRef, useState } from "react";
import {
  type CatBreed,
  type CatImage,
  getImagesByBreed,
} from "../../services/cat-api";
import { useNavigate } from "react-router-dom";
import "./BreedModal.css";
interface BreedModalProps {
  breed: CatBreed;
  onClose: () => void;
}

const BreedModal = ({ breed, onClose }: BreedModalProps) => {
  const [breedImages, setBreedImages] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBreedImages = async () => {
      try {
        setLoading(true);
        const images = await getImagesByBreed(breed.id, 8);
        setBreedImages(images);
      } catch (err) {
        setError("Failed to fetch images");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBreedImages();
  }, [breed.id]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const openCatDetails = (cat: CatImage) => {
    navigate(`/?image_id=${cat.id}`);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content breed-modal-content" ref={modalRef}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="breed-header">
          <h2>{breed.name}</h2>
          <p>{breed.description}</p>
          <div className="breed-details">
            <p>
              <strong>Origin:</strong> {breed.origin}
            </p>
            <p>
              <strong>Temperament:</strong> {breed.temperament}
            </p>
            <p>
              <strong>Life Span:</strong> {breed.life_span} years
            </p>
            {breed.wikipedia_url && (
              <p>
                <a href={breed.wikipedia_url} target="_blank">
                  Learn more on Wikipedia
                </a>
              </p>
            )}
          </div>
        </div>

        <h3>Photos of {breed.name} cats</h3>

        {loading && <p>Loading images...</p>}
        {error && <p>Error: {error}</p>}

        <div className="breed-images-grid">
          {breedImages.map((cat) => (
            <div
              key={cat.id}
              className="breed-image-card"
              onClick={() => openCatDetails(cat)}
            >
              <img src={cat.url} alt={`${breed.name} cat`} />
            </div>
          ))}
        </div>

        {breedImages.length === 0 && !loading && !error && (
          <p>No images found for this breed.</p>
        )}
      </div>
    </div>
  );
};

export default BreedModal;
