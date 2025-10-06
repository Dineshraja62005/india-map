import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import IntroSection from './components/IntroSection';
import { Element } from 'react-scroll';

function App() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isIntroVisible, setIsIntroVisible] = useState(false); // New state for intro animations
  
  const heroRef = useRef(null);
  const introRef = useRef(null); // New ref for the intro section

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Check which element is intersecting
          if (entry.target.id === 'hero-section-wrapper') {
            setIsNavVisible(entry.isIntersecting);
          } else if (entry.target.id === 'intro-section-wrapper') {
            setIsIntroVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.4 } // Trigger when 40% of the section is visible
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (introRef.current) observer.observe(introRef.current);

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (introRef.current) observer.unobserve(introRef.current);
    };
  }, []);

  return (
    <>
      <Header isNavVisible={isNavVisible} />

      <div className="scroll-container" id="scroll-container">
        
        {/* We give each wrapper a unique id and a ref */}
        <div id="hero-section-wrapper" ref={heroRef} className="scroll-section">
          <Element name="hero">
            <Hero />
          </Element>
        </div>

        <div id="intro-section-wrapper" ref={introRef} className="scroll-section">
          <Element name="intro">
            {/* Pass the visibility state as a prop */}
            <IntroSection isVisible={isIntroVisible} />
          </Element>
        </div>

        <Element name="mainContent" className="scroll-section normal-scroll">
        </Element>
      </div>
    </>
  );
}

export default App;