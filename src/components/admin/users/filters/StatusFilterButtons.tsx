
import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

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
    { value: 'connected', label: 'Đã kết nối' },
    { value: 'disconnected', label: 'Chưa kết nối' }
  ]
}) => {
  return (
    <div className="flex items-center flex-wrap gap-2" role="group" aria-label="Lọc theo trạng thái">
      {options.map((option, index) => (
        <Button
          key={index}
          variant={filterStatus === option.value ? "default" : "outline"}
          size="sm"
          className={`
            h-8 px-3 relative overflow-hidden
            ${filterStatus === option.value ? 
              'bg-primary text-white border-transparent' : 
              'border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }
          `}
          onClick={() => onFilterClick(option.value)}
          aria-pressed={filterStatus === option.value}
        >
          {filterStatus === option.value && (
            <motion.span
              layoutId="buttonHighlight"
              className="absolute inset-0 bg-primary z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
          <span className="relative z-10">{option.label}</span>
        </Button>
      ))}
    </div>
  );
};
