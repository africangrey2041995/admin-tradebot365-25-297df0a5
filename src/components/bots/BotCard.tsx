
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MoreHorizontal, Calendar, Plus, Eye, Bot, Cpu, Server, Terminal, CircuitBoard, Gem } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

export interface BotCardProps {
  title: string;
  subtitle?: string;
  botId: string; // Already using botId, no change needed
  accountCount?: string;
  lastUpdated?: string;
  isFavorite?: boolean;
  colorScheme?: 'red' | 'blue' | 'green' | 'purple' | 'default';
  avatarSrc?: string;
  avatarIcon?: React.ReactNode;
  exchange?: string;
  botForm?: string;
  status?: 'Active' | 'Inactive';
}

const BotCard = ({
  title,
  subtitle,
  botId, // Already using botId, no change needed
  accountCount,
  lastUpdated,
  isFavorite = false,
  colorScheme = 'default',
  avatarSrc,
  avatarIcon,
  status = 'Active'
}: BotCardProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  const formattedSubtitle = subtitle ? truncateText(subtitle, isMobile ? 55 : 75) : '';
  
  const colorClasses = {
    red: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-red-100/30',
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-blue-100/30',
    green: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-green-100/30',
    purple: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-purple-100/30',
    default: 'bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:shadow-slate-100/30'
  };
  
  const avatarBgColors = {
    red: 'bg-red-100 text-red-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    default: 'bg-slate-100 text-slate-600'
  };

  const buttonColors = {
    red: 'bg-white hover:bg-white/90 text-red-600 border-red-200',
    blue: 'bg-white hover:bg-white/90 text-blue-600 border-blue-200',
    green: 'bg-white hover:bg-white/90 text-green-600 border-green-200',
    purple: 'bg-white hover:bg-white/90 text-purple-600 border-purple-200',
    default: 'bg-white hover:bg-white/90 text-slate-600 border-slate-200'
  };

  const viewButtonColors = {
    red: 'text-red-600',
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    default: 'text-slate-600'
  };

  const toggleFavorite = () => {
    toast('Favorite', {
      description: `${title} ${isFavorite ? 'removed from' : 'added to'} favorites.`,
    });
  };

  const handleAddAccount = () => {
    toast('Add Account', {
      description: 'The feature to add accounts will be implemented in the next version.',
    });
  };
  
  const handleViewBot = () => {
    navigate(`/bots/${botId}`);
  };
  
  return (
    <div className={`relative rounded-xl border shadow-sm ${isMobile ? 'p-4' : 'p-5'} transition-all duration-300 hover:shadow-md ${colorClasses[colorScheme]} group ${isMobile ? '' : 'hover:-translate-y-1'}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-grow">
          <div className="flex justify-center mb-3">
            <Avatar className={`${isMobile ? 'h-14 w-14' : 'h-16 w-16'} ${avatarBgColors[colorScheme]} border-2 border-white shadow-sm`}>
              {avatarSrc ? (
                <AvatarImage src={avatarSrc} alt={title} />
              ) : (
                <AvatarFallback className={isMobile ? "text-lg" : "text-xl"}>
                  {avatarIcon || <Bot className={isMobile ? "h-6 w-6" : "h-7 w-7"} />}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-black/5">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Thao Tác</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleViewBot}>
              <Eye className="h-4 w-4 mr-2" />
              Xem Chi Tiết
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={handleAddAccount}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm Tài Khoản
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive cursor-pointer">
              Xoá Bot
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="text-center mb-3">
        <div className="flex items-center justify-center gap-2 mb-1">
          <h3 className={`font-bold ${isMobile ? 'text-lg' : 'text-xl'} tracking-tight text-slate-800`}>{title}</h3>
          <button 
            onClick={toggleFavorite}
            className="text-yellow-400 hover:text-yellow-500 transition-colors"
            aria-label="Toggle favorite"
          >
            <Star className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
        <div className={`${isMobile ? 'h-8' : 'h-10'} flex items-center justify-center`}>
          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground leading-tight mx-auto line-clamp-2`}>
            {formattedSubtitle || "—"}
          </p>
        </div>
      </div>
      
      <div className={`flex items-center justify-between ${isMobile ? 'py-2 px-2.5' : 'py-2.5 px-3'} mt-4 mb-3 rounded-lg bg-white/70 backdrop-blur-sm border border-slate-100`}>
        <div className="flex items-center">
          <p className={`${isMobile ? 'text-2xs' : 'text-xs'} font-medium mr-1.5 text-slate-500`}>ID:</p>
          <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium tracking-wide text-slate-700`}>{botId}</div>
        </div>
        
        {lastUpdated && (
          <div className={`flex items-center ${isMobile ? 'text-2xs' : 'text-xs'} font-medium text-slate-500`}>
            <Calendar className={`${isMobile ? 'h-2.5 w-2.5' : 'h-3 w-3'} mr-1`} />
            {lastUpdated}
          </div>
        )}
      </div>
      
      <div className={`flex justify-between items-center ${isMobile ? 'px-2.5 py-2' : 'px-3 py-2.5'} rounded-lg bg-white/70 backdrop-blur-sm border border-slate-100 mb-4`}>
        <div className="flex items-center gap-1.5">
          <p className={`${isMobile ? 'text-2xs' : 'text-xs'} text-slate-500`}>Accounts:</p>
          <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-slate-700`}>{accountCount}</div>
        </div>
        
        <button 
          onClick={handleAddAccount}
          className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} rounded-full bg-white hover:bg-slate-50 flex items-center justify-center text-xs font-medium border border-slate-200 transition-colors text-slate-600`}
          aria-label="Add account"
        >
          <Plus className={`${isMobile ? 'h-2.5 w-2.5' : 'h-3 w-3'}`} />
        </button>
      </div>
      
      <Button 
        variant="outline" 
        onClick={handleViewBot} 
        className={`w-full ${isMobile ? 'py-1.5 text-sm' : 'py-2'} h-auto ${buttonColors[colorScheme]} shadow-sm font-medium mt-auto flex gap-2 justify-center items-center`}
      >
        <Eye className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} ${viewButtonColors[colorScheme]}`} />
        <span>View Bot</span>
      </Button>
    </div>
  );
};

export default BotCard;
