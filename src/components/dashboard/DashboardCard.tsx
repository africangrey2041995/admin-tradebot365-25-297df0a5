
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardCardProps {
  title: string;
  description?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  color?: 'primary' | 'success' | 'warning' | 'info' | 'danger' | 'default';
}

const DashboardCard = ({
  title,
  description,
  footer,
  children,
  className,
  onClick,
  icon,
  color = 'default'
}: DashboardCardProps) => {
  const isMobile = useIsMobile();
  
  const colorClasses = {
    primary: 'bg-blue-50 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400',
    success: 'bg-green-50 text-green-500 dark:bg-green-900/20 dark:text-green-400',
    warning: 'bg-yellow-50 text-yellow-500 dark:bg-yellow-900/20 dark:text-yellow-400',
    info: 'bg-cyan-50 text-cyan-500 dark:bg-cyan-900/20 dark:text-cyan-400',
    danger: 'bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400',
    default: 'bg-primary/10 text-primary dark:bg-primary/20'
  };

  return (
    <Card 
      className={cn(
        "h-full transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800", 
        onClick && "cursor-pointer hover:translate-y-[-2px]", 
        className
      )}
      onClick={onClick}
    >
      <CardHeader className={`${isMobile ? 'p-3 pb-2' : 'pb-3'}`}>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} font-medium text-slate-800 dark:text-white`}>{title}</CardTitle>
            {description && <CardDescription className="text-slate-500 dark:text-slate-400 mt-1">{description}</CardDescription>}
          </div>
          {icon && (
            <div className={cn(`${isMobile ? 'p-2' : 'p-3'} rounded-lg`, colorClasses[color])}>
              {icon}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className={`${isMobile ? 'p-0' : 'pb-2'}`}>{children}</CardContent>
      {footer && <CardFooter className={`${isMobile ? 'p-3 pt-2' : 'pt-3'} border-t border-slate-200 dark:border-zinc-700`}>{footer}</CardFooter>}
    </Card>
  );
};

export default DashboardCard;
