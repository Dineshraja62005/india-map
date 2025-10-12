import React, { useState, useEffect, useRef } from 'react';
import FadingLettersText from '../../animations/FadingLettersText/FadingLettersText';
import '../SplitSection/SplitSection.css';
import '../DarkPane.css';

const ThirdSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    // Effect for section visibility
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
        <section ref={sectionRef} className="split-pane dark-pane">
            {/* The <video> element has been removed from here */}
            <div className="pane-overlay"></div>
            <div className={`content-wrapper bottom-content ${isVisible ? 'is-visible' : ''}`}>
                <p className="animated-text dark-bg-text">
                    <FadingLettersText text="This is the third page" startAnimation={isVisible} />
                    <br />
                    <strong>With the same shared style</strong>
                </p>
            </div>
        </section>
    );
};

export default ThirdSection;