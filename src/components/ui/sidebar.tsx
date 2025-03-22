
import React, { createContext, useContext, useState, ReactNode } from 'react';

type SidebarState = 'expanded' | 'collapsed';

interface SidebarContextType {
  state: SidebarState;
  setState: (state: SidebarState) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<SidebarState>('expanded');
  const [openMobile, setOpenMobile] = useState(false);

  return (
    <SidebarContext.Provider value={{ state, setState, openMobile, setOpenMobile }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export const Sidebar = ({ className, children }: { className?: string, children: ReactNode }) => {
  return <div className={className}>{children}</div>;
};

export const SidebarContent = ({ className, children }: { className?: string, children: ReactNode }) => {
  return <div className={className}>{children}</div>;
};

export const SidebarTrigger = ({ className }: { className?: string }) => {
  const { state, setState } = useSidebar();
  return (
    <button 
      className={className}
      onClick={() => setState(state === 'expanded' ? 'collapsed' : 'expanded')}
    >
      Toggle
    </button>
  );
};

export const SidebarSeparator = ({ className }: { className?: string }) => {
  return <hr className={className} />;
};

export const SidebarMenu = ({ children }: { children: ReactNode }) => {
  return <ul className="space-y-1">{children}</ul>;
};

export const SidebarMenuItem = ({ children }: { children: ReactNode }) => {
  return <li>{children}</li>;
};

export const SidebarMenuButton = ({ 
  children, 
  asChild = false,
  isActive = false,
  onClick
}: { 
  children: ReactNode, 
  asChild?: boolean,
  isActive?: boolean,
  onClick?: () => void
}) => {
  if (asChild) return <>{children}</>;
  return (
    <button 
      className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${isActive ? 'bg-zinc-100 dark:bg-zinc-800' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const SidebarGroup = ({ children }: { children: ReactNode }) => {
  return <div className="py-2">{children}</div>;
};

export const SidebarGroupLabel = ({ children }: { children: ReactNode }) => {
  return <h3 className="px-3 py-2 text-xs font-medium text-zinc-500">{children}</h3>;
};

export const SidebarGroupContent = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};
