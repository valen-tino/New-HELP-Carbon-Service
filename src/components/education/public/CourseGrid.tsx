import React from 'react';
import CourseCard from './CourseCard';
import { Course } from '../../../types/education';

interface Props {
  courses: Course[];
}

const CourseGrid: React.FC<Props> = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseGrid;