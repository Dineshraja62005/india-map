// src/components/Header.jsx

import React from 'react';
import staticLogo from '../assets/logo.svg';
import animatedLogo from '../assets/logo-animated.gif'; // Import the animated logo
import './Header.css';

const Header = React.forwardRef(({ isScrolled, isNavVisible, isMobileMenuOpen, setIsMobileMenuOpen }, ref) => {
    return (
        <header ref={ref} className={`site-header ${isScrolled ? 'scrolled' : ''} ${!isNavVisible ? 'hidden' : ''} ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
            <div className="header-container">
                <a
                    href="https://www.honeybadger.com/"
                    className="logo-link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {/* The original static logo */}
                    <img
                        src={staticLogo}
                        alt="PFAS Map Logo"
                        className="logo-image logo-static"
                    />
                    {/* The new animated logo (GIF) */}
                    <img
                        src={animatedLogo}
                        alt=""
                        className="logo-image logo-gif"
                        aria-hidden="true"
                    />
                </a>
                <nav className="main-nav">
                    <ul>
                        <li><a href="#">About PFAS</a></li>
                        <li><a href="#">Data Sources</a></li>
                        <li><a href="#">Get Involved</a></li>
                    </ul>
                </nav>
                <div className="header-actions">
                    <button className="button-primary">Contribute</button>
                </div>
                <button
                    className="mobile-nav-toggle"
                    aria-label="Toggle navigation"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <svg width="30" height="30" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    ) : (
                        <svg width="30" height="30" viewBox="0 0 24 24"><path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    )}
                </button>
            </div>
        </header>
    );
});

export default Header;