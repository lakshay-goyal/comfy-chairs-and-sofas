import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Star, Filter, ChevronDown, Heart, ShoppingBag } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState('newest');
  const [wishlist, setWishlist] = useState([]);
  
  const categoryFilter = searchParams.get('category');
  const categories = ['All', 'Sofa', 'Chair', 'Table', 'Bed', 'Lighting', 'Decor'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/api/data/products");
        if (!response.ok) throw new Error('Failed to fetch products');
        const { products } = await response.json();
        setProducts(products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const handleCategoryChange = (category) => {
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const applyFilters = () => {
    let filtered = [...products];
    
    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        // Assuming products are already sorted by newest
        break;
    }
    
    return filtered;
  };

  const filteredProducts = applyFilters();

  // Loading skeleton
  if (loading) return (
    <div className="min-h-screen bg-neutral-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-pulse">
          <div className="h-10 bg-neutral-200 rounded-lg w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-neutral-200 rounded w-full max-w-2xl mx-auto"></div>
          <div className="h-4 bg-neutral-200 rounded w-5/6 max-w-xl mx-auto mt-2"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
              <div className="aspect-square bg-neutral-200"></div>
              <div className="p-6">
                <div className="h-5 bg-neutral-200 rounded w-3/4 mb-2"></div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 w-4 bg-neutral-200 rounded"></div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-neutral-200 rounded w-20"></div>
                  <div className="h-4 bg-neutral-200 rounded w-24"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-neutral-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
        <p className="text-neutral-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      {/* Hero Banner */}
      <div className="bg-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Our Collection</h1>
            <p className="text-lg text-amber-100">
              Thoughtfully designed furniture that brings comfort and style to your space. 
              Explore handcrafted pieces that inspire.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Pills */}
        <div className="flex overflow-x-auto pb-4 -mx-2 mb-8 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`whitespace-nowrap px-6 py-2 mx-2 rounded-full text-sm font-medium transition-colors ${
                (category === 'All' && !categoryFilter) || 
                (categoryFilter && category.toLowerCase() === categoryFilter.toLowerCase())
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-4 rounded-xl shadow-sm">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-neutral-700 font-medium mb-4 md:mb-0"
          >
            <Filter className="h-5 w-5" />
            Filter Products
            <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-500">Sort by:</span>
            <select 
              value={sortBy}
              onChange={handleSortChange}
              className="bg-neutral-100 border-none rounded-lg py-2 px-4 text-sm focus:ring-2 focus:ring-amber-500"
            >
              <option value="newest">Newest</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
        
        {/* Extended Filters */}
        {showFilters && (
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min="0" 
                  max="100000" 
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-amber-600"
                />
                <span className="text-sm whitespace-nowrap">Up to Rs. {priceRange[1].toLocaleString()}</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Material</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-amber-600 focus:ring-amber-500" />
                  <span>Wood</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-amber-600 focus:ring-amber-500" />
                  <span>Metal</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-amber-600 focus:ring-amber-500" />
                  <span>Fabric</span>
                </label>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Rating</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="radio" name="rating" className="text-amber-600 focus:ring-amber-500" />
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
                    ))}
                    <Star className="h-4 w-4 text-neutral-300" />
                    <span className="ml-2">& up</span>
                  </div>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="rating" className="text-amber-600 focus:ring-amber-500" />
                  <div className="flex">
                    {[...Array(3)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
                    ))}
                    {[...Array(2)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-neutral-300" />
                    ))}
                    <span className="ml-2">& up</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}
        
        {/* Results Count */}
        <div className="mb-8">
          <p className="text-neutral-600">
            Showing <span className="font-medium text-neutral-900">{filteredProducts.length}</span> products
            {categoryFilter ? ` in "${categoryFilter}"` : ''}
          </p>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
              <ShoppingBag className="h-8 w-8 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No products found</h2>
            <p className="text-neutral-600 mb-6">Try adjusting your filters or browse our other categories.</p>
            <button 
              onClick={() => {
                setSearchParams({});
                setPriceRange([0, 100000]);
                setSortBy('newest');
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-300">
                <Link to={`/products/${product.id}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                      {product.category}
                    </div>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-neutral-100 transition-colors"
                    >
                      <Heart className={`h-5 w-5 ${
                        wishlist.includes(product.id) 
                          ? "text-red-500 fill-red-500" 
                          : "text-neutral-400"
                      }`} />
                    </button>
                  </div>
                </Link>
                
                <div className="p-6">
                  <Link to={`/products/${product.id}`} className="block">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-amber-600 transition-colors">{product.name}</h3>
                  </Link>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "text-amber-500 fill-amber-500"
                              : "text-neutral-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-neutral-500">{product.rating}</span>
                    <span className="text-sm text-neutral-400">({Math.floor(Math.random() * 50) + 10})</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-neutral-900">Rs. {product.price.toLocaleString()}</span>
                    <Link
                      to={`/products/${product.id}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      View <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="mt-12 flex justify-center">
            <div className="inline-flex rounded-md shadow-sm">
              <button className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-l-lg hover:bg-neutral-50">
                Previous
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-amber-600">
                1
              </button>
              <button className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50">
                2
              </button>
              <button className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50">
                3
              </button>
              <button className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-r-lg hover:bg-neutral-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;