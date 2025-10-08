import React from 'react';
import { Link } from 'react-scroll'; // Make sure this is from 'react-scroll'
import staticLogo from '../../../assets/logo.svg';
import animatedLogo from '../../../assets/logo-animated.gif'; 
import './Header.css';

const Header = React.forwardRef(({ isNavVisible }, ref) => {
    return (
        <header ref={ref} className={`site-header ${!isNavVisible ? 'nav-hidden' : ''}`}>
            <div className="header-container">
                <a href="/" className="logo-link">
                    <img src={staticLogo} alt="PFAS Map Logo" className="logo-image logo-static" />
                    <img src={animatedLogo} alt="" className="logo-image logo-gif" aria-hidden="true" />
                </a>
                
                <nav className="main-nav">
                    <ul>
                        {/* Update the 'to' prop to match the new div IDs */}
                        <li><Link to="intro-section" smooth={true} duration={1000} spy={true}>About PFAS</Link></li>
                        <li><a href="#">Data Sources</a></li>
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