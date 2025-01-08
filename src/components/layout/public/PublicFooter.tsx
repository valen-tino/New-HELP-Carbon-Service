import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Github, Twitter, Linkedin } from 'lucide-react';

const PublicFooter = () => {
  return (
    <footer className="bg-white border-t">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">HCS</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Track and reduce your carbon footprint for a sustainable future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/" className="text-base text-gray-600 hover:text-green-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-base text-gray-600 hover:text-green-600">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Account</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/login" className="text-base text-gray-600 hover:text-green-600">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-base text-gray-600 hover:text-green-600">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Follow Us</h3>
            <div className="flex mt-4 space-x-6">
              <a href="#" className="text-gray-400 hover:text-green-600">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-600">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-600">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-200">
          <p className="text-base text-center text-gray-400">
            © {new Date().getFullYear()} HELP CarbonFootPrint System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;