import React from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <h1 className="text-6xl font-bold text-pakblue mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">The page you are looking for does not exist.</h2>
      <p className="text-gray-600 mb-10 max-w-md">
        We're sorry, but the page you requested could not be found. 
        It might have been moved, deleted, or the URL might be incorrect.
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-6 py-3 bg-pakblue text-white font-semibold rounded-2xl shadow-md hover:bg-pakdarkblue transition-colors duration-200"
      >
        <HomeIcon className="mr-2 h-5 w-5" />
        Home
      </Link>
    </div>
  );
};

export default NotFound;
