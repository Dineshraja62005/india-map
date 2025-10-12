import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Header from './components/sections/Header/Header';
import Hero from './components/sections/Hero/Hero';
import SplitSection from './components/sections/SplitSection/SplitSection';
import ThirdSection from './components/sections/ThirdSection/ThirdSection';

function App() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target.id === 'hero-section') {
            setIsNavVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <>
      <Header isNavVisible={isNavVisible} />
      <div className="scroll-container" id="scroll-container">
        <div id="hero-section" ref={heroRef} className="scroll-section">
          <Hero />
        </div>
        <div className="scroll-section">
          <SplitSection />
        </div>
        <div className="scroll-section">
          <ThirdSection />
        </div>
      </div>
    </>
  );
}

export default App;