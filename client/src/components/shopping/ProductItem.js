// src/components/shopping/ProductItem.js
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext.js';
import '../../css/Shop.css';

const ProductItem = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="product-item rounded overflow-hidden shadow-lg">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base">{product.description}</p>
        <div className="flex justify-between mt-4">
          <p className="font-bold">Type:</p>
          <p className="text-gray-700">{product.productType}</p>
        </div>
        <div className="flex justify-between mt-1">
          <p className="font-bold">Price:</p>
          <p className="text-gray-700">${product.price}</p>
        </div>
        <div className="flex justify-between mt-1">
          <p className="font-bold">Quantity:</p>
          <p className="text-gray-700">{product.quantity}</p>
        </div>
        <div className="flex justify-between mt-1">
          <p className="font-bold">Rating:</p>
          <p className="text-gray-700">{product.averageRating}</p>
        </div>
        <div className="flex mt-4 items-center">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            className="border rounded w-12 text-center"
          />
          <button onClick={handleAddToCart} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
