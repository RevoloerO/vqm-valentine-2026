import { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/ThemeSwitcher.css';

const themes = [
  {
    id: 'scrubs',
    name: 'Scrubs Blue & Heart Red',
    icon: '🩺',
    colors: ['#5b9bd5', '#e63946']
  },
  {
    id: 'coral',
    name: 'Warm Coral Sunset',
    icon: '🌅',
    colors: ['#ffcdb2', '#e5989b']
  },
  {
    id: 'greentea',
    name: 'Green Tea Latte',
    icon: '🍵',
    colors: ['#a8d5a2', '#6b9b5e']
  },
  {
    id: 'tiramisu',
    name: 'Tiramisu',
    icon: '🍰',
    colors: ['#d4a574', '#8b5a3c']
  }
];

const AUTO_ROTATE_INTERVAL = 10000; // 10 seconds

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState('scrubs');
  const [isOpen, setIsOpen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);

  const applyTheme = useCallback((themeId) => {
    // Add transitioning class for smooth fade effect
    document.documentElement.classList.add('theme-transitioning');

    // Apply theme after a tiny delay for smoother visual
    setTimeout(() => {
      document.documentElement.setAttribute('data-theme', themeId);
    }, 50);

    // Remove transitioning class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 1200);
  }, []);

  const rotateToNextTheme = useCallback(() => {
    setCurrentTheme((prev) => {
      const currentIndex = themes.findIndex((t) => t.id === prev);
      const nextIndex = (currentIndex + 1) % themes.length;
      const nextTheme = themes[nextIndex].id;
      applyTheme(nextTheme);
      return nextTheme;
    });
    setProgress(0);
  }, [applyTheme]);

  // Auto-rotate effect
  useEffect(() => {
    if (autoRotate) {
      // Progress bar animation
      progressRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + (100 / (AUTO_ROTATE_INTERVAL / 50));
        });
      }, 50);

      // Theme rotation
      intervalRef.current = setInterval(() => {
        rotateToNextTheme();
      }, AUTO_ROTATE_INTERVAL);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [autoRotate, rotateToNextTheme]);

  // Load saved preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem('valentine-theme');
    const savedAutoRotate = localStorage.getItem('valentine-auto-rotate');

    if (savedTheme && themes.find((t) => t.id === savedTheme)) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    if (savedAutoRotate !== null) {
      setAutoRotate(savedAutoRotate === 'true');
    }
  }, []);

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
    applyTheme(themeId);
    localStorage.setItem('valentine-theme', themeId);
    setIsOpen(false);
    setProgress(0);
  };

  const toggleAutoRotate = () => {
    const newValue = !autoRotate;
    setAutoRotate(newValue);
    localStorage.setItem('valentine-auto-rotate', String(newValue));
    setProgress(0);
  };

  const currentThemeData = themes.find((t) => t.id === currentTheme);

  return (
    <div className="theme-switcher">
      <button
        className="theme-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change theme"
        aria-expanded={isOpen}
      >
        <span className="theme-icon">{currentThemeData?.icon}</span>
        <span className="theme-label">Theme</span>
        {autoRotate && (
          <div className="auto-indicator">
            <div
              className="auto-progress"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </button>

      {isOpen && (
        <div className="theme-dropdown">
          <div className="theme-dropdown-header">
            <span>Choose Theme</span>
            <button
              className={`auto-rotate-btn ${autoRotate ? 'active' : ''}`}
              onClick={toggleAutoRotate}
              aria-pressed={autoRotate}
              title={autoRotate ? 'Stop auto-rotate' : 'Start auto-rotate'}
            >
              {autoRotate ? '⏸️ Auto' : '▶️ Auto'}
            </button>
          </div>

          {themes.map((theme) => (
            <button
              key={theme.id}
              className={`theme-option ${currentTheme === theme.id ? 'active' : ''}`}
              onClick={() => handleThemeChange(theme.id)}
              aria-pressed={currentTheme === theme.id}
            >
              <span className="theme-option-icon">{theme.icon}</span>
              <span className="theme-option-name">{theme.name}</span>
              <div className="theme-color-preview">
                {theme.colors.map((color, idx) => (
                  <span
                    key={idx}
                    className="color-dot"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              {currentTheme === theme.id && autoRotate && (
                <span className="current-indicator">●</span>
              )}
            </button>
          ))}

          <div className="theme-nav-dots">
            {themes.map((theme) => (
              <button
                key={theme.id}
                className={`nav-dot ${currentTheme === theme.id ? 'active' : ''}`}
                onClick={() => handleThemeChange(theme.id)}
                aria-label={`Switch to ${theme.name}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
