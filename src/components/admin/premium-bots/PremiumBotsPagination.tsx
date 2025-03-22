
import React from 'react';
import { Button } from "@/components/ui/button";

interface PremiumBotsPaginationProps {
  totalItems: number;
  visibleItems: number;
}

export const PremiumBotsPagination: React.FC<PremiumBotsPaginationProps> = ({
  totalItems,
  visibleItems
}) => {
  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-zinc-400">
        Hiển thị <span className="font-medium text-white">1-{visibleItems}</span> trong <span className="font-medium text-white">{totalItems}</span> bots
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
          Trước
        </Button>
        <Button variant="outline" size="sm" className="border-zinc-700 bg-zinc-800 text-white">
          1
        </Button>
        <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
          Sau
        </Button>
      </div>
    </div>
  );
};
