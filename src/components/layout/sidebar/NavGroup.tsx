
import React from 'react';
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu } from '@/components/ui/sidebar';

interface NavGroupProps {
  title: string;
  children: React.ReactNode;
  noSpacing?: boolean;
}

const NavGroup: React.FC<NavGroupProps> = ({ title, children, noSpacing = false }) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className={noSpacing ? "flex flex-col space-y-0" : ""}>
          {children}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavGroup;
