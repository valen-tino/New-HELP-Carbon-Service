import React from 'react';
import { Filter } from 'lucide-react';

interface Props {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const ResourceFilter: React.FC<Props> = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
      <Filter className="h-5 w-5 text-green-600" />
      <div className="flex gap-2 overflow-x-auto">
        {['All', ...categories].map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResourceFilter;