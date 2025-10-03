import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import Map from './components/Map';
import { Link as ScrollLink } from 'react-scroll';
import IntroSection from './components/IntroSection';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const headerRef = useRef(null); // Ref to get the header element
  const [headerHeight, setHeaderHeight] = useState(0); // State to store its height

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- NEW EFFECT TO MEASURE HEADER ---
  useEffect(() => {
    // Set the header height once the component mounts
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="hero-grid-container">
        <Header
          isScrolled={isScrolled}
          isNavVisible={isNavVisible}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        <div className="scroll-container"></div>

        <section className="hero">
          <div className="hero-background"></div>
          <div className="content-wrapper">
            <h1>Uncovering the Invisible Threat: Forever Chemicals in India</h1>
            <p>An open-source initiative to track PFAS contamination across India.</p>
          </div>
          <ScrollLink
            to="main-content"
            smooth={true}
            duration={1000}
            offset={-headerHeight} // Use the state variable here
            className="scroll-down-link"
            aria-label="Scroll to main content"
          >
            <div className="scroll-down-icon">
              <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </ScrollLink>
        </section>
      </div>

      <main id="main-content">
        <IntroSection />
        <div className="content-wrapper">
          <Map />
        </div>
      </main>

      <footer>
        <div className="content-wrapper">
          <p>&copy; 2025 PFAS Project | Licensed under the MIT License</p>
        </div>
      </footer>
    </>
  );
}

export default App;