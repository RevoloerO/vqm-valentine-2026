import { useEffect, useState } from 'react';
import '../styles/FloatingHearts.css';

const FloatingHearts = ({ density = 15 }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const heartEmojis = ['💕', '💗', '💖', '💓', '💘', '💝', '♥️', '❤️'];

    const generateHearts = () => {
      const newHearts = [];
      for (let i = 0; i < density; i++) {
        newHearts.push({
          id: i,
          emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
          left: Math.random() * 100,
          animationDuration: 8 + Math.random() * 12,
          animationDelay: Math.random() * 10,
          size: 0.6 + Math.random() * 0.8,
          opacity: 0.15 + Math.random() * 0.2,
        });
      }
      setHearts(newHearts);
    };

    generateHearts();
  }, [density]);

  return (
    <div className="floating-hearts-container" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.animationDuration}s`,
            animationDelay: `${heart.animationDelay}s`,
            fontSize: `${heart.size}rem`,
            opacity: heart.opacity,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
