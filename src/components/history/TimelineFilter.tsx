import React from 'react';
import { Calendar } from 'lucide-react';

interface Props {
  period: 'week' | 'month' | 'year';
  onChange: (period: 'week' | 'month' | 'year') => void;
}

const TimelineFilter: React.FC<Props> = ({ period, onChange }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
      <Calendar className="h-5 w-5 text-green-600" />
      <div className="flex gap-2">
        {['week', 'month', 'year'].map((p) => (
          <button
            key={p}
            onClick={() => onChange(p as 'week' | 'month' | 'year')}
            className={`px-4 py-2 rounded-md ${
              period === p
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimelineFilter;