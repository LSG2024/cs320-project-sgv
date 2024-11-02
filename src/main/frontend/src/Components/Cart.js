import React, { useEffect, useState } from 'react';
import './Cart.css';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch('/api/cart');
                const data = await response.json();
                setCart(data);
                calculateTotal(data);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, []);

    const calculateTotal = (items) => {
        const totalAmount = items.reduce((sum, item) => sum + item.car.price * item.quantity, 0);
        setTotal(totalAmount);
    };

    const deleteFromCart = async (itemId) => {
        try {
            const response = await fetch(`/api/cart/${itemId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedCart = cart.filter(item => item.id !== itemId);
                setCart(updatedCart); // Update state to refresh the cart view
                alert("Item removed from cart!");
            } else {
                console.error("Failed to remove item from cart", response.status);
                alert("Failed to remove item from cart.");
            }
        } catch (error) {
            console.error("Error deleting item from cart:", error);
        }
    };


    return (
        <div className="cart-container">
            <h1 className="cart-header">Your Cart</h1>
            {cart.length === 0 ? (
                <p>No cars added to the cart yet.</p>
            ) : (
                <div className="cart-grid">
                    {cart.map((item, index) => (
                        <div key={index} className="cart-card">
                            <img
                                src={item.car.imageUrl || 'placeholder.jpg'}
                                alt={`${item.car.name} ${item.car.model}`}
                                className="cart-card-image"
                            />
                            <div className="cart-card-details">
                                <h2 className="cart-card-name">{item.car.name} {item.car.model}</h2>
                                <p className="cart-card-price">${item.car.price}</p>
                                <p className="cart-card-quantity">Quantity: {item.quantity}</p>
                                <button onClick={() => deleteFromCart(item.id)} className="delete-button">Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="cart-total">Total: ${total.toFixed(2)}</div>
            <button className="checkout-button">Checkout</button>
        </div>
    );
};

export default Cart;




