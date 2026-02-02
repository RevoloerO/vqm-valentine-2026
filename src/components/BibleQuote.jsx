import { useState, useEffect, useRef } from 'react';
import '../styles/BibleQuote.css';
import ParticleEffect from './ParticleEffect';

const BibleQuote = ({ herName = 'My Love' }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [triggerFireworks, setTriggerFireworks] = useState(false);
  const [noButtonScale, setNoButtonScale] = useState(1);
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
    // Playful response - button shrinks
    if (noButtonScale > 0.3) {
      setNoButtonScale((prev) => prev * 0.7);
    } else {
      // Eventually give up and say yes
      setAnswered(true);
      setTriggerFireworks(true);
    }
  };

  return (
    <>
      <section className="bible-quote-section" ref={containerRef}>
        <div className="quote-container">
          <blockquote className="verse">
            <p className="verse-text">
              &ldquo;Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres.&rdquo;
            </p>
            <footer className="verse-reference">&mdash; 1 Corinthians 13:4-7</footer>
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
                    aria-label="Yes, I will be your Valentine"
                  >
                    Yes ♥
                  </button>
                  <button
                    className="no-button-final"
                    onClick={handleNo}
                    style={{
                      transform: `scale(${noButtonScale})`,
                      opacity: noButtonScale
                    }}
                    aria-label="No"
                  >
                    No
                  </button>
                </div>
              ) : (
                <div className="response">
                  {triggerFireworks ? (
                    <>
                      <p className="yes-message">
                        ♥ I love you so much! ♥
                      </p>
                      <p className="sub-message">
                        Congratulations on your nursing achievement. I&apos;m so proud of you.
                      </p>
                    </>
                  ) : (
                    <p className="no-message">
                      That&apos;s okay... but the answer is always yes in my heart. 💕
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
