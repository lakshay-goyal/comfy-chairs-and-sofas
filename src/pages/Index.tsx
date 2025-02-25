
import { Link } from 'react-router-dom';
import { ArrowRight, Armchair, Sofa, Star, DollarSign, Truck } from 'lucide-react';

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
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-in">
            Crafting Comfort,<br />Defining Style
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-lg animate-slide-in opacity-90">
            Discover our collection of premium chairs and sofas, designed to transform your space into a haven of comfort and elegance.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium transition-colors animate-slide-in"
          >
            Shop Collection <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
              <Star className="h-10 w-10 text-primary" />
              <div>
                <h3 className="font-semibold text-lg">Premium Quality</h3>
                <p className="text-neutral-600">Handcrafted with premium materials</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
              <Truck className="h-10 w-10 text-primary" />
              <div>
                <h3 className="font-semibold text-lg">Free Shipping</h3>
                <p className="text-neutral-600">On orders over $1000</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
              <DollarSign className="h-10 w-10 text-primary" />
              <div>
                <h3 className="font-semibold text-lg">Price Guarantee</h3>
                <p className="text-neutral-600">Best price in the market</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Collections</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Explore our carefully curated collections of premium furniture, designed to elevate your living space
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              to="/products?category=chairs"
              className="group relative overflow-hidden rounded-xl aspect-[4/3]"
            >
              <img
                src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
                alt="Chairs collection"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <div>
                  <div className="flex items-center gap-2 text-white mb-2">
                    <Armchair className="h-6 w-6" />
                    <h3 className="text-2xl font-bold">Chairs</h3>
                  </div>
                  <p className="text-white/80">Discover our ergonomic chair collection</p>
                </div>
              </div>
            </Link>
            <Link
              to="/products?category=sofas"
              className="group relative overflow-hidden rounded-xl aspect-[4/3]"
            >
              <img
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04"
                alt="Sofas collection"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <div>
                  <div className="flex items-center gap-2 text-white mb-2">
                    <Sofa className="h-6 w-6" />
                    <h3 className="text-2xl font-bold">Sofas</h3>
                  </div>
                  <p className="text-white/80">Explore our luxurious sofa designs</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
              <p className="text-neutral-600 leading-relaxed">
                For over two decades, we've been crafting furniture that combines timeless design with unparalleled comfort. 
                Every piece tells a story of craftsmanship, quality, and attention to detail.
              </p>
              <div className="space-y-4">
                <div className="flex gap-2 items-center">
                  <Star className="h-5 w-5 text-primary" />
                  <span className="text-neutral-800">Premium materials sourced globally</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Star className="h-5 w-5 text-primary" />
                  <span className="text-neutral-800">Expert craftsmanship</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Star className="h-5 w-5 text-primary" />
                  <span className="text-neutral-800">Lifetime warranty</span>
                </div>
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
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04"
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
