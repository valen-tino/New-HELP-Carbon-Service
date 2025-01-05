import React from 'react';
import PublicNavbar from './PublicNavbar';
import PublicFooter from './PublicFooter';

interface Props {
  children: React.ReactNode;
}

const PublicLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />
      <main className="flex-grow">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;