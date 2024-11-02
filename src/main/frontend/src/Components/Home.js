import React, { useEffect } from 'react';
import './Home.css';

const Home = () => {
    useEffect(() => {
        const handleScroll = () => {
            const container = document.querySelector('.home-container');
            if (window.scrollY > 50) {
                container.classList.add('scrolled');
            } else {
                container.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="home-container">
            <div className="hero-section">
                <h1>Welcome to SpyAuto</h1>
                <p>Your one-stop shop for buying and inquiring about cars!</p>
                <p>Explore our wide range of vehicles.</p>
            </div>
            <div className="contact-section">
                <button
                    className="contact-button"
                    onClick={() => window.location.href = "mailto:luispencergarcia@gmail.com"}
                >
                    Contact Us
                </button>
            </div>
        </div>
    );
};

export default Home;
