
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { 
  Home, 
  CircuitBoard, 
  Users, 
  Sparkles, 
  Settings, 
  BarChart3,
} from 'lucide-react';

const SidebarNav = () => {
  const location = useLocation();
  
  // Main navigation items
  const mainNavItems = [
    { icon: Home, label: 'Bảng Điều Khiển', path: '/' },
    { icon: CircuitBoard, label: 'Quản Lý Bot', path: '/bots' },
    { icon: Users, label: 'Quản Lý Tài Khoản', path: '/accounts' },
  ];
  
  // Premium features navigation items
  const premiumItems = [
    { icon: Sparkles, label: 'Premium Bots', path: '/premium-bots' },
  ];
  
  // Check if a path is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <img 
          src="/lovable-uploads/68a402c1-5eae-4c56-a88f-7135d455c4f9.png" 
          alt="Trade Bot 365" 
          className="h-12 w-auto mx-auto my-4" 
        />
        
        <SidebarGroup>
          <SidebarGroupLabel>Tổng Quan</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.path)}
                    tooltip={item.label}
                  >
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Premium</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {premiumItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.path)}
                    tooltip={item.label}
                  >
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarNav;
