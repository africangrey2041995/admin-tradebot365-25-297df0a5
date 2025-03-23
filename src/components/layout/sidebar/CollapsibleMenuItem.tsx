
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { SidebarMenuItem } from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SubItem {
  href: string;
  label: string;
}

interface CollapsibleMenuItemProps {
  icon: React.ReactNode;
  label: string;
  items: SubItem[];
}

const CollapsibleMenuItem: React.FC<CollapsibleMenuItemProps> = ({ 
  icon, 
  label, 
  items
}) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  // Check if any sub-item is active
  const isActive = items.some(item => 
    location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)
  );
  
  // Function to check if a specific sub-item is active
  const isActiveSubItem = (path: string) => 
    location.pathname === path || location.pathname.startsWith(`${path}/`);
  
  return (
    <SidebarMenuItem className="flex flex-col mb-0">
      {/* Main item button */}
      <div 
        className={`
          flex items-center py-2 px-3 text-sm rounded-md w-full mb-0 cursor-pointer
          ${isActive
            ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
            : 'text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-hover-foreground'
          }
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon}
        <span className="ml-2">{label}</span>
        <ChevronDown 
          className={`ml-auto h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </div>
      
      {/* Collapsible sub-items */}
      <Collapsible 
        open={isOpen} 
        onOpenChange={setIsOpen}
        className="w-full"
      >
        <CollapsibleContent className="pt-0.5">
          {items.map((item) => (
            <Link 
              key={item.href} 
              to={item.href}
              className={`
                flex items-center py-1.5 px-6 text-sm rounded-md ml-4
                ${isActiveSubItem(item.href) 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                  : 'text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-hover-foreground'
                }
              `}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
};

export default CollapsibleMenuItem;
