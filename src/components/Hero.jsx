import { useState, useEffect, useRef } from 'react';
import './Hero.css';

const PHRASES = [
  'reliable test automation',
  'robust testing frameworks',
  'better developer workflows',
];

function useTyped() {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];

    if (!isErasing) {
      // Typing
      if (displayText.length < currentPhrase.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 80);
      } else {
        // Fully typed, pause then start erasing
        timeoutRef.current = setTimeout(() => {
          setIsErasing(true);
        }, 2500);
      }
    } else {
      // Erasing
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        // Fully erased, move to next phrase
        setIsErasing(false);
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [displayText, phraseIndex, isErasing]);

  return displayText;
}

export default function Hero() {
  const typedText = useTyped();

  return (
    <section id="hero" className="hero">
      <div className="hero-inner">
        <p className="hero-badge">SDET · Software Development Engineer in Test</p>
        <h1 className="hero-name">Shubham Yadav</h1>
        <p className="hero-typed">
          I build <span className="typed-text">{typedText}</span>
          <span className="typed-cursor" aria-hidden="true">|</span>
        </p>
        <div className="hero-cta">
          <a href="#about" className="hero-cta__link">Explore my work</a>
          <a href="#contact" className="hero-cta__link">Let&rsquo;s talk</a>
        </div>
      </div>
    </section>
  );
}
