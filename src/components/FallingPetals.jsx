import { useEffect, useState } from 'react';
import '../styles/FallingPetals.css';

const FallingPetals = ({ density = 20, type = 'petals' }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const petalEmojis = ['🌸', '🌺', '💮', '🏵️', '✿', '❀'];
    const leafEmojis = ['🍃', '🌿', '☘️', '🍀', '🌱'];
    const sparkleEmojis = ['✨', '⭐', '💫', '🌟', '✧', '✦'];

    const getEmojis = () => {
      switch (type) {
        case 'leaves':
          return leafEmojis;
        case 'sparkles':
          return sparkleEmojis;
        case 'petals':
        default:
          return petalEmojis;
      }
    };

    const emojis = getEmojis();

    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < density; i++) {
        newParticles.push({
          id: i,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          left: Math.random() * 100,
          animationDuration: 10 + Math.random() * 15,
          animationDelay: Math.random() * 12,
          size: 0.7 + Math.random() * 0.6,
          opacity: 0.12 + Math.random() * 0.15,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, [density, type]);

  return (
    <div className="falling-petals-container" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="falling-petal"
          style={{
            left: `${particle.left}%`,
            animationDuration: `${particle.animationDuration}s`,
            animationDelay: `${particle.animationDelay}s`,
            fontSize: `${particle.size}rem`,
            opacity: particle.opacity,
          }}
        >
          {particle.emoji}
        </span>
      ))}
    </div>
  );
};

export default FallingPetals;
