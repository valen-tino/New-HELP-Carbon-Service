import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const PublicNavbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">HCS</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/explore"
              className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-green-600"
            >
              Explore
            </Link>
            <Link
              to="/login"
              className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-green-600"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;