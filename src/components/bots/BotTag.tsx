
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Star, Sparkles, Trophy } from "lucide-react";

export type BotTagType = 'featured' | 'new' | 'bestSeller';

interface BotTagProps {
  type: BotTagType;
  size?: 'sm' | 'md' | 'lg';
}

export const BotTag: React.FC<BotTagProps> = ({ type, size = 'md' }) => {
  const getTagClass = () => {
    const baseClasses = `
      inline-flex items-center justify-center rounded-lg
      text-white font-bold shadow-lg
      ${size === 'sm' ? 'px-2 py-0.5 text-[10px]' : size === 'lg' ? 'px-3 py-1 text-sm' : 'px-2.5 py-0.5 text-xs'}
    `;
    
    switch (type) {
      case 'featured':
        return `
          ${baseClasses}
          bg-gradient-to-r from-amber-300 to-amber-500
          border-2 border-amber-200 dark:border-amber-600
          shadow-amber-300/50 dark:shadow-amber-500/30
        `;
      
      case 'new':
        return `
          ${baseClasses}
          bg-gradient-to-r from-blue-400 to-blue-600
          border-2 border-blue-300 dark:border-blue-700
          shadow-blue-400/50 dark:shadow-blue-600/30
        `;
      
      case 'bestSeller':
        return `
          ${baseClasses}
          bg-gradient-to-r from-emerald-400 to-emerald-600
          border-2 border-emerald-300 dark:border-emerald-700
          shadow-emerald-400/50 dark:shadow-emerald-600/30
        `;
      
      default:
        return '';
    }
  };

  const getIconSize = () => {
    return size === 'sm' ? 'h-2.5 w-2.5' : size === 'lg' ? 'h-4 w-4' : 'h-3 w-3';
  };

  switch (type) {
    case 'featured':
      return (
        <div className={getTagClass()}>
          <Star className={`${getIconSize()} fill-white mr-1`} />
          <span className="drop-shadow-md">Nổi Bật</span>
        </div>
      );
    case 'new':
      return (
        <div className={getTagClass()}>
          <Sparkles className={`${getIconSize()} mr-1`} />
          <span className="drop-shadow-md">Mới</span>
        </div>
      );
    case 'bestSeller':
      return (
        <div className={getTagClass()}>
          <Trophy className={`${getIconSize()} fill-white mr-1`} />
          <span className="drop-shadow-md">Bán Chạy</span>
        </div>
      );
    default:
      return null;
  }
};
