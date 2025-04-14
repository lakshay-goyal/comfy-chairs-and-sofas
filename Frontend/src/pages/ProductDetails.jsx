import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ArrowLeft, Truck, Shield, RefreshCw, Eye } from 'lucide-react';

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

        const validatedProduct = {
          id: data.id || 0,
          name: data.name || 'No name available',
          price: data.price ? parseFloat(data.price).toFixed(2) : '0.00',
          stock: Number(data.stock) || 0,
          description: data.description || 'No description available',
          category: data.category?.name || 'Uncategorized',
          features: Array.isArray(data.features)
            ? data.features.map(f => f.name || 'Feature')
            : ['No features listed'],
          image: data.image_url || 'https://via.placeholder.com/600',
          isActive: data.is_active ?? true, // ← changed default to true for visibility
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

  const handlePreview = () => {
    // navigate(`/preview`);
    navigate(`/preview/${product.id}`);
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
      <div className="min-h-screen bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{error}</h1>
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
      <div className="min-h-screen bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
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
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-xl p-8">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600';
                }}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Basic Info */}
            <div>
              <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                  {product.category}
                </span>
                {product.isActive && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    In Stock
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-3xl font-bold text-primary">
                Rs. {product.price}
              </p>
              <p className="text-sm text-neutral-600 mt-1">
                {product.stock} items available
              </p>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-neutral-600">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold mb-3">Key Features</h3>
              {product.features.length > 0 ? (
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" />
                      <span className="text-neutral-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-neutral-400 italic">No features listed</p>
              )}
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-left p-3 bg-neutral-100 rounded">
                <p className="text-sm text-neutral-600">Added</p>
                <p className="font-medium">
                  {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-left p-3 bg-neutral-100 rounded">
                <p className="text-sm text-neutral-600">Last Updated</p>
                <p className="font-medium">
                  {new Date(product.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <hr className="border-neutral-200" />

            {/* Policies */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-neutral-600">Delivery Service for Bulk Orders</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-neutral-600">2-year warranty included</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="h-5 w-5 text-primary" />
                <span className="text-neutral-600">30-day return policy</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handlePreview}
                className="flex-1 flex items-center justify-center gap-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-medium py-3 rounded-lg transition-colors"
              >
                <Eye className="h-5 w-5" /> Preview
              </button>

              <button
                onClick={addToCart}
                disabled={!product.isActive || product.stock <= 0}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                  product.isActive && product.stock > 0
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
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
    </div>
  );
};

export default ProductDetails;
