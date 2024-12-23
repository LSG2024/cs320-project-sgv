import React, { useEffect, useState } from 'react';
import './CarListing.css';

const CarListing = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        // Fetch car data from the backend
        const fetchCars = async () => {
            try {
                const response = await fetch('/api/cars');
                const data = await response.json();
                setCars(data);
            } catch (error) {
                console.error("Error fetching cars:", error);
            }
        };

        fetchCars();
    }, []);

    const addToCart = async (carId) => {
        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ car: { id: carId }, quantity: 1 })
            });

            if (response.ok) {
                alert("Car added to cart!");
            } else {
                const errorText = await response.text();
                console.error("Failed to add car to cart", response.status, errorText);
                alert(`Failed to add car to cart. Status: ${response.status}, Error: ${errorText}`);
            }
        } catch (error) {
            console.error("Error adding car to cart:", error);
            alert("An error occurred. Check console for details.");
        }
    };

    return (
        <div className="car-listing">
            <h1>Available Cars</h1>
            <div className="car-table">
                {cars.map(car => (
                    <div className="car-card" key={car.id}>
                        <img src={car.imageUrl} alt={`${car.name} ${car.model}`} className="car-image" />
                        <h2>{car.name} {car.model}</h2>
                        <p className="car-year-price">Cost: {car.year}  ${car.price}</p>
                        <div className="car-options">
                            <button className="option-button" onClick={() => addToCart(car.id)}>Send to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarListing;


