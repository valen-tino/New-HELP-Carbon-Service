import React from 'react';
import { User, Mail, AtSign } from 'lucide-react';

const UserInfo = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-green-600" />
          <div>
            <label className="block text-sm text-gray-500">Full Name</label>
            <span className="text-gray-800">John Doe</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-green-600" />
          <div>
            <label className="block text-sm text-gray-500">Email</label>
            <span className="text-gray-800">john.doe@example.com</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AtSign className="h-5 w-5 text-green-600" />
          <div>
            <label className="block text-sm text-gray-500">Username</label>
            <span className="text-gray-800">johndoe</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;