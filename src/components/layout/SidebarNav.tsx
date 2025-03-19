
import React, { useState } from 'react';
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
  SidebarSeparator,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { 
  Home, 
  CircuitBoard, 
  Users, 
  Sparkles,
  Layers,
  TrendingUp,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
                <SidebarMenuItem key={item.path} className="flex flex-col">
                  {/* Main item link */}
                  <Link 
                    to={item.path}
                    className={`
                      flex items-center py-2 px-3 text-sm rounded-md w-full mb-1
                      ${isActive(item.path) && !item.isOpen
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                        : 'text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-hover-foreground'
                      }
                    `}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    <span>{item.label}</span>
                  </Link>
                  
                  {/* Collapsible sub-items */}
                  <Collapsible 
                    open={item.isOpen} 
                    onOpenChange={item.setOpen}
                    className="w-full"
                  >
                    <CollapsibleTrigger asChild>
                      <button
                        className={`
                          flex items-center justify-end py-1 px-3 text-sm rounded-md w-full
                          text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-hover-foreground
                        `}
                      >
                        <ChevronDown 
                          className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" 
                        />
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-1">
                      {item.subItems.map((subItem) => (
                        <Link 
                          key={subItem.path} 
                          to={subItem.path}
                          className={`
                            flex items-center py-1.5 px-6 text-sm rounded-md ml-4
                            ${isActive(subItem.path) 
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
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarNav;
