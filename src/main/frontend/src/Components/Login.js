import React, { useState } from 'react';
import './Login.css'; // Import CSS for styling

const Login = () => {
    const [user, setUser] = useState({
        username: '',
        email: ''
    });
    const [message, setMessage] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic frontend validation
        if (!user.username.trim() || !user.email.trim()) {
            setMessage("Username and email cannot be blank.");
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(user.email)) {
            setMessage("Please enter a valid email address.");
            return;
        }

        // Define the API URL based on the environment
        const apiUrl = process.env.NODE_ENV === 'development'
            ? `/hello/personalized/${user.username}` // Local development URL
            : `https://c6qyvqoyg3.execute-api.us-east-1.amazonaws.com/submit-name`; // AWS API Gateway URL for production

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: user.username })
            });

            if (response.status === 409) {
                setMessage(`Username "${user.username}" already exists. Please choose another one.`);
            } else if (response.status === 404) {
                setMessage("The requested resource was not found. Please check the API endpoint.");
            } else if (response.status === 500) {
                setMessage("Internal server error. Please try again later.");
            } else if (response.ok) {
                setMessage(`Hello ${user.username}, your profile has been updated successfully!`);
            } else {
                setMessage("An unexpected error occurred. Please try again later.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setMessage("An error occurred while updating. Please check your network and try again.");
        }
    };


    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Profile</h1>
                <form onSubmit={handleSubmit}>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        required
                    />
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                    <button type="submit">Update</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default Login;

