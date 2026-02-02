import { useState, useEffect, useRef } from 'react';
import PhotoCard from './PhotoCard';
import '../styles/PhotoGallery.css';
import photoData from '../data/photoData';

const PhotoGallery = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const galleryRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.id;
            if (id) {
              setVisibleCards((prev) => new Set(prev).add(id));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all gallery items
    const items = galleryRef.current?.querySelectorAll('[data-id]');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (index) => {
    setSelectedCard(selectedCard === index ? null : index);
  };

  return (
    <section className="photo-gallery" ref={galleryRef}>
      <div className="gallery-header">
        <h2>Our Story</h2>
        <p>Memories leading to this special moment</p>
      </div>

      <div className="gallery-grid">
        {photoData.map((photo, index) => (
          <div
            key={photo.id}
            data-id={String(photo.id)}
            className={`gallery-item ${visibleCards.has(String(photo.id)) ? 'visible' : ''}`}
          >
            <PhotoCard
              image={photo.image}
              title={photo.title}
              description={photo.description}
              badge={photo.badge}
              index={index}
              onClick={handleCardClick}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhotoGallery;
