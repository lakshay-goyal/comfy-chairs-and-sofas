
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
            alt="Luxury furniture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-in">
            Crafting Comfort,<br />Defining Style
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-lg animate-slide-in">
            Discover our collection of premium chairs and sofas, designed to transform your space into a haven of comfort and elegance.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white text-neutral-900 px-6 py-3 rounded-full font-medium hover:bg-neutral-100 transition-colors animate-slide-in"
          >
            Shop Now <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              to="/products?category=chairs"
              className="group relative overflow-hidden rounded-lg aspect-[4/3]"
            >
              <img
                src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
                alt="Chairs collection"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-3xl font-bold">Chairs</h3>
              </div>
            </Link>
            <Link
              to="/products?category=sofas"
              className="group relative overflow-hidden rounded-lg aspect-[4/3]"
            >
              <img
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04"
                alt="Sofas collection"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-3xl font-bold">Sofas</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-neutral-600 mb-8">
                For over two decades, we've been crafting furniture that combines timeless design with unparalleled comfort. Every piece tells a story of craftsmanship, quality, and attention to detail.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-neutral-900 font-medium hover:text-neutral-600 transition-colors"
              >
                Learn More <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04"
                alt="Craftsmanship"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
