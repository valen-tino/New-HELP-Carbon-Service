'use client';

import { Card } from '@/components/ui/card';
import { ProfileForm } from '@/app/components/profile/ProfileForm';
import { ActivityLog } from '../components/profile/ActivityLog';
import { useState, useEffect } from 'react';
import { useSession } from '@/hooks/use-session';

export default function ProfilePage(){
  const { user } = useSession();
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>

      <Card className="p-6">
        <ProfileForm />
      </Card>

      <h1 className="text-3xl font-bold mb-6 mt-6">Activity Log</h1>
      <Card className="p-6">
        <ActivityLog />
      </Card>
    </div>
  );
}