
import React from 'react';
import { Button } from "@/components/ui/button";

interface StatusFilterButtonsProps {
  filterStatus: string | null;
  onFilterClick: (status: string | null) => void;
  options?: {
    value: string | null;
    label: string;
  }[];
}

export const StatusFilterButtons: React.FC<StatusFilterButtonsProps> = ({
  filterStatus,
  onFilterClick,
  options = [
    { value: null, label: 'Tất cả' },
    { value: 'active', label: 'Hoạt động' },
    { value: 'inactive', label: 'Không hoạt động' }
  ]
}) => {
  return (
    <div className="flex items-center flex-wrap gap-2">
      {options.map((option, index) => (
        <Button
          key={index}
          variant={filterStatus === option.value ? "default" : "outline"}
          size="sm"
          className={`
            h-8 px-3 
            ${filterStatus === option.value ? 
              'bg-primary text-white border-transparent' : 
              'border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }
          `}
          onClick={() => onFilterClick(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};
