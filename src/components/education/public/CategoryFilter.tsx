import React from 'react';
import { categories } from '../../../data/courseCategories';

interface Props {
  selected: string;
  onChange: (category: string) => void;
}

const CategoryFilter: React.FC<Props> = ({ selected, onChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button
        onClick={() => onChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
          selected === 'all'
            ? 'bg-green-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        All Courses
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
            selected === category.id
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;