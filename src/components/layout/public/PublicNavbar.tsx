import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const PublicNavbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">HELP CarbonFootPrint System</span>
            </Link>
            
            <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
              <NavLink to="/" isActive={isActive('/')}>
                Home
              </NavLink>
              <NavLink to="/blogs" isActive={isActive('/blogs')}>
                Blogs
              </NavLink>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className={`text-sm font-medium ${
                isActive('/login')
                  ? 'text-green-600'
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, isActive, children }: { to: string; isActive: boolean; children: React.ReactNode }) => (
  <Link
    to={to}
    className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
      isActive
        ? 'border-green-500 text-gray-900'
        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
    }`}
  >
    {children}
  </Link>
);

export default PublicNavbar;