import React, { useState } from 'react';
import './App.css'; // Import CSS for styling

function App() {
    // State variables for first name, last name, and the message
    const [firstName, setFirst] = useState('');
    const [lastName, setLast] = useState('');
    const [message, setMessage] = useState('');

    // Function to handle the form submission and make the fetch request
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Update the body to match the keys expected by the backend
        const response = await fetch("/hello/personalized", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Use `first` and `last` to match backend expectations
            body: JSON.stringify({ first: firstName, last: lastName }),
        });

        const text = await response.text();
        setMessage(text); // Set the personalized message received from the backend
    };

    return (
        <div className="app-container">
            <h1>Personalized Greeting</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirst(e.target.value)} // Update the state with input value
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLast(e.target.value)} // Update the state with input value
                />
                <button type="submit">Submit</button>
            </form>
            <p>{message}</p> {/* Display the personalized message */}
        </div>
    );
}

export default App;