import { useState } from 'react';

// Core styles
import './styles/variables.css';
import './styles/animations.css';
import './styles/ThemeSwitcher.css';
import './styles/FloatingHearts.css';
import './styles/FallingPetals.css';
import './styles/LoadingScreen.css';
import './styles/DaysTogether.css';
import './styles/PhotoCard.css';
import './styles/PhotoGallery.css';
import './styles/BibleQuote.css';
import './styles/responsive.css';
import './App.css';

// Components
import LoadingScreen from './components/LoadingScreen';
import ThemeSwitcher from './components/ThemeSwitcher';
import FloatingHearts from './components/FloatingHearts';
import FallingPetals from './components/FallingPetals';
import DaysTogether from './components/DaysTogether';
import PhotoGallery from './components/PhotoGallery';
import BibleQuote from './components/BibleQuote';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Her special name
  const herName = 'Gorgeous';

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const scrollToGallery = () => {
    const gallery = document.querySelector('.photo-gallery');
    if (gallery) {
      gallery.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="app">
      <ThemeSwitcher />

      {/* Hero Section with Floating Hearts */}
      <header className="hero-section">
        <FloatingHearts density={12} />
        <div className="hero-content">
          <h1>Happy Valentine&apos;s Day 2026</h1>
          <p className="subtitle">My {herName}</p>
          <p className="subtitle-nurse">Almost a Nurse! 🎓</p>
          <DaysTogether />
        </div>
        <div
          className="scroll-indicator"
          onClick={scrollToGallery}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              scrollToGallery();
            }
          }}
        >
          <span className="scroll-text">Our Journey</span>
          <span className="scroll-arrow"></span>
        </div>
      </header>

      {/* Photo Gallery with Falling Petals */}
      <section className="gallery-section">
        <FallingPetals density={18} type="petals" />
        <PhotoGallery />
      </section>

      {/* Bible Quote Section with Sparkles */}
      <section className="quote-section">
        <FallingPetals density={15} type="sparkles" />
        <BibleQuote herName={herName} />
      </section>

      {/* Footer with Leaves */}
      <footer className="app-footer">
        <FallingPetals density={10} type="leaves" />
        <div className="footer-content">
          <p>Made with 💕 for my {herName}</p>
          <p className="footer-names">Quyền & Hiền</p>
          <p className="footer-date">Valentine&apos;s Day 2026</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
