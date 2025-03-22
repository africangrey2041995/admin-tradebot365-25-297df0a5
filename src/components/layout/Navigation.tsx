
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Bot, 
  CreditCard, 
  Settings, 
  BarChart3, 
  Package, 
  Briefcase,
  Users,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import BetaTag from '@/components/common/BetaTag';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  isBeta?: boolean;
}

interface NavigationProps {
  closeSidebar?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ closeSidebar }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const navigation: NavigationItem[] = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Bot của tôi', href: '/bots', icon: Bot },
    { name: 'Premium Bots', href: '/premium-bots', icon: Package },
    { name: 'Premium Đã Tích Hợp', href: '/integrated-premium-bots', icon: BarChart3, isBeta: true },
    { name: 'Prop Trading Bots', href: '/prop-trading-bots', icon: Briefcase },
    { name: 'Prop Đã Tích Hợp', href: '/integrated-prop-bots', icon: Users, isBeta: true },
    { name: 'Tài khoản', href: '/accounts', icon: CreditCard },
    { name: 'Lỗi Bot', href: '/bot-errors', icon: AlertTriangle, badge: '4' },
    { name: 'Cài đặt', href: '/settings', icon: Settings }
  ];

  return (
    <nav className="flex flex-col gap-1 p-2">
      {navigation.map((item) => {
        const isActive = 
          pathname === item.href || 
          (item.href !== '/' && pathname.startsWith(item.href));
        
        return (
          <Link
            key={item.name}
            to={item.href}
            onClick={closeSidebar}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              isActive ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50',
              'justify-start gap-3 pl-3 mb-0.5'
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
            {item.badge && (
              <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-medium">
                {item.badge}
              </span>
            )}
            {item.isBeta && (
              <div className="ml-auto">
                <BetaTag />
              </div>
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
