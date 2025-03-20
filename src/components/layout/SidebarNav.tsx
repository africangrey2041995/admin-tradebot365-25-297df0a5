
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
  TrendingUp,
  ChevronDown,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import TradeBotLogo from '@/components/common/TradeBotLogo';
import { useIsMobile } from '@/hooks/use-mobile';

const SidebarNav = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // State for collapsible sections
  const [premiumOpen, setPremiumOpen] = useState(false);
  const [propTradingOpen, setPropTradingOpen] = useState(false);
  
  // Check if a path is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="border-r-0">
      <SidebarContent className="bg-[#111111] text-white h-full">
        {/* Logo - Using our new component with better contrast and positioning */}
        <div className={cn(
          "flex justify-center items-center bg-[#111111]",
          isMobile ? "py-4" : "py-6 px-4"
        )}>
          <TradeBotLogo 
            size={isMobile ? "medium" : "large"} 
            className="mx-auto"
            showBetaTag={true}
          />
        </div>
        
        <SidebarSeparator className="bg-zinc-800" />
        
        {/* Main Navigation */}
        <div className="mt-4">
          <div className="px-4 mb-2">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Tổng Quan
            </span>
          </div>
          
          <div className="space-y-1 px-2">
            <NavItem 
              path="/" 
              label="Bảng Điều Khiển" 
              icon={Home} 
              isActive={isActive('/')} 
            />
            <NavItem 
              path="/bots" 
              label="Quản Lý Bot" 
              icon={CircuitBoard} 
              isActive={isActive('/bots')} 
            />
            <NavItem 
              path="/accounts" 
              label="Quản Lý Tài Khoản" 
              icon={Users} 
              isActive={isActive('/accounts')} 
            />
          </div>
        </div>
        
        {/* Premium Section */}
        <div className="mt-6">
          <div className="px-4 mb-2">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Premium
            </span>
          </div>
          
          <div className="space-y-1 px-2">
            <CollapsibleNavItem
              path="/premium-bots"
              label="Bot Premium"
              icon={Sparkles}
              isActive={isActive('/premium-bots')}
              isOpen={premiumOpen}
              onToggle={() => setPremiumOpen(!premiumOpen)}
              subItems={[
                { 
                  path: "/integrated-premium-bots", 
                  label: "Đã Tích Hợp" 
                }
              ]}
              currentPath={location.pathname}
            />
            
            <CollapsibleNavItem
              path="/prop-trading-bots"
              label="Bot Prop Trading"
              icon={TrendingUp}
              isActive={isActive('/prop-trading-bots')}
              isOpen={propTradingOpen}
              onToggle={() => setPropTradingOpen(!propTradingOpen)}
              subItems={[
                { 
                  path: "/integrated-prop-bots", 
                  label: "Đã Tích Hợp" 
                }
              ]}
              currentPath={location.pathname}
            />
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

interface NavItemProps {
  path: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
}

const NavItem = ({ path, label, icon: Icon, isActive }: NavItemProps) => {
  return (
    <Link
      to={path}
      className={cn(
        "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
        isActive 
          ? "bg-zinc-800 text-white" 
          : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
      )}
    >
      <Icon className="h-5 w-5 mr-3" />
      <span>{label}</span>
    </Link>
  );
};

interface SubItem {
  path: string;
  label: string;
}

interface CollapsibleNavItemProps extends NavItemProps {
  isOpen: boolean;
  onToggle: () => void;
  subItems: SubItem[];
  currentPath: string;
}

const CollapsibleNavItem = ({ 
  path, 
  label, 
  icon: Icon, 
  isActive,
  isOpen,
  onToggle,
  subItems,
  currentPath
}: CollapsibleNavItemProps) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center">
        <Link
          to={path}
          className={cn(
            "flex flex-1 items-center px-3 py-2 text-sm rounded-md transition-colors",
            isActive 
              ? "bg-zinc-800 text-white" 
              : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
          )}
        >
          <Icon className="h-5 w-5 mr-3" />
          <span className="truncate">{label}</span>
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggle();
          }}
          className="px-2 py-2 text-zinc-400 hover:text-white"
        >
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform",
            isOpen ? "transform rotate-180" : ""
          )} />
        </button>
      </div>
      
      {isOpen && (
        <div className="pl-10 space-y-1">
          {subItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "block px-3 py-2 text-sm rounded-md transition-colors",
                currentPath === item.path
                  ? "bg-zinc-800 text-white" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarNav;
