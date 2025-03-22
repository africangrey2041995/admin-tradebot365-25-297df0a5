
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

interface SiteHeaderProps {
  className?: string;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ className }) => {
  const { user } = useAuth();

  return (
    <header className={cn("sticky top-0 z-40 w-full border-b bg-background", className)}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">TradeBot</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Trang chủ
            </Link>
            <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
              Giới thiệu
            </Link>
            <Link to="/pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Bảng giá
            </Link>
            <Link to="/contact" className="text-sm font-medium transition-colors hover:text-primary">
              Liên hệ
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <Link to="/profile">
              <Button variant="ghost" size="sm">
                <img 
                  src={user.image || "/placeholder.svg"} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span>{user.name}</span>
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">
                  Đăng ký
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
