
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AccordionContextType {
  value: string | null;
  onChange: (value: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

export const Accordion = ({ 
  children, 
  type = 'single', 
  collapsible = false,
  className = '',
  value: controlledValue,
  onValueChange
}: { 
  children: ReactNode;
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}) => {
  const [value, setValue] = useState<string | null>(null);

  const onChange = (newValue: string) => {
    if (controlledValue !== undefined && onValueChange) {
      onValueChange(newValue);
    } else {
      setValue(newValue === value ? null : newValue);
    }
  };

  return (
    <AccordionContext.Provider value={{ value: controlledValue || value, onChange, type }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem = ({ 
  children, 
  value,
  className = ''
}: { 
  children: ReactNode;
  value: string;
  className?: string;
}) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export const AccordionTrigger = ({ 
  children,
  className = ''
}: { 
  children: ReactNode;
  className?: string;
}) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionTrigger must be used within an Accordion');
  
  const { value, onChange } = context;
  
  return (
    <div 
      className={`py-4 px-4 cursor-pointer ${className}`}
      onClick={() => onChange(value || '')}
    >
      {children}
    </div>
  );
};

export const AccordionContent = ({ 
  children,
  className = ''
}: { 
  children: ReactNode;
  className?: string;
}) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionContent must be used within an Accordion');
  
  const { value } = context;
  
  if (!value) return null;
  
  return (
    <div className={className}>
      {children}
    </div>
  );
};
