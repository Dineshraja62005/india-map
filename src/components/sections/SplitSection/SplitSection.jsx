import React, { useState, useEffect, useRef } from 'react';
import ScrambledText from '../../animations/ScrambledText/ScrambledText';
import FadingLettersText from '../../animations/FadingLettersText/FadingLettersText';
import './SplitSection.css';

const SplitSection = () => {
    // --- State and Refs for Internal Logic ---
    const videoRef = useRef(null);
    const topPaneRef = useRef(null);
    const bottomPaneRef = useRef(null);
    const [isTopPaneVisible, setIsTopPaneVisible] = useState(false);
    const [isBottomPaneVisible, setIsBottomPaneVisible] = useState(false);

    // --- Effect for Seamless Video Loop ---
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let isPlayingForward = true;
        const handleTimeUpdate = () => {
            if (isPlayingForward && video.currentTime >= video.duration - 0.1) {
                isPlayingForward = false;
                video.playbackRate = -1.0;
                video.play();
            } else if (!isPlayingForward && video.currentTime <= 0.1) {
                isPlayingForward = true;
                video.playbackRate = 1.0;
                video.play();
            }
        };
        video.addEventListener('timeupdate', handleTimeUpdate);
        return () => video.removeEventListener('timeupdate', handleTimeUpdate);
    }, []);

    // --- Effect for Pane Visibility and Animations ---
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.target.id === 'top-pane') {
                        setIsTopPaneVisible(entry.isIntersecting);
                    } else if (entry.target.id === 'bottom-pane') {
                        setIsBottomPaneVisible(entry.isIntersecting);
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (topPaneRef.current) observer.observe(topPaneRef.current);
        if (bottomPaneRef.current) observer.observe(bottomPaneRef.current);

        return () => {
            if (topPaneRef.current) observer.unobserve(topPaneRef.current);
            if (bottomPaneRef.current) observer.unobserve(bottomPaneRef.current);
        };
    }, []);

    return (
        <section className="split-section">
            <video
                ref={videoRef}
                className="background-video"
                autoPlay
                muted
                playsInline
                loop={false}
            >
                <source src="/river.mp4" type="video/mp4" />
            </video>

            <div id="top-pane" ref={topPaneRef} className="split-pane white-pane">
                <div className="pane-overlay"></div>
                <div className={`content-wrapper top-content ${isTopPaneVisible ? 'is-visible' : ''}`}>
                    <p className="animated-text">
                        Chemicals that <ScrambledText text="never break down" startAnimation={isTopPaneVisible} />
                        <br />
                        <strong>Accumulating in our <span className="highlight-word">bodies</span></strong>
                        <br />
                        And the world around us
                    </p>
                </div>
            </div>

            <div id="bottom-pane" ref={bottomPaneRef} className="split-pane black-pane">
                <div className="pane-overlay"></div>
                <div className={`content-wrapper bottom-content ${isBottomPaneVisible ? 'is-visible' : ''}`}>
                    <p className="animated-text dark-bg-text">
                        <FadingLettersText text="Disrupting our immune systems" startAnimation={isBottomPaneVisible} />
                        <br />
                        <strong>Linked to <span className="focus-pulse-text">health risks</span></strong>
                        <br />
                        And harming ecosystems
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SplitSection;