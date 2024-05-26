import React from 'react';
import ProductItem from './ProductItem.js';

const ProductList = ({ products }) => {
  return (
    <div className="product-grid grid grid-cols-2 gap-4 p-4">
      {products.map((product, index) => (
        <ProductItem key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
