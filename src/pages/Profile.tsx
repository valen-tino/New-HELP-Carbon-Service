import React from 'react';
import UserInfo from '../components/profile/UserInfo';
import PreferencesForm from '../components/profile/PreferencesForm';
import EmissionGoals from '../components/profile/EmissionGoals';

const Profile = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Profile Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserInfo />
        <PreferencesForm />
      </div>
      
      <EmissionGoals />
    </div>
  );
};

export default Profile;