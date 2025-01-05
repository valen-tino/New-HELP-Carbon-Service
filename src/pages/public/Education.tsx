import React from 'react';
import PublicNavbar from '../../components/layout/PublicNavbar';
import CourseGrid from '../../components/education/public/CourseGrid';
import SearchBar from '../../components/education/public/SearchBar';
import CategoryFilter from '../../components/education/public/CategoryFilter';
import { useEducationFilters } from '../../hooks/useEducationFilters';

const PublicEducation = () => {
  const { filters, setFilters, filteredCourses } = useEducationFilters();

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Explore Our Courses</h1>
            <p className="mt-2 text-lg text-gray-600">
              Discover courses to help you understand and reduce your environmental impact
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar value={filters.search} onChange={(search) => setFilters({ ...filters, search })} />
            <CategoryFilter
              selected={filters.category}
              onChange={(category) => setFilters({ ...filters, category })}
            />
          </div>

          <CourseGrid courses={filteredCourses} />
        </div>
      </main>
    </div>
  );
};

export default PublicEducation;