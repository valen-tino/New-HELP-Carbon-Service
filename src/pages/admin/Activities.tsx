import React from 'react';
import ActivityStats from '../../components/admin/activities/ActivityStats';
import ActivityLog from '../../components/admin/activities/ActivityLog';

const AdminActivities = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Activity Monitoring</h1>
      
      <ActivityStats />
      <ActivityLog />
    </div>
  );
};

export default AdminActivities;