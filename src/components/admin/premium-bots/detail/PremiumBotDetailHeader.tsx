
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronLeft, Pencil, MoreVertical } from 'lucide-react';
import { ADMIN_ROUTES } from '@/constants/routes';

interface PremiumBotDetailHeaderProps {
  name: string;
  status: string;
  risk: string;
  id: string;  // This is the botId
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

// Utility function to get risk level badge UI
const getRiskBadge = (risk: string) => {
  switch (risk.toLowerCase()) {
    case 'low':
      return <Badge className="bg-blue-500">Low Risk</Badge>;
    case 'medium':
      return <Badge className="bg-yellow-500">Medium Risk</Badge>;
    case 'high':
      return <Badge className="bg-red-500">High Risk</Badge>;
    default:
      return <Badge variant="outline">{risk}</Badge>;
  }
};

const PremiumBotDetailHeader: React.FC<PremiumBotDetailHeaderProps> = ({
  name,
  status,
  risk,
  id
}) => {
  const navigate = useNavigate();

  const goBackToList = () => {
    navigate(ADMIN_ROUTES.PREMIUM_BOTS);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={goBackToList} className="text-white hover:text-white/80 hover:bg-white/10">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-white">{name}</h1>
        {getBotStatusBadge(status)}
        {getRiskBadge(risk)}
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
