import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 dark:text-white">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">Oops! Page not found</p>
        <a 
          href="/" 
          className="text-primary hover:text-primary/80 underline dark:text-primary-light dark:hover:text-primary-light/80 transition-colors duration-300"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
