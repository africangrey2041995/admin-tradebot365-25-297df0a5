
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface NavGroupProps {
  title?: string;
  children: ReactNode;
}

const NavGroup: React.FC<NavGroupProps> = ({ title, children }) => {
  return (
    <div className="mb-6">
      {title && (
        <h2 className="px-3 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          {title}
        </h2>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};

export default NavGroup;
