
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SiteFooterProps {
  className?: string;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ className }) => {
  return (
    <footer className={cn("border-t bg-background", className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold">TradeBot</span>
          </Link>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2023 TradeBot. Bản quyền thuộc về Công ty CP TradeBot.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            to="/legal"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Điều khoản
          </Link>
          <Link
            to="/privacy"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Bảo mật
          </Link>
        </div>
      </div>
    </footer>
  );
};
