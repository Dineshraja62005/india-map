import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Added Router imports
import './App.css';
import Header from './components/sections/Header/Header';
import Hero from './components/sections/Hero/Hero';
import SplitSection from './components/sections/SplitSection/SplitSection';
import ThirdSection from './components/sections/ThirdSection/ThirdSection';
import AdminDashboard from './components/pages/AdminDashboard';
import Map from './components/sections/Map/Map';

// 1. Define the LandingPage component
// This contains the scroll logic and sections that were previously in App
const LandingPage = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const heroRef = useRef(null);

  // Keep the intersection observer logic here so the header still fades in/out correctly
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target.id === 'hero-section') {
            setIsNavVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.5 }
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
        <div className="scroll-section" id="map-section">
          <Map />
        </div>
      </div>
    </>
  );
};

// 2. Redefine App to handle Routing
function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the public main page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Route for the Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;