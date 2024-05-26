import React from 'react';
import '../../css/ProductItem.css'

const ProductItem = ({ product }) => {
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
      </div>
    </div>
  );
};

export default ProductItem;
