
import React from 'react';

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ 
  title, 
  description, 
  variant = 'default'
}) => {
  return (
    <div className={`rounded-md px-4 py-3 shadow-lg ${
      variant === 'destructive' ? 'bg-red-600' : 'bg-white dark:bg-zinc-800'
    }`}>
      {title && <h3 className="font-medium">{title}</h3>}
      {description && <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>}
    </div>
  );
};

export const Toaster = () => {
  return (
    <div id="toaster" className="fixed top-4 right-4 z-50 space-y-2">
      {/* Toasts will be rendered here */}
    </div>
  );
};
