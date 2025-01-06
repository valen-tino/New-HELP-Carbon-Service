import React, { useState, useEffect } from 'react';
import { updateUser, getCurrentUser } from '../../services/authService';
import { User as UserIcon, Mail, AtSign } from 'lucide-react';
import { User, UpdateData } from '../../types/auth';

const UserInfo = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editData, setEditData] = useState<UpdateData>({ name: '', email: '', username: ''});
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if(currentUser){
          setUser(currentUser);
          setEditData({
            name: currentUser.name,
            email: currentUser.email,
            username: currentUser.username
          });
        }
        setIsLoading(false);
      } catch(error: any){
        setError('Failed to fetch user data');
        setIsLoading(false);
      }
    }
  }, []);

  const handleEditToggle = () => {
    setIsEditing(true);
  }

  const handleUpdateUser = async () => {
    if(!isEditing){
      return;
    }
    setError(null);

    try {
      const updatedUser = await updateUser(editData);
      setUser(updatedUser);
      setIsEditing(false);
    } catch(error: any){
      setError(error.message || 'Failed to update the user profile.');
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>No user data available.</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h2>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <UserIcon className="h-5 w-5 text-green-600" />
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