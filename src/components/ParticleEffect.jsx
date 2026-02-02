import { useEffect, useRef } from 'react';
import { Fireworks } from 'fireworks-js';

const ParticleEffect = () => {
  const containerRef = useRef(null);
  const fireworksRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const options = {
      rocketsPoint: {
        min: 30,
        max: 70
      },
      hue: {
        min: 330,
        max: 360
      },
      delay: {
        min: 15,
        max: 30
      },
      speed: 2,
      acceleration: 1.05,
      friction: 0.98,
      gravity: 1.5,
      particles: 50,
      trace: 3,
      explosion: 5,
      autoresize: true,
      brightness: {
        min: 50,
        max: 80
      },
      decay: {
        min: 0.015,
        max: 0.03
      },
      mouse: {
        click: false,
        move: false,
        max: 1
      },
      boundaries: {
        x: 50,
        y: 50,
        width: container.clientWidth,
        height: container.clientHeight
      },
      sound: {
        enabled: false
      }
    };

    fireworksRef.current = new Fireworks(container, options);
    fireworksRef.current.start();

    // Stop fireworks after 5 seconds
    const timer = setTimeout(() => {
      fireworksRef.current?.stop();
    }, 5000);

    return () => {
      clearTimeout(timer);
      fireworksRef.current?.stop();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="particle-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 999
      }}
      aria-hidden="true"
    />
  );
};

export default ParticleEffect;
