import React, { useEffect } from 'react';
import './Home.css';

const Home = () => {
    useEffect(() => {
        // Function to handle scroll events
        const handleScroll = () => {
            console.log("Scroll event triggered");
            const container = document.querySelector('.home-container');
            if (window.scrollY > 50) {
                console.log("Adding 'scrolled' class");
                container.classList.add('scrolled');
            } else {
                console.log("Removing 'scrolled' class");
                container.classList.remove('scrolled');
            }
        };


        // Add the scroll event listener to the window
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array means this runs once when the component mounts

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
