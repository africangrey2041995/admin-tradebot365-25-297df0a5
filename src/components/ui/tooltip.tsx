
import React, { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface TooltipProviderProps {
  children: ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
}

interface TooltipContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content: ReactNode;
  setContent: React.Dispatch<React.SetStateAction<ReactNode>>;
  position: { x: number; y: number };
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
}

const TooltipContext = React.createContext<TooltipContextType | undefined>(undefined);

export const TooltipProvider: React.FC<TooltipProviderProps> = ({ 
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <TooltipContext.Provider value={{ 
      open, 
      setOpen, 
      content, 
      setContent,
      position,
      setPosition
    }}>
      {children}
    </TooltipContext.Provider>
  );
};

export const Tooltip: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

interface TooltipTriggerProps {
  asChild?: boolean;
  children: ReactNode;
}

export const TooltipTrigger: React.FC<TooltipTriggerProps> = ({ 
  children,
  asChild = false,
}) => {
  const context = React.useContext(TooltipContext);
  
  if (!context) {
    throw new Error('TooltipTrigger must be used within a TooltipProvider');
  }
  
  const { setOpen, setPosition } = context;
  
  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPosition({ 
      x: rect.left + rect.width / 2, 
      y: rect.bottom + window.scrollY
    });
    setOpen(true);
  };
  
  const handleMouseLeave = () => {
    setOpen(false);
  };

  // Fix: properly cast and handle events for cloned elements
  if (asChild && React.isValidElement(children)) {
    const childProps = children.props as any;
    const originalOnMouseEnter = childProps.onMouseEnter;
    const originalOnMouseLeave = childProps.onMouseLeave;

    return React.cloneElement(children, {
      onMouseEnter: (e: React.MouseEvent) => {
        handleMouseEnter(e);
        if (originalOnMouseEnter) originalOnMouseEnter(e);
      },
      onMouseLeave: (e: React.MouseEvent) => {
        handleMouseLeave();
        if (originalOnMouseLeave) originalOnMouseLeave(e);
      },
    });
  }
  
  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export const TooltipContent: React.FC<{ 
  children: ReactNode;
  className?: string;
  sideOffset?: number;
}> = ({ 
  children,
  className,
  sideOffset = 5
}) => {
  const context = React.useContext(TooltipContext);
  
  if (!context) {
    throw new Error('TooltipContent must be used within a TooltipProvider');
  }
  
  const { open, position } = context;
  
  if (!open) return null;
  
  return createPortal(
    <div 
      className={cn(
        "z-50 px-3 py-1.5 text-xs font-medium text-white bg-zinc-800 rounded-md shadow-md",
        "animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1",
        "data-[side=top]:slide-in-from-bottom-1",
        className
      )}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y + sideOffset,
        transform: 'translateX(-50%)',
      }}
    >
      {children}
      <div 
        className="absolute w-2 h-2 bg-zinc-800 rotate-45"
        style={{
          left: '50%',
          top: -4,
          transform: 'translateX(-50%)',
        }}
      />
    </div>,
    document.body
  );
};
