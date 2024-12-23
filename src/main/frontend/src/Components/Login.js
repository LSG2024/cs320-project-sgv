import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [user, setUser] = useState({
        name: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submission triggered");

        if (!user.name.trim() || !user.password.trim()) {
            setMessage("Username and password cannot be blank.");
            console.log("Validation failed: Blank username or password");
            return;
        }

        const apiUrl = `/auth/${isSignUp ? 'signup' : 'login'}`;
        console.log("API URL:", apiUrl);

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            console.log("Response status:", response.status);

            if (response.status === 409) {
                setMessage(`Username "${user.name}" already exists. Please choose another one.`);
            } else if (response.status === 401) {
                setMessage("Invalid username or password.");
            } else if (response.ok) {
                setMessage(isSignUp ? "User registered successfully!" : "Login successful!");
            } else {
                setMessage("An unexpected error occurred. Please try again later.");
            }
        } catch (error) {
            console.error("Error during login/signup:", error);
            setMessage("An error occurred while processing your request. Please try again later.");
        }
    };



    return (
        <div className="login-container">
            <div className="login-form">
                <h1>{isSignUp ? "Sign Up" : "Log In"}</h1>
                <form onSubmit={handleSubmit}>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        required
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                    <button type="submit">{isSignUp ? "Sign Up" : "Log In"}</button>
                </form>
                <p className="toggle-text" onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? "Have an account? Log in" : "Don't have an account? Sign up"}
                </p>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default Login;


