
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

interface NavMenuItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
  isActive: boolean;
}

const NavMenuItem = ({ icon: Icon, label, path, isActive }: NavMenuItemProps) => {
  return (
    <SidebarMenuItem key={path}>
      <SidebarMenuButton 
        asChild 
        isActive={isActive}
        tooltip={label}
      >
        <Link to={path}>
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default NavMenuItem;
