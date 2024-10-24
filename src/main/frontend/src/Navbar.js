import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                    <span></span>
                    <Link to="/Page2">Page 2</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar; // Add this line
