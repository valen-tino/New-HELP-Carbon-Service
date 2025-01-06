import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, LayoutDashboard, Activity, BookOpen, Users, UserCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center">
                <Leaf className="h-8 w-8 text-green-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">HELP CarbonFootPrint System</span>
              </Link>
              
              <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                <NavLink to="/dashboard" isActive={isActive('/dashboard')}>
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </NavLink>
                
                <NavLink to="/activities" isActive={isActive('/activities')}>
                  <Activity className="h-5 w-5" />
                  <span>Activities</span>
                </NavLink>
                
                <NavLink to="/community" isActive={isActive('/community')}>
                  <Users className="h-5 w-5" />
                  <span>Community</span>
                </NavLink>
              </div>
            </div>

            <div className="flex items-center">
              <Link
                to="/profile"
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/profile')
                    ? 'text-green-600'
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                <UserCircle className="h-5 w-5" />
                <span>Profile</span>
              </Link>
              
              <button
                onClick={logout}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

const NavLink = ({ to, isActive, children }: { to: string; isActive: boolean; children: React.ReactNode }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
      isActive
        ? 'text-green-600'
        : 'text-gray-700 hover:text-green-600'
    }`}
  >
    {children}
  </Link>
);

export default AuthLayout;