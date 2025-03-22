
import React, { ReactNode, createContext, useContext, useState } from 'react';
import { cn } from '@/lib/utils';

type SidebarState = 'expanded' | 'collapsed';

interface SidebarContextType {
  state: SidebarState;
  openMobile: boolean;
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  expand: () => void;
  collapse: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<SidebarState>('expanded');
  const [openMobile, setOpenMobile] = useState(false);

  const toggle = () => {
    setState(prevState => (prevState === 'expanded' ? 'collapsed' : 'expanded'));
  };

  const expand = () => setState('expanded');
  const collapse = () => setState('collapsed');

  return (
    <SidebarContext.Provider value={{ state, openMobile, setOpenMobile, toggle, expand, collapse }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Sidebar components
export const Sidebar: React.FC<{ className?: string; children: ReactNode }> = ({ className, children }) => {
  return <div className={cn("h-screen", className)}>{children}</div>;
};

export const SidebarContent: React.FC<{ className?: string; children: ReactNode }> = ({ className, children }) => {
  const { state, openMobile } = useSidebar();
  
  return (
    <div className={cn(
      "h-full overflow-y-auto",
      state === 'collapsed' ? 'w-16' : 'w-64',
      openMobile ? 'block' : 'hidden md:block',
      className
    )}>
      {children}
    </div>
  );
};

export const SidebarTrigger: React.FC<{ className?: string }> = ({ className }) => {
  const { toggle } = useSidebar();
  
  return (
    <button 
      onClick={toggle}
      className={cn("p-2 rounded-md", className)}
    >
      ☰
    </button>
  );
};

export const SidebarSeparator: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={cn("h-[1px] w-full my-2", className)} />;
};

export const SidebarMenu: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="space-y-1 px-2">{children}</div>;
};

export const SidebarMenuItem: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};

export const SidebarMenuButton: React.FC<{ 
  children: ReactNode;
  asChild?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}> = ({ 
  children, 
  isActive = false,
  onClick
}) => {
  return (
    <button
      className={cn(
        "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors",
        isActive ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const SidebarGroup: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

export const SidebarGroupLabel: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <h3 className="px-3 mb-1 text-xs font-semibold text-zinc-500 uppercase tracking-wider">{children}</h3>;
};

export const SidebarGroupContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};
