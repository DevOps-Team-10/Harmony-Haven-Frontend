// OrderDetails.js
import React from 'react';

const OrderDetails = ({ order }) => {
  return (
    <div className="order-details">
      <h2>Order Details</h2>
      <p>Order ID: {order.orderId}</p>
      <p>Status: <span style={{ color: 'green' }}>{order.status}</span></p>
      <ul>
        {order.items.map(item => (
          <li key={item.productId}>
            {item.productName} - Quantity: {item.quantity} - Price: ${item.price * item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
