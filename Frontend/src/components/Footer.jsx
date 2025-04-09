import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" }
  ];

  const socialLinks = [
    { icon: Facebook, url: "https://www.instagram.com/heemanfurniture/" },
    { icon: Instagram, url: "https://www.instagram.com/heemanfurniture/" },
    { icon: Twitter, url: "https://www.instagram.com/heemanfurniture/" }
  ];

  return (
    <footer className="bg-neutral-900 dark:bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Comfy</h3>
            <p className="text-neutral-400 dark:text-neutral-500">
              Crafting comfort and style for your home, one piece at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-neutral-400 dark:text-neutral-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium mb-4">Contact</h4>
            <address className="not-italic space-y-2 text-neutral-400 dark:text-neutral-500">
              <p>Basement Area, SunSquare Shopping Plaza, SPL-1/J, RIICO Chowk, Bhiwadi, Alwar, Rajasthan-301019</p>
              <p>
                <a href="mailto:himanshugoyal408@gmail.com" className="hover:text-white transition-colors">
                  himanshugoyal408@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:+918107259495" className="hover:text-white transition-colors">
                  (+91) 8107259495 
                </a>
              </p>
            </address>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  className="text-neutral-400 dark:text-neutral-500 hover:text-white transition-colors"
                  aria-label={`${social.icon.name} social link`}
                  target='_blank'
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-800 dark:border-neutral-900 text-neutral-400 dark:text-neutral-500 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Comfy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;