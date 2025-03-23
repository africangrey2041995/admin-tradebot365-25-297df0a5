
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

interface NavMenuItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const NavMenuItem: React.FC<NavMenuItemProps> = ({ icon, label, href }) => {
  const location = useLocation();
  const isActive = location.pathname === href || location.pathname.startsWith(`${href}/`);
  
  return (
    <SidebarMenuItem key={href}>
      <SidebarMenuButton 
        asChild 
        isActive={isActive}
        tooltip={label}
      >
        <Link to={href}>
          {icon}
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default NavMenuItem;
