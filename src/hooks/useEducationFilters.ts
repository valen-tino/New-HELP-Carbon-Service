import { useState, useMemo } from 'react';
import { courses } from '../data/courses';
import { Course } from '../types/education';

interface Filters {
  search: string;
  category: string;
}

export const useEducationFilters = () => {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: 'all'
  });

  const filteredCourses = useMemo(() => {
    return courses.filter((course: Course) => {
      const matchesSearch = course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        course.description.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesCategory = filters.category === 'all' || course.category === filters.category;

      return matchesSearch && matchesCategory;
    });
  }, [filters]);

  return { filters, setFilters, filteredCourses };
};