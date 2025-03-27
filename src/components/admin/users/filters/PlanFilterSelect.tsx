
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PlanFilterSelectProps {
  planFilter: string | null;
  onPlanFilterChange: (value: string | null) => void;
  options?: {
    value: string;
    label: string;
  }[];
  placeholder?: string;
  className?: string;
}

export const PlanFilterSelect: React.FC<PlanFilterSelectProps> = ({
  planFilter,
  onPlanFilterChange,
  options = [
    { value: 'all', label: 'Tất cả loại' },
    { value: 'live', label: 'Tài khoản Live' },
    { value: 'demo', label: 'Tài khoản Demo' }
  ],
  placeholder = "Loại tài khoản",
  className = "w-full sm:max-w-[300px]"
}) => {
  return (
    <div className={className}>
      <Select 
        value={planFilter || "all"} 
        onValueChange={(value) => onPlanFilterChange(value === 'all' ? null : value || null)}
      >
        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
