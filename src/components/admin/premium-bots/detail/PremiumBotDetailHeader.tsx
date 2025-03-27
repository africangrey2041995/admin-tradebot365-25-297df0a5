
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronLeft, Pencil, MoreVertical, Check, X } from 'lucide-react';
import { ADMIN_ROUTES } from '@/constants/routes';
import EditableRiskLevel from '@/components/admin/shared/EditableRiskLevel';
import { BotRiskLevel } from '@/constants/botTypes';
import { toast } from 'sonner';

interface PremiumBotDetailHeaderProps {
  name: string;
  status: string;
  risk: string;
  id: string;  // This is the botId
  onUpdateRisk?: (newRisk: BotRiskLevel) => void;
  onUpdateName?: (newName: string) => void;
}

// Utility function to get bot status badge UI
const getBotStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return <Badge className="bg-green-500">Active</Badge>;
    case 'paused':
      return <Badge className="bg-yellow-500">Paused</Badge>;
    case 'draft':
      return <Badge variant="outline">Draft</Badge>;
    case 'archived':
      return <Badge variant="secondary">Archived</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const PremiumBotDetailHeader: React.FC<PremiumBotDetailHeaderProps> = ({
  name,
  status,
  risk,
  id,
  onUpdateRisk,
  onUpdateName
}) => {
  const navigate = useNavigate();
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditingName]);

  const goBackToList = () => {
    navigate(ADMIN_ROUTES.PREMIUM_BOTS);
  };

  const handleUpdateRisk = (newRisk: BotRiskLevel) => {
    if (onUpdateRisk) {
      onUpdateRisk(newRisk);
    } else {
      // Fallback if no handler is provided
      toast.success(`Đã cập nhật mức độ rủi ro thành: ${newRisk}`);
    }
  };

  const startEditingName = () => {
    setIsEditingName(true);
    setEditedName(name);
  };

  const cancelEditingName = () => {
    setIsEditingName(false);
    setEditedName(name);
  };

  const saveBotName = () => {
    if (editedName.trim() === '') {
      toast.error('Tên bot không được để trống');
      return;
    }

    if (onUpdateName) {
      onUpdateName(editedName);
    } else {
      // Fallback if no handler is provided
      toast.success('Đã cập nhật tên bot thành công');
    }
    
    setIsEditingName(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveBotName();
    } else if (e.key === 'Escape') {
      cancelEditingName();
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={goBackToList} className="text-white hover:text-white/80 hover:bg-white/10">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        
        {isEditingName ? (
          <div className="flex items-center">
            <Input
              ref={nameInputRef}
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-8 w-auto mr-2 bg-background"
            />
            <Button size="sm" variant="ghost" onClick={saveBotName} className="p-0 w-8 h-8 mr-1">
              <Check className="h-4 w-4 text-green-500" />
            </Button>
            <Button size="sm" variant="ghost" onClick={cancelEditingName} className="p-0 w-8 h-8">
              <X className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">{name}</h1>
            <Button variant="ghost" size="sm" onClick={startEditingName} className="ml-1 p-0 w-8 h-8">
              <Pencil className="h-4 w-4 text-gray-400 hover:text-white" />
            </Button>
          </div>
        )}
        
        {getBotStatusBadge(status)}
        <EditableRiskLevel risk={risk} onUpdate={handleUpdateRisk} />
        <Badge variant="outline" className="ml-2 text-white border-white/20">{`ID: ${id}`}</Badge>
      </div>
      <div className="flex space-x-2">
        <Button>
          <Pencil className="h-4 w-4 mr-2" />
          Edit Bot
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Bot Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Preview Bot</DropdownMenuItem>
            <DropdownMenuItem>Change Status</DropdownMenuItem>
            <DropdownMenuItem>Clone Bot</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">Delete Bot</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default PremiumBotDetailHeader;
