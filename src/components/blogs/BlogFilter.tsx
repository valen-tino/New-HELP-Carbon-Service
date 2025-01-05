import React from 'react';
import { Filter } from 'lucide-react';

interface Props {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const BlogFilter: React.FC<Props> = ({ selectedType, onTypeChange }) => {
  const types = ['all', 'article', 'video', 'infographic'];

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
      <Filter className="w-5 h-5 text-green-600" />
      <div className="flex gap-2 overflow-x-auto">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              selectedType === type
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogFilter;