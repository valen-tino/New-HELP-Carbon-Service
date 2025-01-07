import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, LayoutDashboard, Activity, BookOpen, Users, UserCircle, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  // Only show social link for users, not admins
  const showSocial = user?.role === 'user';

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center">
                <Leaf className="w-8 h-8 text-green-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">HCS</span>
              </Link>
              
              <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                <NavLink to="/dashboard" isActive={isActive('/dashboard')}>
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Dashboard</span>
                </NavLink>
                
                <NavLink to="/activities" isActive={isActive('/activities')}>
                  <Activity className="w-5 h-5" />
                  <span>Activities</span>
                </NavLink>
                
                {/* <NavLink to="/education" isActive={isActive('/education')}>
                  <BookOpen className="w-5 h-5" />
                  <span>Education</span>
                </NavLink> */}
                
                {showSocial && (
                  <NavLink to="/social" isActive={isActive('/social')}>
                    <MessageSquare className="w-5 h-5" />
                    <span>Social</span>
                  </NavLink>
                )}
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
                <UserCircle className="w-5 h-5" />
                <span>Profile</span>
              </Link>
              
              <button
                onClick={logout}
                className="px-4 py-2 ml-4 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
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