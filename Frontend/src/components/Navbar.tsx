import { useState } from 'react';
import { Menu, X, ShoppingCart, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleBrochureDownload = () => {
    // Add your brochure download logic here
    const brochureUrl = '/brochure.pdf'; // Update with your actual brochure URL
    window.open(brochureUrl, '_blank');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-semibold text-neutral-900 dark:text-white hover:text-primary dark:hover:text-primary-light transition-colors">
              <img src="https://heemanfurniture.in/wp-content/uploads/2024/09/logo--e1726653863171.png" alt="Logo" width={"180px"}/>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white px-3 py-2 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white px-3 py-2 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white px-3 py-2 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white px-3 py-2 transition-colors"
            >
              Contact
            </Link>
            <a
              href='https://heemanfurniture.in/wp-content/uploads/2024/09/Heeman-Furniture.pdf'
              target='blank'
              className="flex items-center gap-2 text-primary dark:text-primary-light hover:text-primary/80 dark:hover:text-primary-light/80 px-3 py-2 transition-colors"
            >
              <FileText className="h-4 w-4" />
              Brochure
            </a>
          </div>

          {/* Cart and Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
            <Link
              to="/"
              className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white block px-3 py-2 transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white block px-3 py-2 transition-colors"
              onClick={toggleMenu}
            >
              Products
            </Link>
            <Link
              to="/about"
              className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white block px-3 py-2 transition-colors"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white block px-3 py-2 transition-colors"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <button
              onClick={handleBrochureDownload}
              className="flex items-center gap-2 text-primary dark:text-primary-light hover:text-primary/80 dark:hover:text-primary-light/80 w-full px-3 py-2 transition-colors"
            >
              <FileText className="h-4 w-4" />
              Brochure
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;