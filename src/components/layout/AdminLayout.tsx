import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, LayoutDashboard, Book, Users, Activity, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AdminNavLink from './admin/AdminNavLink';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/admin" className="flex items-center">
                <Leaf className="h-8 w-8 text-green-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Admin Panel</span>
              </Link>
              
              <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                <AdminNavLink 
                  to="/admin"
                  icon={LayoutDashboard}
                  isActive={location.pathname === '/admin'}
                >
                  Dashboard
                </AdminNavLink>
                
                <AdminNavLink 
                  to="/admin/education"
                  icon={Book}
                  isActive={location.pathname === '/admin/education'}
                >
                  Education
                </AdminNavLink>
                
                <AdminNavLink 
                  to="/admin/users"
                  icon={Users}
                  isActive={location.pathname === '/admin/users'}
                >
                  Users
                </AdminNavLink>
                
                {/* <AdminNavLink 
                  to="/admin/activities"
                  icon={Activity}
                  isActive={location.pathname === '/admin/activities'}
                >
                  Activities
                </AdminNavLink> */}
              </div>
            </div>

            <div className="flex items-center">
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"
              >
                <LogOut className="h-5 w-5" />
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

export default AdminLayout;