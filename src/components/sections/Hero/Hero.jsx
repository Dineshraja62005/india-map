// src/components/Hero.jsx

import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-background"></div>
            <div className="content-wrapper">
                <h1>Uncovering the Invisible Threat: Forever Chemicals in India</h1>
                <p>An open-source initiative to track PFAS contamination across India.</p>
            </div>
            <ScrollLink
                to="about-section" // Changed from "main-content" to the correct ID
                smooth={true}
                duration={1000}
                className="scroll-down-link"
                aria-label="Scroll to main content"
            >
                <div className="scroll-down-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
            </ScrollLink>
        </section>
    );
};

export default Hero;