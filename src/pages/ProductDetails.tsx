import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ArrowLeft, Truck, Shield, RefreshCw } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Modern Lounge Chair",
    price: 599,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8",
    category: "chairs",
    description: "Experience ultimate comfort with our Modern Lounge Chair. Featuring ergonomic design and premium materials, this chair is perfect for any contemporary living space.",
    features: [
      "High-density foam cushioning",
      "Premium leather upholstery",
      "Solid wood frame",
      "Adjustable reclining angle"
    ],
    dimensions: {
      width: "28 inches",
      height: "40 inches",
      depth: "32 inches"
    },
    colors: ["Black", "Brown", "Beige"]
  },
  {
    id: 2,
    name: "Comfort Sofa",
    price: 1299,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    category: "sofas",
    description: "The Comfort Sofa combines style with unmatched comfort. Perfect for family rooms and entertainment spaces, this sofa is built to last.",
    features: [
      "Deep seat cushions",
      "Stain-resistant fabric",
      "Hardwood frame",
      "No-sag springs"
    ],
    dimensions: {
      width: "84 inches",
      height: "36 inches",
      depth: "38 inches"
    },
    colors: ["Gray", "Navy", "Cream"]
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    price: 399,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8",
    category: "chairs",
    description: "Work in comfort with our Ergonomic Office Chair. Designed for long hours, this chair provides superior support and adjustability.",
    features: [
      "Adjustable lumbar support",
      "Breathable mesh back",
      "360° swivel",
      "Height adjustment"
    ],
    dimensions: {
      width: "26 inches",
      height: "42 inches",
      depth: "26 inches"
    },
    colors: ["Black", "Gray"]
  },
  {
    id: 4,
    name: "Sectional Sofa",
    price: 1899,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    category: "sofas",
    description: "Transform your living room with our versatile Sectional Sofa. Modern design meets exceptional comfort in this premium piece.",
    features: [
      "Modular design",
      "Premium upholstery",
      "Built-in storage",
      "Reversible chaise"
    ],
    dimensions: {
      width: "112 inches",
      height: "36 inches",
      depth: "65 inches"
    },
    colors: ["Gray", "Beige", "Blue"]
  }
];

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  const addToCart = () => {
    if (!product) return;
    
    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    const existingItem = existingCart.find(item => item.id === product.id);
    
    let updatedCart;
    if (existingItem) {
      updatedCart = existingCart.map(item =>
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

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/products" className="text-primary hover:text-primary/80">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl p-8">
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
              <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-primary fill-primary"
                          : "text-neutral-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-neutral-600">{product.rating} rating</span>
              </div>
              <p className="text-3xl font-bold text-primary">${product.price}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-neutral-600">{product.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="text-neutral-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Dimensions</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-neutral-100 rounded">
                  <p className="text-sm text-neutral-600">Width</p>
                  <p className="font-medium">{product.dimensions.width}</p>
                </div>
                <div className="text-center p-3 bg-neutral-100 rounded">
                  <p className="text-sm text-neutral-600">Height</p>
                  <p className="font-medium">{product.dimensions.height}</p>
                </div>
                <div className="text-center p-3 bg-neutral-100 rounded">
                  <p className="text-sm text-neutral-600">Depth</p>
                  <p className="font-medium">{product.dimensions.depth}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Available Colors</h3>
              <div className="flex gap-2">
                {product.colors.map((color, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-neutral-100 rounded text-sm"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            <hr className="border-neutral-200" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-neutral-600">Free delivery on orders over $1000</span>
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

            <button 
              onClick={addToCart}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg transition-colors"
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
