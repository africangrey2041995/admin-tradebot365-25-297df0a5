
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface StatusFilterButtonsProps {
  filterStatus: string | null;
  onFilterClick: (status: string | null) => void;
}

export const StatusFilterButtons: React.FC<StatusFilterButtonsProps> = ({
  filterStatus,
  onFilterClick
}) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        className={`border-zinc-700 ${filterStatus === 'active' ? 'bg-green-500/20 text-green-500' : 'text-zinc-400'}`}
        onClick={() => onFilterClick('active')}
      >
        <Check className="h-4 w-4 mr-2" />
        Hoạt động
      </Button>
      <Button 
        variant="outline" 
        className={`border-zinc-700 ${filterStatus === 'inactive' ? 'bg-yellow-500/20 text-yellow-500' : 'text-zinc-400'}`}
        onClick={() => onFilterClick('inactive')}
      >
        <X className="h-4 w-4 mr-2" />
        Không hoạt động
      </Button>
      <Button 
        variant="outline" 
        className={`border-zinc-700 ${filterStatus === 'suspended' ? 'bg-red-500/20 text-red-500' : 'text-zinc-400'}`}
        onClick={() => onFilterClick('suspended')}
      >
        <X className="h-4 w-4 mr-2" />
        Đã khóa
      </Button>
    </div>
  );
};
