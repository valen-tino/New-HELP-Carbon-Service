import React from 'react';
import { PlusCircle } from 'lucide-react';
import CourseList from '../../components/admin/education/CourseList';

const AdminEducation = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Educational Content</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <PlusCircle className="h-5 w-5" />
          Add Course
        </button>
      </div>
      
      <CourseList />
    </div>
  );
};

export default AdminEducation;