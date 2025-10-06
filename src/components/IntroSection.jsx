import React from 'react';
import ScrambledText from './ScrambledText';
import './IntroSection.css';

const IntroSection = ({ isVisible }) => {
    return (
        <section className="intro-section">
            <div className="content-wrapper">
                <div
                    className={`intro-content ${isVisible ? 'is-visible' : ''}`}
                >
                    <p className="intro-text">
                        Chemicals that <ScrambledText text="never break down" startAnimation={isVisible} />
                        <br />
                        {/* This is the line we are fixing */}
                        <strong>Accumulating in our <span className="highlight-word">bodies</span></strong>
                        <br />
                        And the world around us
                    </p>
                </div>
            </div>
        </section>
    );
};

export default IntroSection;