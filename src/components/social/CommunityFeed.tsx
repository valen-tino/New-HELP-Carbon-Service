import React from 'react';
import { Users } from 'lucide-react';

interface FeedItem {
  id: string;
  userId: string;
  username: string;
  action: string;
  reduction: number;
  timestamp: string;
}

interface Props {
  items: FeedItem[];
}

const CommunityFeed: React.FC<Props> = ({ items }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-5 w-5 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-800">Community Activity</h2>
      </div>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="border-b border-gray-100 pb-4 last:border-0">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-medium text-gray-800">{item.username}</span>
                <span className="text-gray-600"> {item.action}</span>
              </div>
              <span className="text-sm text-green-600">-{item.reduction} kg CO2e</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(item.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;