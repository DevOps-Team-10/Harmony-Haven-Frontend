import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item.product._id === product._id);
      if (existingProductIndex !== -1) {
        // Update quantity of existing product
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Add new product to cart
        return [...prevCart, { product, quantity }];
      }
    });
  };
  

  const removeFromCart = productId => {
    setCart(prevCart => prevCart.filter(item => item.product._id !== productId));
  };

  const clearCart = () => setCart([]);

  const placeOrder = async () => {
    const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage

    try {
      const orderData = {
        items: cart.map(item => ({ productId: item.product._id, quantity: item.quantity })),
        orderStatus: "Completed",
        paymentDone: true
      };
      // Call the API to place the order
      const response = await fetch('/user/order/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });
      if (response.ok) {
        // Clear the cart if order is successfully placed
        clearCart();
        // Optionally, you can do something else after placing the order
      } else {
        // Handle error if order placement fails
        console.error('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};
