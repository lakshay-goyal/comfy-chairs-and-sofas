import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Armchair, Sofa, Star, DollarSign, Truck } from 'lucide-react';

const Index = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from Django API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in parallel
        const [productsRes, categoriesRes, featuresRes, topProductsRes] = await Promise.all([
          fetch('http://localhost:8000/api/data/products'),
          fetch('http://localhost:8000/api/data/category'),
          fetch('http://localhost:8000/api/data/features'),
          fetch('http://localhost:8000/api/data/top_products')
        ]);

        // Check if all responses are OK
        if (!productsRes.ok || !categoriesRes.ok || !featuresRes.ok || !topProductsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        // Parse JSON data
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        const featuresData = await featuresRes.json();
        const topProductsData = await topProductsRes.json();

        // Set state with fetched data
        setProducts(productsData.products);
        setCategories(categoriesData.categories);
        setFeatures(featuresData.features);
        setTopProducts(topProductsData.top_products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hardcoded hero section data
  const heroSection = {
    title: "Crafting Comfort, Defining Style",
    description: "Discover our collection of premium chairs and sofas, designed to transform your space into a haven of comfort and elegance.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2600&q=80"
  };

  // Hardcoded about section data
  const aboutSection = {
    title: "Our Story",
    description: "For over two decades, we've been crafting furniture that combines timeless design with unparalleled comfort. Every piece tells a story of craftsmanship, quality, and attention to detail.",
    features: [
      "Premium materials sourced globally",
      "Expert craftsmanship",
      "Lifetime warranty"
    ],
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
  };

  // Loading and error states
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in bg-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full">
            <img
              src={heroSection.image}
              alt="Modern living room with stylish furniture"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-in leading-tight">
              {heroSection.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-slide-in opacity-90 leading-relaxed">
              {heroSection.description}
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium transition-colors animate-slide-in"
              >
                Shop Collection <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/custom-designs"
                className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white border border-white/40 px-8 py-4 rounded-full font-medium transition-colors animate-slide-in"
              >
                Custom Designs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Top Products Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most popular and highly-rated furniture pieces
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topProducts.slice(0, 3).map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden group transition-colors duration-300">
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
                          className={`h-4 w-4 ${i < Math.floor(product.rating)
                              ? "text-primary fill-primary"
                              : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">Rs. {product.price}</span>
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
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium transition-colors"
            >
              View All Products <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of furniture categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-lg aspect-square"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h3 className="text-xl font-bold">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">{aboutSection.title}</h2>
              <p className="text-gray-600 leading-relaxed">
                {aboutSection.description}
              </p>
              <div className="space-y-4">
                {aboutSection.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Star className="h-5 w-5 text-primary" />
                    <span className="text-gray-800">{feature}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
              >
                Learn More <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="relative">
              <img
                src={aboutSection.image}
                alt="Craftsmanship"
                className="rounded-xl shadow-xl"
              />
              <div className="absolute inset-0 rounded-xl ring-1 ring-black/5"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;