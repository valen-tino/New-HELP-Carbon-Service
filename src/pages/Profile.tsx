import React from 'react';
import UserInfo from '../components/profile/UserInfo';
import ProfileForm from '../components/profile/ProfileForm';
import { User } from 'lucide-react';

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <User className="w-8 h-8 text-green-600" />
        <h1 className="text-3xl font-bold text-gray-800">Profile Settings</h1>
      </div>
      
      <UserInfo />
      <ProfileForm />
    </div>
  );
};

export default Profile;