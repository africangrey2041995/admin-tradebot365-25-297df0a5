
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
}

export const PlanFilterSelect: React.FC<PlanFilterSelectProps> = ({
  planFilter,
  onPlanFilterChange
}) => {
  return (
    <div className="w-full sm:max-w-[300px]">
      <Select 
        value={planFilter || ""} 
        onValueChange={(value) => onPlanFilterChange(value || null)}
      >
        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
          <SelectValue placeholder="Gói dịch vụ" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
          <SelectItem value="all">Tất cả gói</SelectItem>
          <SelectItem value="premium">Premium</SelectItem>
          <SelectItem value="basic">Basic</SelectItem>
          <SelectItem value="trial">Trial</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
