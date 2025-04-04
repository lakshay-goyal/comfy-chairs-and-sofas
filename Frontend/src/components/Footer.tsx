import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 dark:bg-neutral-950 text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Comfy</h3>
            <p className="text-neutral-400 dark:text-neutral-500">
              Crafting comfort and style for your home, one piece at a time.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-400 dark:text-neutral-500 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-neutral-400 dark:text-neutral-500 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-400 dark:text-neutral-500 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 dark:text-neutral-500 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-neutral-400 dark:text-neutral-500">
              <li>123 Furniture Street</li>
              <li>Los Angeles, CA 90012</li>
              <li>contact@comfy.com</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4 text-white">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 dark:text-neutral-500 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-neutral-400 dark:text-neutral-500 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-neutral-400 dark:text-neutral-500 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 dark:border-neutral-900 text-neutral-400 dark:text-neutral-500 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Comfy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
