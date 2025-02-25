
import { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-semibold text-neutral-900">
              Comfy
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="text-neutral-600 hover:text-neutral-900 px-3 py-2 transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-neutral-600 hover:text-neutral-900 px-3 py-2 transition-colors">
                Products
              </Link>
              <Link to="/about" className="text-neutral-600 hover:text-neutral-900 px-3 py-2 transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-neutral-600 hover:text-neutral-900 px-3 py-2 transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="text-neutral-600 hover:text-neutral-900 transition-colors">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-neutral-200">
            <Link
              to="/"
              className="text-neutral-600 hover:text-neutral-900 block px-3 py-2 transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-neutral-600 hover:text-neutral-900 block px-3 py-2 transition-colors"
              onClick={toggleMenu}
            >
              Products
            </Link>
            <Link
              to="/about"
              className="text-neutral-600 hover:text-neutral-900 block px-3 py-2 transition-colors"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-neutral-600 hover:text-neutral-900 block px-3 py-2 transition-colors"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
