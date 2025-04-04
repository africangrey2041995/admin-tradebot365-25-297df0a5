
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Clock, ChevronRight, Trash, StopCircle, PlayCircle, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigation } from '@/hooks/useNavigation';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import { useState } from 'react';

export interface BotCardProps {
  title: string;
  subtitle: string;
  botId: string;
  accountCount: string;
  lastUpdated: string;
  colorScheme?: 'default' | 'red' | 'blue' | 'green' | 'purple';
  avatarIcon: React.ReactNode;
  exchange?: string;
  botForm?: string;
  status?: string;
  signalToken?: string;
  webhookUrl?: string;
  isFavorite?: boolean;
}

const BotCard: React.FC<BotCardProps> = ({
  title,
  subtitle,
  botId,
  accountCount,
  lastUpdated,
  colorScheme = 'default',
  avatarIcon,
  exchange,
  botForm,
  status = 'Active'
}) => {
  const { navigateToBotDetail } = useNavigation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const getColorScheme = () => {
    switch (colorScheme) {
      case 'red':
        return 'bg-red-50 text-red-600 border-red-200';
      case 'blue':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'green':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'purple':
        return 'bg-purple-50 text-purple-600 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const handleCardClick = () => {
    navigateToBotDetail(botId);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigateToBotDetail(botId);
  };

  const handleToggleStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newStatus = status === 'Active' ? 'Inactive' : 'Active';
    toast.success(`Bot ${title} đã được ${newStatus === 'Active' ? 'kích hoạt' : 'dừng'}`);
  };

  const handleDeleteBot = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      toast.success(`Bot ${title} đã được xóa thành công`);
    }, 1000);
  };

  return (
    <>
      <Card className="h-full transition-all duration-200 hover:shadow-md relative overflow-hidden group cursor-pointer" onClick={handleCardClick}>
        <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 ${colorScheme === 'red' ? 'bg-red-500' : colorScheme === 'blue' ? 'bg-blue-500' : colorScheme === 'green' ? 'bg-emerald-500' : colorScheme === 'purple' ? 'bg-purple-500' : 'bg-slate-500'}`}></div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Avatar className={cn("h-10 w-10", 
              colorScheme === 'red' ? 'bg-red-100 text-red-600' : 
              colorScheme === 'blue' ? 'bg-blue-100 text-blue-600' : 
              colorScheme === 'green' ? 'bg-emerald-100 text-emerald-600' : 
              colorScheme === 'purple' ? 'bg-purple-100 text-purple-600' : 
              'bg-slate-100 text-slate-600'
            )}>
              <AvatarFallback>
                {avatarIcon}
              </AvatarFallback>
            </Avatar>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem onClick={handleViewDetails}>
                  <Eye className="h-4 w-4 mr-2" />
                  Xem chi tiết
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleToggleStatus}>
                  {status === 'Active' ? (
                    <>
                      <StopCircle className="h-4 w-4 mr-2" />
                      Dừng bot
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Khởi động bot
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteBot} className="text-red-600">
                  <Trash className="h-4 w-4 mr-2" />
                  Xóa bot
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardTitle className="mt-2">{title}</CardTitle>
          <CardDescription className="line-clamp-2">{subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Bot ID:</span>
              <span className="font-medium">{botId}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tài khoản:</span>
              <span className="font-medium">{accountCount}</span>
            </div>

            {exchange && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Sàn:</span>
                <Badge variant="outline" className={cn("font-normal", getColorScheme())}>
                  {exchange}
                </Badge>
              </div>
            )}

            {botForm && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Loại:</span>
                <Badge variant="outline" className="font-normal">
                  {botForm}
                </Badge>
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>Cập nhật:</span>
              </div>
              <span className="font-medium">{lastUpdated}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t flex items-center justify-between">
            <Badge variant={status === 'Active' ? 'success' : 'secondary'} className="rounded-sm">
              {status}
            </Badge>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1"
              onClick={handleViewDetails}
            >
              Chi tiết
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Xóa bot"
        description={`Bạn có chắc chắn muốn xóa bot "${title}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa bot"
        variant="danger"
        onConfirm={confirmDelete}
        isProcessing={isDeleting}
      />
    </>
  );
};

export default BotCard;
