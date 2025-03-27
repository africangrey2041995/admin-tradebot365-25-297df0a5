
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Star, Sparkles, Trophy } from "lucide-react";

export type BotTagType = 'featured' | 'new' | 'bestSeller';

interface BotTagProps {
  type: BotTagType;
  size?: 'sm' | 'md' | 'lg';
}

export const BotTag: React.FC<BotTagProps> = ({ type, size = 'md' }) => {
  const getSize = () => {
    switch (size) {
      case 'sm': return 'text-[10px] py-0 px-1';
      case 'lg': return 'text-xs py-1 px-2';
      default: return 'text-xs py-0.5 px-1.5';
    }
  };

  switch (type) {
    case 'featured':
      return (
        <Badge variant="outline" className={`${getSize()} bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/30 font-medium flex items-center gap-0.5`}>
          <Star className={`${size === 'sm' ? 'h-2.5 w-2.5' : 'h-3 w-3'} fill-current`} />
          <span>Nổi Bật</span>
        </Badge>
      );
    case 'new':
      return (
        <Badge variant="outline" className={`${getSize()} bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800/30 font-medium flex items-center gap-0.5`}>
          <Sparkles className={`${size === 'sm' ? 'h-2.5 w-2.5' : 'h-3 w-3'}`} />
          <span>Mới</span>
        </Badge>
      );
    case 'bestSeller':
      return (
        <Badge variant="outline" className={`${getSize()} bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/30 font-medium flex items-center gap-0.5`}>
          <Trophy className={`${size === 'sm' ? 'h-2.5 w-2.5' : 'h-3 w-3'} fill-current`} />
          <span>Bán Chạy</span>
        </Badge>
      );
    default:
      return null;
  }
};
