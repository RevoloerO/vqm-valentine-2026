import { useState, useEffect, useRef } from 'react';
import '../styles/PhotoCard.css';

const PhotoCard = ({ image, title, description, badge, index, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const timeoutRef = useRef(null);

  const handleCardClick = () => {
    const newFlipped = !isFlipped;
    setIsFlipped(newFlipped);
    onClick?.(index);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Auto-reset after 3 seconds if flipped
    if (newFlipped) {
      timeoutRef.current = setTimeout(() => {
        setIsFlipped(false);
      }, 3000);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`photo-card ${isFlipped ? 'flipped' : ''}`}
      onClick={handleCardClick}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
      role="button"
      tabIndex={0}
      aria-label={`Photo card: ${title}. Click to flip.`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className="photo-card-inner">
        {/* Front - Photo */}
        <div className="photo-card-front">
          <img src={image} alt={title} loading="lazy" />
          {badge && (
            <span className={`badge badge-${badge}`}>
              {badge === 'nurse' ? 'RN' : badge}
            </span>
          )}
        </div>

        {/* Back - Info */}
        <div className="photo-card-back">
          <div className="card-back-content">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
