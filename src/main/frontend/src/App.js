import React from 'react';
import './App.css'; // Import CSS for styling
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import CarListing from './Components/CarListing';
import Cart from './Components/Cart';
import Profile from './Components/Login';


function App() {
    return (
        <div className="app-container">
            {/* Define the Routes for the pages */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cars" element={<CarListing />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/Login" element={<Profile />} />
            </Routes>
        </div>
    );
}

export default App;