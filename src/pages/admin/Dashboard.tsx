import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Users, Activity } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/education" 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <Book className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Educational Content</h3>
              <p className="text-gray-600">Manage courses and resources</p>
            </div>
          </div>
        </Link>

        <Link to="/admin/users" 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <Users className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">User Management</h3>
              <p className="text-gray-600">View and manage users</p>
            </div>
          </div>
        </Link>

        {/* <Link to="/admin/activities" 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <Activity className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Activity Logs</h3>
              <p className="text-gray-600">Monitor user activities</p>
            </div>
          </div>
        </Link> */}
      </div>
    </div>
  );
};

export default AdminDashboard;