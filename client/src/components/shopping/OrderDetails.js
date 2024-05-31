// OrderDetails.js
import React from 'react';
import '../../css/OrderDetails.css';

const OrderDetails = ({ orders, onClose }) => {
  return (
    <div className="order-details-modal">
      <div className="order-details-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        {orders.map((order) => (
          <div key={order.orderId} className="order-details">
            <h2>Order Details</h2>
            <p><strong>Order Status:</strong> <span style={{ color: 'green' }}>{order.orderStatus}</span></p>
            <p><strong>Payment Done:</strong> {order.paymentDone ? 'Yes' : 'No'}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <ul>
              {order.items.map((item) => (
                <li key={item._id}>
                  <p><strong>Product Name:</strong> {item.productName}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Price:</strong> ${item.price}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
