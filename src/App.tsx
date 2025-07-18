import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';
import PublicRoute from './components/auth/PublicRoute';
import AuthLayout from './components/layout/AuthLayout';
import AdminLayout from './components/layout/AdminLayout';
import UserRoute from './components/auth/UserRoute';

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Blogs from './pages/public/Blogs';

// User Pages
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Activities from './pages/Activities';
import History from './pages/History';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminEducation from './pages/admin/Education';
import AdminUsers from './pages/admin/Users';
import AdminActivities from './pages/admin/Activities';
import BlogDetail from './pages/BlogDetail';
import Social from './pages/Social';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:category/:slug" element={<BlogDetail />} />

          {/* Auth Routes */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

          {/* Protected User Routes */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <AuthLayout>
                <Dashboard />
              </AuthLayout>
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <AuthLayout>
                <Profile />
              </AuthLayout>
            </PrivateRoute>
          } />
          <Route path="/activities" element={
            <PrivateRoute>
              <AuthLayout>
                <Activities />
              </AuthLayout>
            </PrivateRoute>
          } />

          {/* Add Historical Data Route */}
          <Route path="/history" element={
            <PrivateRoute>
              <AuthLayout>
                <History />
              </AuthLayout>
            </PrivateRoute>
          } />
          
          <Route path="/social" element={
            <UserRoute>
              <AuthLayout>
                <Social />
              </AuthLayout>
            </UserRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </AdminRoute>
          } />
          <Route path="/admin/education" element={
            <AdminRoute>
              <AdminLayout>
                <AdminEducation />
              </AdminLayout>
            </AdminRoute>
          } />
          <Route path="/admin/users" element={
            <AdminRoute>
              <AdminLayout>
                <AdminUsers />
              </AdminLayout>
            </AdminRoute>
          } />
          <Route path="/admin/activities" element={
            <AdminRoute>
              <AdminLayout>
                <AdminActivities />
              </AdminLayout>
            </AdminRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}