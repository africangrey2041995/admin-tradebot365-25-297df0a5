
import React, { useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface CollapsibleMenuItemProps {
  icon?: React.ReactNode;
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

const CollapsibleMenuItem: React.FC<CollapsibleMenuItemProps> = ({
  icon,
  title,
  defaultOpen = false,
  children
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="mb-1">
      <button
        onClick={toggleOpen}
        className={cn(
          "flex items-center w-full px-3 py-2 text-sm font-medium rounded-md",
          "hover:bg-zinc-800 hover:text-white transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-zinc-700",
          isOpen ? "bg-zinc-800 text-white" : "text-zinc-400"
        )}
      >
        {icon && <span className="mr-2">{icon}</span>}
        <span className="flex-1 text-left">{title}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "transform rotate-180")} />
      </button>
      
      {isOpen && (
        <div className="mt-1 ml-6 pl-2 border-l border-zinc-700">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleMenuItem;
