import React, { useState, useEffect, useRef } from 'react';
import FadingLettersText from '../../animations/FadingLettersText/FadingLettersText';
import ViteGlowBackground from '../../animations/ViteGlow/ViteGlowBackground';// Import the new 3D component
import '../SplitSection/SplitSection.css';
import '../DarkPane.css';
import './ThirdSection.css';

const ThirdSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    setIsVisible(entry.isIntersecting);
                });
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section ref={sectionRef} className="third-section-container dark-pane">
            <ViteGlowBackground />

            <div className="foreground-animation-container">
                {/* Use the new 3D component here */}
            </div>

            <div className={`content-wrapper bottom-content ${isVisible ? 'is-visible' : ''}`}>
                <p className="animated-text dark-bg-text">
                    <FadingLettersText text="A Modern Aesthetic" startAnimation={isVisible} />
                    <br />
                    <strong>With a 3D Model</strong>
                </p>
            </div>
        </section>
    );
};

export default ThirdSection;