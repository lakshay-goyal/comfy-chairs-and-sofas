
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Product Details</h1>
      <p>Viewing product with ID: {id}</p>
    </div>
  );
};

export default ProductDetails;
