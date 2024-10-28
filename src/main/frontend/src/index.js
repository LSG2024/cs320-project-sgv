import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Navbar from './Components/Navbar';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Navbar /> {/* Navbar is displayed across all pages */}
            <App /> {/* App component handles all routes */}
        </BrowserRouter>
    </React.StrictMode>
);

// Optional: For measuring performance
reportWebVitals();