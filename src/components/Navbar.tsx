import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, User, Activity, BookOpen } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="text-white bg-green-600 shadow-lg">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
<<<<<<< HEAD
            <Leaf className="h-6 w-6" />
            <span className="font-bold text-xl">HELP CarbonFootPrint System</span>
=======
            <Leaf className="w-6 h-6" />
            <span className="text-xl font-bold">HELP CarbonFootPrint</span>
>>>>>>> 2ef4b5ef23b65b9b7fa9994efbf5a0cab29eaa1d
          </Link>
          
          <div className="flex space-x-4">
            <Link to="/" className="flex items-center space-x-1 hover:text-green-200">
              <Activity className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link to="/activities" className="flex items-center space-x-1 hover:text-green-200">
              <Activity className="w-5 h-5" />
              <span>Activities</span>
            </Link>
            {/* <Link to="/education" className="flex items-center space-x-1 hover:text-green-200">
              <BookOpen className="w-5 h-5" />
              <span>Education</span>
            </Link> */}
            <Link to="/profile" className="flex items-center space-x-1 hover:text-green-200">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;