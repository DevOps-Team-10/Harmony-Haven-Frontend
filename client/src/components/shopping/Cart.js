// src/components/shopping/Cart.js
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext.js';
import OrderDetails from './OrderDetails.js';
import '../../css/Shop.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart, placeOrder } = useCart();
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State for success message
  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    try {
      const response = await placeOrder();
      if (response.ok) {
        const data = await response.json();
        // Set order data and show order details
        setOrderData(data);
        setShowOrderDetails(true);
        setShowSuccessMessage(true); // Show success message
        setTimeout(() => setShowSuccessMessage(false), 3000); // Hide after 3 seconds
        clearCart(); // Clear cart after placing order
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.product._id} className="cart-item">
              <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
              <div className="cart-item-details">
                <p>{item.product.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.product.price * item.quantity}</p>
                <button onClick={() => removeFromCart(item.product._id)} className="remove-button">Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total">
        <p>Total: ${totalPrice.toFixed(2)}</p>
        <button onClick={clearCart} className="clear-cart-button red-button">Clear Cart</button>
        <button onClick={handlePlaceOrder} className="place-order-button">Place Order</button>
      </div>
      {showSuccessMessage && (
        <div className="success-message">
          Order placed successfully!
        </div>
      )}
      {showOrderDetails && (
        <OrderDetails orders={orderData} onClose={() => setShowOrderDetails(false)} />
      )}
    </div>
  );
};

export default Cart;
