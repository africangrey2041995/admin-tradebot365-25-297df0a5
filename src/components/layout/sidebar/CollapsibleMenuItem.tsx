
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon, ChevronDown } from 'lucide-react';
import { SidebarMenuItem } from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SubItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

interface CollapsibleMenuItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
  isActive: boolean;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  subItems: SubItem[];
  isActiveSubItem: (path: string) => boolean;
}

const CollapsibleMenuItem = ({ 
  icon: Icon, 
  label, 
  path, 
  isActive, 
  isOpen, 
  setOpen,
  subItems,
  isActiveSubItem
}: CollapsibleMenuItemProps) => {
  return (
    <SidebarMenuItem className="flex flex-col mb-0">
      {/* Main item link */}
      <Link 
        to={path}
        className={`
          flex items-center py-2 px-3 text-sm rounded-md w-full mb-0
          ${isActive && !isOpen
            ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
            : 'text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-hover-foreground'
          }
        `}
      >
        <Icon className="h-4 w-4 mr-2" />
        <span>{label}</span>
      </Link>
      
      {/* Collapsible sub-items */}
      <Collapsible 
        open={isOpen} 
        onOpenChange={setOpen}
        className="w-full"
      >
        <CollapsibleTrigger asChild>
          <button
            className={`
              flex items-center justify-end py-0.5 px-3 text-sm rounded-md w-full
              text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-hover-foreground
            `}
          >
            <ChevronDown 
              className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" 
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-0.5">
          {subItems.map((subItem) => (
            <Link 
              key={subItem.path} 
              to={subItem.path}
              className={`
                flex items-center py-1.5 px-6 text-sm rounded-md ml-4
                ${isActiveSubItem(subItem.path) 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                  : 'text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-hover-foreground'
                }
              `}
            >
              <subItem.icon className="h-3.5 w-3.5 mr-2" />
              <span>{subItem.label}</span>
            </Link>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
};

export default CollapsibleMenuItem;
