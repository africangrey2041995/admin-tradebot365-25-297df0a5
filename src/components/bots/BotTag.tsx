
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Star, Sparkles, Trophy, Ribbon } from "lucide-react";

export type BotTagType = 'featured' | 'new' | 'bestSeller';

interface BotTagProps {
  type: BotTagType;
  size?: 'sm' | 'md' | 'lg';
}

export const BotTag: React.FC<BotTagProps> = ({ type, size = 'md' }) => {
  const getTagClass = () => {
    const baseClasses = `
      absolute top-0 right-0 z-20
      transform rotate-45 origin-top-right
      text-white font-bold shadow-md
      flex items-center justify-center
      w-32 h-8
      ${size === 'sm' ? 'w-28 h-6 text-[10px]' : size === 'lg' ? 'w-36 h-10 text-sm' : 'w-32 h-8 text-xs'}
    `;
    
    switch (type) {
      case 'featured':
        return `
          ${baseClasses}
          bg-gradient-to-r from-amber-400 to-amber-600
          border-t border-r border-amber-200 dark:border-amber-600
          shadow-amber-300/50 dark:shadow-amber-500/30
        `;
      
      case 'new':
        return `
          ${baseClasses}
          bg-gradient-to-r from-blue-400 to-blue-600
          border-t border-r border-blue-300 dark:border-blue-700
          shadow-blue-400/50 dark:shadow-blue-600/30
        `;
      
      case 'bestSeller':
        return `
          ${baseClasses}
          bg-gradient-to-r from-emerald-400 to-emerald-600
          border-t border-r border-emerald-300 dark:border-emerald-700
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
          <div className="absolute inset-0 flex items-center justify-center">
            <Star className={`${getIconSize()} fill-white mr-1`} />
            <span className="drop-shadow-md">Nổi Bật</span>
          </div>
        </div>
      );
    case 'new':
      return (
        <div className={getTagClass()}>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className={`${getIconSize()} mr-1`} />
            <span className="drop-shadow-md">Mới</span>
          </div>
        </div>
      );
    case 'bestSeller':
      return (
        <div className={getTagClass()}>
          <div className="absolute inset-0 flex items-center justify-center">
            <Trophy className={`${getIconSize()} fill-white mr-1`} />
            <span className="drop-shadow-md">Bán Chạy</span>
          </div>
        </div>
      );
    default:
      return null;
  }
};
