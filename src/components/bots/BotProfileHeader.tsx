
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings, Trash, Power } from 'lucide-react';
import { toast } from 'sonner';

interface BotProfileHeaderProps {
  botId: string;
  status: string;
}

const BotProfileHeader = ({ botId, status }: BotProfileHeaderProps) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/bots');
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Bots
      </Button>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
          <Trash className="h-4 w-4" />
          <span>Delete Bot</span>
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Button>
        <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
          <Power className="h-4 w-4" />
          <span>{status === 'Active' ? 'Stop Bot' : 'Start Bot'}</span>
        </Button>
      </div>
    </div>
  );
};

export default BotProfileHeader;
