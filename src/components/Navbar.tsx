import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, User, Activity, BookOpen } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6" />
            <span className="font-bold text-xl">HELP CarbonFootPrint</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link to="/" className="flex items-center space-x-1 hover:text-green-200">
              <Activity className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link to="/activities" className="flex items-center space-x-1 hover:text-green-200">
              <Activity className="h-5 w-5" />
              <span>Activities</span>
            </Link>
            <Link to="/education" className="flex items-center space-x-1 hover:text-green-200">
              <BookOpen className="h-5 w-5" />
              <span>Education</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-1 hover:text-green-200">
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;