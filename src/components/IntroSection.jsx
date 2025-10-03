import React, { useState } from 'react'; // Import useState
import { useInView } from 'react-intersection-observer';
import './IntroSection.css';

const videos = [
    { id: 'l_c_lQn1_oM', title: 'What are PFAS?' },
    { id: 'RzX62GIO4yE', title: 'The fight against forever chemicals' },
];

export default function IntroSection() {
    // State to hold the ID of the video that is currently playing
    const [playingVideoId, setPlayingVideoId] = useState(null);

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <>
            <section
                ref={ref}
                className={`intro-section ${inView ? 'is-visible' : ''}`}
            >
                <div className="floating-element shape-1"></div>
                <div className="floating-element shape-2"></div>
                <div className="floating-element shape-3"></div>
                <div className="content-wrapper">
                    <div className="intro-text">
                        <div className="title-container">
                            <h2>What Are "Forever Chemicals"?</h2>
                        </div>
                        <p>
                            Per- and polyfluoroalkyl substances (PFAS) are a group of thousands of man-made chemicals used in industry and consumer products since the 1940s.
                        </p>
                        <p>
                            They are known as "forever chemicals" because their strong carbon-fluorine bond—one of the strongest in chemistry—makes them extremely resistant to breaking down in the environment and in our bodies.
                        </p>
                    </div>
                    <div className="video-gallery">
                        <h3>Learn More From Experts</h3>
                        <div className="video-thumbnails">
                            {videos.map((video) => (
                                // Add onClick to open the video
                                <div key={video.id} className="video-thumbnail" onClick={() => setPlayingVideoId(video.id)}>
                                    <img
                                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                                        alt={video.title}
                                    />
                                    <div className="play-button-overlay">
                                        <div className="play-button">&#9658;</div>
                                    </div>
                                    <p className="video-title">{video.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- NEW: The Video Popup Modal --- */}
            {playingVideoId && (
                <div className="video-modal-overlay" onClick={() => setPlayingVideoId(null)}>
                    <button className="close-modal-button" onClick={() => setPlayingVideoId(null)}>×</button>
                    <div className="video-modal-content">
                        <button className="close-modal-button" onClick={() => setPlayingVideoId(null)}>×</button>
                        <iframe
                            src={`https://www.youtube.com/embed/${playingVideoId}?autoplay=1`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </>
    );
}