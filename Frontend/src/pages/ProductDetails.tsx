import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ArrowLeft, Truck, Shield, RefreshCw } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseURL}/api/products/${id}/`);
        
        if (!response.ok) {
          throw new Error(response.status === 404 
            ? 'Product not found' 
            : 'Failed to fetch product');
        }

        const data = await response.json();
        
        // Validate and transform the API response
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid product data received');
        }

        const validatedProduct = {
          id: data.id || 0,
          name: data.name || 'No name available',
          price: data.price ? parseFloat(data.price).toFixed(2) : '0.00',
          stock: data.stock || 0,
          description: data.description || 'No description available',
          category: data.category?.name || 'Uncategorized',
          features: Array.isArray(data.features) 
            ? data.features.map(f => f.name || 'Feature') 
            : ['No features listed'],
          image: data.image_url || 'https://via.placeholder.com/600',
          isActive: data.is_active || false,
          createdAt: data.created_at || '',
          updatedAt: data.updated_at || ''
        };

        setProduct(validatedProduct);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    if (!product) return;

    try {
      const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const existingItem = existingCart.find(item => item.id === product.id);

      const updatedCart = existingItem
        ? existingCart.map(item => 
            item.id === product.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          )
        : [...existingCart, { 
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1 
          }];

      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      alert(`${product.name} added to cart!`);
    } catch (err) {
      alert('Failed to add to cart');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <span className="ml-4">Loading product details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">{error}</h1>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">Product Not Found</h1>
            <Link
              to="/products"
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary-light mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-8 transition-colors duration-300">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600';
                }}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Basic Info */}
            <div>
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                <span className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light px-2 py-1 rounded">
                  {product.category}
                </span>
                {product.isActive && (
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                    In Stock
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-4 dark:text-white">{product.name}</h1>
              <p className="text-3xl font-bold text-primary dark:text-primary-light">
                ${product.price}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                {product.stock} items available
              </p>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2 dark:text-white">Description</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold mb-3 dark:text-white">Key Features</h3>
              {product.features.length > 0 ? (
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary dark:text-primary-light" />
                      <span className="text-neutral-600 dark:text-neutral-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-neutral-400 italic">No features listed</p>
              )}
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-left p-3 bg-neutral-100 dark:bg-neutral-800 rounded">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Added</p>
                <p className="font-medium dark:text-white">
                  {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-left p-3 bg-neutral-100 dark:bg-neutral-800 rounded">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Last Updated</p>
                <p className="font-medium dark:text-white">
                  {new Date(product.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <hr className="border-neutral-200 dark:border-neutral-700" />

            {/* Policies */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary dark:text-primary-light" />
                <span className="text-neutral-600 dark:text-neutral-400">Free delivery on orders over $100</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary dark:text-primary-light" />
                <span className="text-neutral-600 dark:text-neutral-400">2-year warranty included</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="h-5 w-5 text-primary dark:text-primary-light" />
                <span className="text-neutral-600 dark:text-neutral-400">30-day return policy</span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={addToCart}
              className="w-full bg-primary hover:bg-primary/90 text-white dark:bg-primary-light dark:hover:bg-primary-light/90 dark:text-black font-medium py-3 rounded-lg transition-colors"
              disabled={!product.isActive || product.stock <= 0}
            >
              {product.isActive && product.stock > 0 
                ? 'Add to Cart' 
                : product.stock <= 0 
                  ? 'Out of Stock' 
                  : 'Not Available'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;