import React, { useEffect, useState } from 'react';
import ProductList from './ProductList.js';
import Cart from './Cart.js'
import '../../css/Shop.css'
import { useCart } from '../../context/CartContext.js';
import OrderDetails from './OrderDetails.js';
import orderLogo from '../../assets/order-logo.jpg'

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { placeOrder } = useCart();
  const [showOrderDetails, setShowOrderDetails] = React.useState(false);
  const [orderData, setOrderData] = React.useState(null);

  const handleViewOrder = () => {
    setShowOrderDetails(!showOrderDetails); // Toggle the visibility of order details
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await placeOrder();
      if (response.ok) {
        const data = await response.json();
        setOrderData(data);
        setShowOrderDetails(true); // Show order details after placing order
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage

      try {
        const response = await fetch('/user/product', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setProducts(result.data ? result.data : []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

 return (
    <div className="shop-page">
      <div className="shop-container">
        <div className="product-list">
          <h1>Shop</h1>
          <ProductList products={products} />
        </div>
        <div className="cart-and-order-container">
          <div className="cart">
          <Cart />
          </div>
          <button className="order-button" onClick={handleViewOrder}>
            <img src={orderLogo} alt="Order Logo" />
            View ORDER
          </button>
        </div>
      </div>
      {/* Order Details component */}
      {showOrderDetails && orderData && <OrderDetails order={orderData} />}
    </div>
  );
};

export default Shop;
