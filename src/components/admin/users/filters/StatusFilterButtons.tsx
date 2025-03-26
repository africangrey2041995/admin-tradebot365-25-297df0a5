
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
            h-8 px-3 relative overflow-hidden backdrop-blur-sm
            ${filterStatus === option.value ? 
              'bg-gradient-to-r from-tradebot to-tradebot/80 text-zinc-900 border-transparent font-medium shadow-lg shadow-tradebot/20' : 
              'border-zinc-700/50 text-zinc-300 hover:text-white hover:border-tradebot/50 hover:bg-zinc-800/50'
            }
          `}
          onClick={() => onFilterClick(option.value)}
          aria-pressed={filterStatus === option.value}
        >
          {filterStatus === option.value && (
            <motion.span
              layoutId="buttonHighlight"
              className="absolute inset-0 bg-gradient-to-r from-tradebot to-tradebot/80 z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
          <span className="relative z-10">{option.label}</span>
        </Button>
      ))}
    </div>
  );
};
