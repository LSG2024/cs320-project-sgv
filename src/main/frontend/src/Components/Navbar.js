import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">SpyAuto</div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/cars">Cars</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/Login">Login</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
