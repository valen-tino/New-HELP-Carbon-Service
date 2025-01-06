import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface Props {
  to: string;
  icon: LucideIcon;
  isActive: boolean;
  children: React.ReactNode;
}

const AdminNavLink: React.FC<Props> = ({ to, icon: Icon, isActive, children }) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
        isActive
          ? 'text-green-600 bg-green-50'
          : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </Link>
  );
};

export default AdminNavLink;