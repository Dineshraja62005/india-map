import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Header from './components/sections/Header/Header';
import Hero from './components/sections/Hero/Hero';
import SplitSection from './components/sections/SplitSection/SplitSection';
// I'll assume you might add these back later
// import DangerSection from './components/DangerSection';
// import MapSection from './components/MapSection';

function App() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  // Create separate visibility states for each pane
  const [isTopPaneVisible, setIsTopPaneVisible] = useState(false);
  const [isBottomPaneVisible, setIsBottomPaneVisible] = useState(false);

  const heroRef = useRef(null);
  // Create refs to attach to each pane
  const topPaneRef = useRef(null);
  const bottomPaneRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Check the ID of the intersecting element and update the correct state
          if (entry.target.id === 'hero-section') {
            setIsNavVisible(entry.isIntersecting);
          } else if (entry.target.id === 'top-pane') {
            setIsTopPaneVisible(entry.isIntersecting);
          } else if (entry.target.id === 'bottom-pane') {
            setIsBottomPaneVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    // Tell the observer to watch all three elements
    if (heroRef.current) observer.observe(heroRef.current);
    if (topPaneRef.current) observer.observe(topPaneRef.current);
    if (bottomPaneRef.current) observer.observe(bottomPaneRef.current);

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (topPaneRef.current) observer.unobserve(topPaneRef.current);
      if (bottomPaneRef.current) observer.unobserve(bottomPaneRef.current);
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
            {/* Pass the refs and new visibility props to the SplitSection */}
            <SplitSection
                topPaneRef={topPaneRef}
                bottomPaneRef={bottomPaneRef}
                isTopPaneVisible={isTopPaneVisible}
                isBottomPaneVisible={isBottomPaneVisible}
            />
        </div>
      </div>
    </>
  );
}

export default App;