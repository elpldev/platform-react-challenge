import { useEffect, useRef } from "react";
import { addFavorite, type CatImage } from "../../services/cat-api";
import { useNavigate } from "react-router-dom";
import "./CatInfoModal.css";

interface ModalProps {
  cat: CatImage;
  onClose: () => void;
}

const CatInfoModal = ({ cat, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  const handleAddFavorite = async () => {
    try {
      await addFavorite(cat.id);
      alert("Added to favorites!");
    } catch (error) {
      console.error("Failed to add to favorites:", error);
      alert("Failed to add to favorites");
    }
  };

  const goToBreed = (breedId: string) => {
    console.log("gotToBreed", breedId);
    navigate(`/breeds?breed=${breedId}`);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <img src={cat.url} alt="Cat" className="modal-image" />

        {cat?.breeds && cat?.breeds?.length > 0 ? (
          <div className="breed-info">
            <h3>{cat.breeds[0]?.name}</h3>
            <p>{cat.breeds[0]?.description}</p>
            <p>
              <strong>Origin:</strong> {cat.breeds[0]?.origin}
            </p>
            <p>
              <strong>Temperament:</strong> {cat.breeds[0]?.temperament}
            </p>
            <p>
              <strong>Life Span:</strong> {cat.breeds[0]?.life_span} years
            </p>
            {cat.breeds[0]?.wikipedia_url && (
              <p>
                <a href={cat.breeds[0].wikipedia_url} target="_blank">
                  Learn more on Wikipedia
                </a>
              </p>
            )}
            <button onClick={() => goToBreed(cat.breeds[0].id)}>
              See more {cat.breeds[0]?.name} cats
            </button>
          </div>
        ) : (
          <p>No breed information available for this cat.</p>
        )}

        <div className="favorite-form">
          <h4>Like this cat?</h4>
          <button onClick={handleAddFavorite}>Add to Favorites</button>
        </div>
      </div>
    </div>
  );
};

export default CatInfoModal;
