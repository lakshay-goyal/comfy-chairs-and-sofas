
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Modern Lounge Chair",
    price: 599,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8",
    category: "chairs"
  },
  {
    id: 2,
    name: "Comfort Sofa",
    price: 1299,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    category: "sofas"
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    price: 399,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8",
    category: "chairs"
  },
  {
    id: 4,
    name: "Sectional Sofa",
    price: 1899,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    category: "sofas"
  }
];

const Products = () => {
  return (
    <div className="bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Collection</h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of premium furniture pieces, each crafted with exceptional attention to detail and comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "text-primary fill-primary"
                            : "text-neutral-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-500">{product.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-neutral-900">${product.price}</span>
                  <Link
                    to={`/products/${product.id}`}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    View Details <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
