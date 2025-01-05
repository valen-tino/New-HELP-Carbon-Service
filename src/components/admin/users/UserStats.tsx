import React from 'react';
import { Users, UserPlus, UserCheck } from 'lucide-react';

const UserStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 bg-opacity-75">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-5">
            <p className="text-gray-500 text-sm">Total Users</p>
            <p className="text-2xl font-semibold text-gray-900">245</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 bg-opacity-75">
            <UserPlus className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-5">
            <p className="text-gray-500 text-sm">New Users (This Month)</p>
            <p className="text-2xl font-semibold text-gray-900">12</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-purple-100 bg-opacity-75">
            <UserCheck className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-5">
            <p className="text-gray-500 text-sm">Active Users</p>
            <p className="text-2xl font-semibold text-gray-900">180</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;