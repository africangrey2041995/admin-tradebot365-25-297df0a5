
import React from 'react';
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu } from '@/components/ui/sidebar';

interface NavGroupProps {
  label: string;
  children: React.ReactNode;
  noSpacing?: boolean;
}

const NavGroup = ({ label, children, noSpacing = false }: NavGroupProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className={noSpacing ? "flex flex-col space-y-0" : ""}>
          {children}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavGroup;
