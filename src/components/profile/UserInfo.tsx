import React from 'react';
import { User, Mail, AtSign, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const UserInfo = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-700">Personal Information</h2>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-green-600" />
          <div>
            <label className="block text-sm text-gray-500">Full Name</label>
            <span className="text-gray-800">{user.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-green-600" />
          <div>
            <label className="block text-sm text-gray-500">Email</label>
            <span className="text-gray-800">{user.email}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AtSign className="w-5 h-5 text-green-600" />
          <div>
            <label className="block text-sm text-gray-500">Username</label>
            <span className="text-gray-800">{user.username}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-green-600" />
          <div>
            <label className="block text-sm text-gray-500">Reminder Frequency</label>
            <span className="text-gray-800 capitalize">{user.reminderFrequency}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;