import React from 'react';
import UserList from '../../components/admin/users/UserList';
import UserStats from '../../components/admin/users/UserStats';

const AdminUsers = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
      
      <UserStats />
      <UserList />
    </div>
  );
};

export default AdminUsers;