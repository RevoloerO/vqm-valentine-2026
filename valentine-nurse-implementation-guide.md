# Valentine Nurse 2026 - Technical Implementation Guide

## Setup Instructions for Code Agent

### 1. Project Initialization

```bash
# Create new Vite + React project
npm create vite@latest vqm-valentine-nurse-2026 -- --template react

cd vqm-valentine-nurse-2026

# Install dependencies (same as vqm-valentine)
npm install
npm install fireworks-js gh-pages

# Install dev dependencies
npm install --save-dev @vitejs/plugin-react @eslint/js eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh globals
```

### 2. Configuration Files to Create/Modify

#### `vite.config.js`
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/vqm-valentine-nurse-2026',
  server: {
    port: 1402,
  },
})
```

#### `eslint.config.js`
Copy from vqm-valentine project (identical)

#### `package.json` Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "homepage": "https://[username].github.io/vqm-valentine-nurse-2026"
}
```

---

## Component Implementation Details

### 1. PhotoCard Component

**File:** `src/components/PhotoCard.jsx`

```javascript
import React, { useState } from 'react';
import '../styles/PhotoCard.css';

const PhotoCard = ({ image, title, description, badge, index, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    onClick?.(index);
    
    // Auto-reset after 3 seconds
    if (!isFlipped) {
      setTimeout(() => setIsFlipped(false), 3000);
    }
  };

  return (
    <div
      className={`photo-card ${isFlipped ? 'flipped' : ''}`}
      onClick={handleCardClick}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Front - Photo */}
      <div className="photo-card-front">
        <img src={image} alt={title} loading="lazy" />
        {badge && <span className={`badge badge-${badge}`}>{badge}</span>}
      </div>

      {/* Back - Info */}
      <div className="photo-card-back">
        <div className="card-back-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
```

---

### 2. PhotoCard Styles

**File:** `src/styles/PhotoCard.css`

```css
.photo-card {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  cursor: pointer;
  perspective: 1000px;
  animation: slideInUp 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.photo-card-front,
.photo-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  border: 3px solid var(--color-border);
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.photo-card:hover .photo-card-front {
  box-shadow: 0 12px 24px rgba(255, 51, 102, 0.3);
}

/* Front Side */
.photo-card-front {
  background: var(--color-primary);
}

.photo-card-front img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
  z-index: 10;
}

.badge-nurse {
  background: rgba(0, 170, 0, 0.9);
  color: white;
}

.badge-achievement {
  background: rgba(255, 51, 102, 0.9);
  color: white;
}

/* Back Side */
.photo-card-back {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  transform: rotateY(180deg);
  color: white;
}

.card-back-content {
  text-align: center;
  padding: 20px;
}

.card-back-content h3 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  font-family: 'Sacramento', serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.card-back-content p {
  font-size: 0.95rem;
  line-height: 1.4;
  font-family: 'Share Tech Mono', monospace;
}

/* Flip Animation */
.photo-card.flipped {
  transform: rotateY(180deg);
}

.photo-card-front,
.photo-card-back {
  transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.photo-card.flipped .photo-card-front {
  transform: rotateY(180deg);
}

.photo-card.flipped .photo-card-back {
  transform: rotateY(0deg);
}

/* Responsive */
@media (max-width: 768px) {
  .photo-card {
    aspect-ratio: 1;
  }

  .card-back-content h3 {
    font-size: 1.1rem;
  }

  .card-back-content p {
    font-size: 0.85rem;
  }

  .badge {
    padding: 4px 8px;
    font-size: 0.7rem;
  }
}
```

---

### 3. PhotoGallery Component

**File:** `src/components/PhotoGallery.jsx`

```javascript
import React, { useState, useEffect } from 'react';
import PhotoCard from './PhotoCard';
import '../styles/PhotoGallery.css';
import photos from '../data/photoData';

const PhotoGallery = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [visibleCards, setVisibleCards] = useState(new Set());

  useEffect(() => {
    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set(prev).add(entry.target.dataset.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('[data-id]');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (index) => {
    setSelectedCard(selectedCard === index ? null : index);
  };

  return (
    <section className="photo-gallery">
      <div className="gallery-header">
        <h2>Our Story</h2>
        <p>Memories leading to this special moment</p>
      </div>

      <div className="gallery-grid">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            data-id={photo.id}
            className={`gallery-item ${visibleCards.has(photo.id) ? 'visible' : ''}`}
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
```

---

### 4. PhotoGallery Styles

**File:** `src/styles/PhotoGallery.css`

```css
.photo-gallery {
  padding: 60px 20px;
  background: linear-gradient(180deg, var(--color-background) 0%, rgba(255, 230, 230, 0.5) 100%);
  min-height: 100vh;
}

.gallery-header {
  text-align: center;
  margin-bottom: 60px;
}

.gallery-header h2 {
  font-size: 3rem;
  font-family: 'Sacramento', serif;
  color: var(--color-text);
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.gallery-header p {
  font-size: 1.2rem;
  color: var(--color-accent);
  font-family: 'Share Tech Mono', monospace;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(20px, 4vw, 40px);
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.gallery-item {
  opacity: 0;
  transition: opacity 0.6s ease-out;
}

.gallery-item.visible {
  opacity: 1;
}

/* Responsive Grid */
@media (max-width: 768px) {
  .photo-gallery {
    padding: 40px 15px;
  }

  .gallery-header h2 {
    font-size: 2rem;
  }

  .gallery-header p {
    font-size: 1rem;
  }

  .gallery-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: clamp(15px, 3vw, 25px);
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
```

---

### 5. BibleQuote Component

**File:** `src/components/BibleQuote.jsx`

```javascript
import React, { useState, useEffect, useRef } from 'react';
import '../styles/BibleQuote.css';
import ParticleEffect from './ParticleEffect';

const BibleQuote = ({ herName }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [triggerFireworks, setTriggerFireworks] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowButtons(true);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleYes = () => {
    setAnswered(true);
    setTriggerFireworks(true);
  };

  const handleNo = () => {
    // Playful response - button shrinks or moves
    setAnswered(true);
  };

  return (
    <>
      <section className="bible-quote-section" ref={containerRef}>
        <div className="quote-container">
          <blockquote className="verse">
            <p className="verse-text">
              "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres."
            </p>
            <footer className="verse-reference">— 1 Corinthians 13:4-7</footer>
          </blockquote>

          <div className="dedication">
            <p>For <span className="her-name">{herName}</span></p>
            <p className="achievement">RN Class of 2026</p>
          </div>

          {showButtons && (
            <div className="question-section">
              <h3 className="big-question">Will you be my Valentine?</h3>

              {!answered ? (
                <div className="button-group">
                  <button 
                    className="yes-button-final" 
                    onClick={handleYes}
                  >
                    Yes ♥
                  </button>
                  <button 
                    className="no-button-final" 
                    onClick={handleNo}
                  >
                    No
                  </button>
                </div>
              ) : (
                <div className={`response ${answered ? 'show' : ''}`}>
                  {triggerFireworks ? (
                    <>
                      <p className="yes-message">
                        ♥ I love you so much! ♥
                      </p>
                      <p className="sub-message">
                        Congratulations on your nursing achievement. I'm so proud of you.
                      </p>
                    </>
                  ) : (
                    <p className="no-message">
                      That's okay... but the answer is always yes in my heart. 💕
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {triggerFireworks && <ParticleEffect />}
    </>
  );
};

export default BibleQuote;
```

---

### 6. BibleQuote Styles

**File:** `src/styles/BibleQuote.css`

```css
.bible-quote-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-background) 100%);
  padding: 60px 20px;
}

.quote-container {
  max-width: 800px;
  text-align: center;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.verse {
  margin: 0 0 40px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-left: 5px solid var(--color-accent);
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.verse-text {
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  font-family: 'Sacramento', serif;
  color: var(--color-text);
  line-height: 1.8;
  margin: 0 0 20px;
  font-weight: 500;
}

.verse-reference {
  font-size: 1rem;
  color: var(--color-accent);
  font-family: 'Share Tech Mono', monospace;
  font-style: italic;
}

.dedication {
  margin: 40px 0;
}

.dedication p {
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-family: 'Sacramento', serif;
  color: var(--color-text);
  margin: 10px 0;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.her-name {
  font-weight: bold;
  color: var(--color-accent);
  text-shadow: 0 0 10px rgba(255, 51, 102, 0.3);
}

.achievement {
  font-size: 1.2rem !important;
  color: var(--color-accent);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.question-section {
  margin-top: 60px;
}

.big-question {
  font-size: clamp(2rem, 6vw, 3rem);
  font-family: 'Sacramento', serif;
  color: var(--color-text);
  margin-bottom: 40px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.button-group {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.yes-button-final,
.no-button-final {
  padding: 15px 40px;
  font-size: 1.3rem;
  font-family: 'Sacramento', serif;
  border: 3px solid var(--color-border);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.yes-button-final {
  background: var(--color-accent);
  color: white;
}

.yes-button-final:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 30px rgba(255, 51, 102, 0.4);
}

.no-button-final {
  background: var(--color-primary);
  color: var(--color-text);
}

.no-button-final:hover {
  transform: scale(0.95);
  opacity: 0.8;
}

.response {
  margin-top: 40px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  animation: slideDown 0.6s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.yes-message {
  font-size: 1.8rem;
  color: var(--color-accent);
  font-family: 'Sacramento', serif;
  margin: 0;
}

.no-message {
  font-size: 1.5rem;
  color: var(--color-text);
  font-family: 'Sacramento', serif;
  margin: 0;
}

.sub-message {
  font-size: 1rem;
  color: var(--color-text);
  margin-top: 15px;
  font-family: 'Share Tech Mono', monospace;
}

/* Responsive */
@media (max-width: 768px) {
  .bible-quote-section {
    padding: 40px 15px;
  }

  .verse {
    padding: 30px 20px;
  }

  .button-group {
    gap: 15px;
  }

  .yes-button-final,
  .no-button-final {
    padding: 12px 30px;
    font-size: 1.1rem;
  }
}
```

---

### 7. ParticleEffect Component (Fireworks)

**File:** `src/components/ParticleEffect.jsx`

```javascript
import React, { useEffect, useRef } from 'react';
import Fireworks from 'fireworks-js';

const ParticleEffect = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const options = {
      rocketsPoint: 50,
      hue: { min: 330, max: 360 },
      delay: { min: 15, max: 30 },
      speed: 2,
      acceleration: 1.05,
      friction: 0.98,
      gravity: 1.5,
      particles: 50,
      trace: 3,
      explosion: 5,
      autoresize: true,
      brightness: { min: 50, max: 80 },
      decay: { min: 0.015, max: 0.03 },
      mouse: { click: false, move: false, max: 1 },
      boundaries: {
        x: 50,
        y: 50,
        width: container.clientWidth,
        height: container.clientHeight,
      },
      sound: { enable: false },
    };

    const fireworks = new Fireworks(container, options);
    fireworks.start();

    const timer = setTimeout(() => {
      fireworks.stop();
    }, 5000);

    return () => {
      clearTimeout(timer);
      fireworks.stop();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 999,
      }}
    />
  );
};

export default ParticleEffect;
```

---

### 8. Photo Data

**File:** `src/data/photoData.js`

```javascript
const photoData = [
  {
    id: 1,
    image: '/vqm-valentine-nurse-2026/src/assets/photos/photo-1.jpg',
    title: 'First Meeting',
    description: 'The day our story began',
    category: 'memories',
    badge: null,
  },
  {
    id: 2,
    image: '/vqm-valentine-nurse-2026/src/assets/photos/photo-2.jpg',
    title: 'A Special Moment',
    description: 'One of my favorite memories with you',
    category: 'memories',
    badge: null,
  },
  {
    id: 3,
    image: '/vqm-valentine-nurse-2026/src/assets/photos/photo-3.jpg',
    title: 'Nursing School Acceptance',
    description: 'You did it! RN Class of 2026',
    category: 'achievements',
    badge: 'nurse',
  },
  // Add more photos as needed
  // Minimum 6-12 photos recommended
];

export default photoData;
```

---

## CSS Variables File

**File:** `src/styles/variables.css`

```css
:root {
  /* Valentine Theme */
  --color-background: #ffe6e6;
  --color-primary: #ff99cc;
  --color-secondary: #ff6699;
  --color-accent: #ff3366;
  --color-text: #990033;
  --color-border: #cc3366;
  --color-success: #00aa00;
  --color-badge-bg: #fff0f5;

  /* Typography */
  --font-serif: 'Sacramento', serif;
  --font-mono: 'Share Tech Mono', monospace;
  --font-decorative: 'megrim', sans-serif;

  /* Spacing */
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 32px;
  --spacing-xl: 48px;

  /* Transitions */
  --transition-base: 0.3s ease;
  --transition-flip: 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 15px;
  --radius-lg: 50px;

  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 8px 16px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 12px 24px rgba(255, 51, 102, 0.3);
}
```

---

## Import Order in App.jsx

**File:** `src/App.jsx`

```javascript
// Core
import React from 'react';

// Styles (in order)
import './styles/variables.css';
import './styles/animations.css';
import './styles/PhotoCard.css';
import './styles/PhotoGallery.css';
import './styles/BibleQuote.css';
import './styles/responsive.css';
import './App.css';

// Components
import PhotoGallery from './components/PhotoGallery';
import BibleQuote from './components/BibleQuote';

function App() {
  const herName = 'Your Girlfriend\'s Name'; // Update with actual name

  return (
    <div className="app">
      <header className="hero-section">
        <h1>Happy Valentine's Day 2026</h1>
        <p>{herName} - RN Class of 2026</p>
      </header>

      <PhotoGallery />
      <BibleQuote herName={herName} />

      <footer className="app-footer">
        <p>Made with ♥ for you</p>
      </footer>
    </div>
  );
}

export default App;
```

---

## Common Mistakes to Avoid

1. **Image Paths:** Use correct relative paths from `public` or `src/assets`
2. **3D Transforms:** Ensure `perspective: 1000px` on parent for flip effects
3. **Auto-Reset Logic:** Remember to clear timeout when component unmounts
4. **Scroll Observers:** Always disconnect observers to prevent memory leaks
5. **Animation Performance:** Use `transform` and `opacity` instead of `width`/`height`
6. **Mobile Testing:** Test flip card UX on touch devices (may need click instead of hover)

---

## Testing Checklist

- [ ] Cards flip smoothly without jank (60fps)
- [ ] Scroll animations trigger on mobile
- [ ] Images load correctly and are optimized
- [ ] Buttons respond on touch devices
- [ ] Fireworks trigger on "Yes"
- [ ] No console errors
- [ ] Responsive on: 320px, 768px, 1024px, 1440px
- [ ] Accessibility: alt text on all images, semantic HTML
- [ ] Page loads under 2 seconds on 4G

---

## Deployment Checklist

- [ ] Update `herName` in App.jsx
- [ ] Add all photos to `/src/assets/photos/`
- [ ] Update `photoData.js` with correct image paths
- [ ] Test on GitHub Pages base URL `/vqm-valentine-nurse-2026`
- [ ] Run `npm run build` successfully
- [ ] Run `npm run deploy` to publish
- [ ] Test live URL in multiple browsers

---

**Ready to hand off to code agent!**
