import { useState, useEffect } from 'react';
import '../styles/LoadingScreen.css';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Brewing matcha...');
  const [isVisible, setIsVisible] = useState(true);

  const loadingMessages = [
    'Brewing matcha... 🍵',
    'Nurse cat is preparing... 🐱',
    'Adding love to the mix... 💕',
    'Checking vital signs... 💓',
    'Almost ready for you... ✨',
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onLoadingComplete?.();
        }, 500);
      }, 300);
    }
  }, [progress, onLoadingComplete]);

  if (!isVisible) {
    return (
      <div className="loading-screen fade-out">
        <div className="loading-content">
          <div className="cat-nurse">🐱</div>
        </div>
      </div>
    );
  }

  return (
    <div className="loading-screen">
      <div className="loading-content">
        {/* Matcha cup with cat nurse */}
        <div className="loading-scene">
          <div className="matcha-steam">
            <span className="steam steam-1">~</span>
            <span className="steam steam-2">~</span>
            <span className="steam steam-3">~</span>
          </div>

          <div className="matcha-cup">
            <div className="cup-body">
              <div className="matcha-liquid">
                <div className="matcha-fill" style={{ height: `${progress}%` }}></div>
              </div>
              <span className="cup-emoji">🍵</span>
            </div>
          </div>

          <div className="cat-nurse">
            <span className="cat-body">🐱</span>
            <span className="nurse-hat">👩‍⚕️</span>
            <span className="stethoscope">🩺</span>
          </div>

          {/* Floating decorations */}
          <div className="floating-items">
            <span className="float-item item-1">💕</span>
            <span className="float-item item-2">✨</span>
            <span className="float-item item-3">🌸</span>
            <span className="float-item item-4">💖</span>
          </div>
        </div>

        {/* Heartbeat line */}
        <div className="heartbeat-container">
          <svg className="heartbeat-svg" viewBox="0 0 200 50" preserveAspectRatio="none">
            <path
              className="heartbeat-line"
              d="M0,25 L30,25 L35,25 L40,10 L45,40 L50,5 L55,45 L60,25 L65,25 L200,25"
              fill="none"
              strokeWidth="2"
            />
          </svg>
          <span className="heartbeat-icon">💓</span>
        </div>

        {/* Progress bar */}
        <div className="loading-progress-container">
          <div className="loading-progress-bar">
            <div
              className="loading-progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="loading-percentage">{Math.round(progress)}%</span>
        </div>

        {/* Loading text */}
        <p className="loading-text">{loadingText}</p>

        {/* Paw prints decoration */}
        <div className="paw-prints">
          <span className="paw paw-1">🐾</span>
          <span className="paw paw-2">🐾</span>
          <span className="paw paw-3">🐾</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
