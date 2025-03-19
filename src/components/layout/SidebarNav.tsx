
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { 
  Home, 
  CircuitBoard, 
  Users, 
  Sparkles,
  Layers,
  TrendingUp,
} from 'lucide-react';
import NavGroup from './sidebar/NavGroup';
import NavMenuItem from './sidebar/NavMenuItem';
import CollapsibleMenuItem from './sidebar/CollapsibleMenuItem';

const SidebarNav = () => {
  const location = useLocation();
  
  // Main navigation items
  const mainNavItems = [
    { icon: Home, label: 'Bảng Điều Khiển', path: '/' },
    { icon: CircuitBoard, label: 'Quản Lý Bot', path: '/bots' },
    { icon: Users, label: 'Quản Lý Tài Khoản', path: '/accounts' },
  ];
  
  // State for collapsible sections
  const [premiumOpen, setPremiumOpen] = useState(false);
  const [propTradingOpen, setPropTradingOpen] = useState(false);
  
  // Premium features navigation items
  const premiumItems = [
    { 
      icon: Sparkles, 
      label: 'Premium Bots', 
      path: '/premium-bots',
      isCollapsible: true,
      isOpen: premiumOpen,
      setOpen: setPremiumOpen,
      subItems: [
        { 
          icon: Layers,
          label: 'Đã Tích Hợp', 
          path: '/integrated-premium-bots' 
        }
      ]
    },
    { 
      icon: TrendingUp, 
      label: 'Prop Trading Bots', 
      path: '/prop-trading-bots',
      isCollapsible: true,
      isOpen: propTradingOpen,
      setOpen: setPropTradingOpen,
      subItems: [
        { 
          icon: Layers,
          label: 'Đã Tích Hợp', 
          path: '/integrated-prop-bots' 
        }
      ]
    },
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
          className="h-16 w-auto mx-auto my-4" 
        />
        
        <SidebarSeparator />
        
        <NavGroup label="Tổng Quan">
          {mainNavItems.map((item) => (
            <NavMenuItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={isActive(item.path)}
            />
          ))}
        </NavGroup>

        <NavGroup label="Premium" noSpacing={true}>
          {premiumItems.map((item) => (
            <CollapsibleMenuItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={isActive(item.path)}
              isOpen={item.isOpen}
              setOpen={item.setOpen}
              subItems={item.subItems}
              isActiveSubItem={isActive}
            />
          ))}
        </NavGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarNav;
