import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ArrowLeft, Truck, Shield, RefreshCw } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details from Django API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/data/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const foundProduct = data.products.find((p) => p.id === Number(id));
        if (!foundProduct) {
          throw new Error('Product not found');
        }
        setProduct(foundProduct);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Add product to cart
  const addToCart = () => {
    if (!product) return;

    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItem = existingCart.find((item) => item.id === product.id);

    let updatedCart;
    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...existingCart, { ...product, quantity: 1 }];
    }

    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    alert('Product added to cart!');
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">{error}</h1>
            <Link
              to="/products"
              className="text-primary hover:text-primary/80 dark:text-primary-light dark:hover:text-primary-light/80"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Product not found state
  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">Product Not Found</h1>
            <Link
              to="/products"
              className="text-primary hover:text-primary/80 dark:text-primary-light dark:hover:text-primary-light/80"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary-light mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-8 transition-colors duration-300">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                <span className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-4 dark:text-white">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-primary fill-primary dark:text-primary-light dark:fill-primary-light"
                          : "text-neutral-300 dark:text-neutral-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-neutral-600 dark:text-neutral-400">{product.rating} rating</span>
              </div>
              <p className="text-3xl font-bold text-primary dark:text-primary-light">Rs. {product.price}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2 dark:text-white">Description</h3>
              <p className="text-neutral-600 dark:text-neutral-400">{product.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3 dark:text-white">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary dark:text-primary-light" />
                    <span className="text-neutral-600 dark:text-neutral-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 dark:text-white">Dimensions</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-neutral-100 dark:bg-neutral-800 rounded">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Width</p>
                  <p className="font-medium dark:text-white">{product.dimensions.width}</p>
                </div>
                <div className="text-center p-3 bg-neutral-100 dark:bg-neutral-800 rounded">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Height</p>
                  <p className="font-medium dark:text-white">{product.dimensions.height}</p>
                </div>
                <div className="text-center p-3 bg-neutral-100 dark:bg-neutral-800 rounded">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Depth</p>
                  <p className="font-medium dark:text-white">{product.dimensions.depth}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 dark:text-white">Available Colors</h3>
              <div className="flex gap-2">
                {product.colors.map((color, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-sm dark:text-white"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            <hr className="border-neutral-200 dark:border-neutral-700" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary dark:text-primary-light" />
                <span className="text-neutral-600 dark:text-neutral-400">Free delivery on orders over $1000</span>
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

            <button
              onClick={addToCart}
              className="w-full bg-primary hover:bg-primary/90 text-white dark:bg-primary-light dark:hover:bg-primary-light/90 dark:text-black font-medium py-3 rounded-lg transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;