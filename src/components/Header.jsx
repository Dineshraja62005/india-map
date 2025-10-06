import React from 'react';
import { Link } from 'react-scroll';
import staticLogo from '../assets/logo.svg';
import animatedLogo from '../assets/logo-animated.gif';
import './Header.css';

// The header now accepts both props again
const Header = React.forwardRef(({ isNavVisible, isScrolled }, ref) => {
    return (
        <header
            ref={ref}
            // The 'nav-hidden' class controls overall visibility
            // The 'scrolled' class controls the blurred background
            className={`site-header ${!isNavVisible ? 'nav-hidden' : ''} ${isScrolled ? 'scrolled' : ''}`}
        >
            <div className="header-container">
                <a href="/" className="logo-link">
                    <img src={staticLogo} alt="PFAS Map Logo" className="logo-image logo-static" />
                    <img src={animatedLogo} alt="" className="logo-image logo-gif" aria-hidden="true" />
                </a>
                
                <nav className="main-nav">
                    <ul>
                        <li><Link to="dangers" smooth={true} duration={1000} spy={true}>About PFAS</Link></li>
                        <li><Link to="map" smooth={true} duration={1000} spy={true}>The Map</Link></li>
                        <li><a href="#">Get Involved</a></li>
                    </ul>
                </nav>
                <div className="header-actions">
                    <button className="button-primary">Contribute</button>
                </div>
            </div>
        </header>
    );
});

export default Header;