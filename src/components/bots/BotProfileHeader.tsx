
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings, Trash, Power } from 'lucide-react';
import { toast } from 'sonner';
import EditBotDialog from './EditBotDialog';
import { BotCardProps } from './BotCard';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface BotProfileHeaderProps {
  botId: string;
  status: string;
  botDetails: BotCardProps;
  onUpdateBot: (updatedBot: Partial<BotCardProps>) => void;
}

const BotProfileHeader = ({ botId, status, botDetails, onUpdateBot }: BotProfileHeaderProps) => {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const handleBack = () => {
    navigate('/bots');
  };

  const handleDeleteBot = () => {
    // Here you would implement the actual deletion logic
    console.log(`Deleting bot: ${botId}`);
    
    // Show success toast
    toast.success(`Bot ${botId} has been deleted`);
    
    // Navigate back to bots page
    navigate('/bots');
  };

  const handleSaveBot = (updatedBot: Partial<BotCardProps>) => {
    onUpdateBot(updatedBot);
    toast.success('Bot settings updated successfully');
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Bots
      </Button>
      
      <div className="flex items-center gap-2">
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
              <Trash className="h-4 w-4" />
              <span>Delete Bot</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this bot?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the bot
                and remove all of its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteBot}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete Bot
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Button>
        <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
          <Power className="h-4 w-4" />
          <span>{status === 'Active' ? 'Stop Bot' : 'Start Bot'}</span>
        </Button>
      </div>

      <EditBotDialog 
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        bot={botDetails}
        onSave={handleSaveBot}
      />
    </div>
  );
};

export default BotProfileHeader;
