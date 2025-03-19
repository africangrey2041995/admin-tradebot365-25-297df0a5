
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  description?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const DashboardCard = ({
  title,
  description,
  footer,
  children,
  className,
  onClick
}: DashboardCardProps) => {
  return (
    <Card 
      className={cn(
        "transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md", 
        onClick && "cursor-pointer hover:translate-y-[-2px]", 
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pb-2">{children}</CardContent>
      {footer && <CardFooter className="pt-3 border-t">{footer}</CardFooter>}
    </Card>
  );
};

export default DashboardCard;
