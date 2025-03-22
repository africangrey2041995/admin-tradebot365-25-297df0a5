
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface NavMenuItemProps {
  icon?: ReactNode;
  children: ReactNode;
  isActive?: boolean;
  asChild?: boolean;
  onClick?: () => void;
  tooltipText?: string;
}

const NavMenuItem: React.FC<NavMenuItemProps> = ({
  icon,
  children,
  isActive = false,
  asChild = false,
  onClick,
  tooltipText
}) => {
  const menuItem = (
    <div
      className={cn(
        "flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer",
        "transition-colors duration-200",
        isActive
          ? "bg-zinc-800 text-white"
          : "text-zinc-400 hover:text-white hover:bg-zinc-800"
      )}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span className="flex-1">{children}</span>
    </div>
  );

  if (tooltipText) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{menuItem}</TooltipTrigger>
          <TooltipContent>{tooltipText}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return menuItem;
};

export default NavMenuItem;
