// Shop.js
import React, { useEffect, useState, useContext } from 'react';
import ProductList from './ProductList.js';
import Cart from './Cart.js';
import '../../css/Shop.css';
import { useCart } from '../../context/CartContext.js';
import OrderDetails from './OrderDetails.js';
import orderLogo from '../../assets/order-logo.jpg';
import UserContext from '../../context/UserContext.js';

const Shop = () => {
  const userDetails = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { placeOrder } = useCart();
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [orderData, setOrderData] = useState([]);

  const handleViewOrder = async () => {
    if (!showOrderDetails) {
      try {
        const token = userDetails.user.accessToken;
        const response = await fetch('/user/order/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }

        const result = await response.json();
        setOrderData(result.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    }

    setShowOrderDetails(!showOrderDetails);
  };

  const handleCloseOrderDetails = () => {
    setShowOrderDetails(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const token = userDetails.user.accessToken;

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
  }, [userDetails]);

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
      {showOrderDetails && (
        <OrderDetails orders={orderData} onClose={handleCloseOrderDetails} />
      )}
    </div>
  );
};

export default Shop;
