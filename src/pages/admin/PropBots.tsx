
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { PropBotStatsCards } from "@/components/admin/prop-bots/PropBotStatsCards";
import { PropBotActions } from "@/components/admin/prop-bots/PropBotActions";
import { PropBotsTable } from "@/components/admin/prop-bots/PropBotsTable";
import { mockPropBots } from '@/mocks/propBotsMock';
import { toast } from "sonner";
import AddPropBotDialog from '@/components/admin/prop-bots/AddPropBotDialog';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';
import { PropBot } from '@/types/bot';
import { BotStatus } from '@/constants/botTypes';
import { BulkActionDialog } from "@/components/admin/premium-bots/BulkActionDialog";

const PropBots: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [propBots, setPropBots] = useState(mockPropBots);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const navigate = useNavigate();
  const itemsPerPage = 10;

  // New state for selection and bulk actions
  const [selectedBots, setSelectedBots] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [bulkActionType, setBulkActionType] = useState<'activate' | 'deactivate' | null>(null);
  const [isBulkActionDialogOpen, setIsBulkActionDialogOpen] = useState(false);

  // Filter and pagination logic
  const filteredBots = propBots.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          bot.botId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bot.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBots = filteredBots.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBots.length / itemsPerPage);

  const refreshData = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Dữ liệu đã được làm mới");
    }, 800);
  };

  // Selection handlers
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedBots([]);
      setSelectAll(false);
    } else {
      setSelectedBots(currentBots.map(bot => bot.botId));
      setSelectAll(true);
    }
  };

  const handleSelectBot = (botId: string) => {
    if (selectedBots.includes(botId)) {
      setSelectedBots(selectedBots.filter(id => id !== botId));
      setSelectAll(false);
    } else {
      setSelectedBots([...selectedBots, botId]);
      if (selectedBots.length + 1 === currentBots.length) {
        setSelectAll(true);
      }
    }
  };

  const clearSelections = () => {
    setSelectedBots([]);
    setSelectAll(false);
  };

  // Bulk action handlers
  const openBulkActionDialog = (action: 'activate' | 'deactivate') => {
    setBulkActionType(action);
    setIsBulkActionDialogOpen(true);
  };

  const executeBulkAction = () => {
    if (!bulkActionType) return;
    
    const newStatus = bulkActionType === 'activate' ? BotStatus.ACTIVE : BotStatus.INACTIVE;
    const actionText = bulkActionType === 'activate' ? 'kích hoạt' : 'tạm dừng';
    
    // Update bot statuses in state
    setPropBots(prevBots => 
      prevBots.map(bot => 
        selectedBots.includes(bot.botId) 
          ? { ...bot, status: newStatus } 
          : bot
      )
    );
    
    toast.success(`Đã ${actionText} ${selectedBots.length} Prop Bot thành công`);
    setIsBulkActionDialogOpen(false);
    clearSelections();
  };

  const handleAddNewBot = () => {
    setIsAddDialogOpen(true);
  };

  // Fix: Update the type definition of handleAddSuccess to accept a PropBot parameter
  const handleAddSuccess = (newBot: PropBot) => {
    // In a real application, we would fetch the updated data from the API
    // For now, we'll just add the new bot to our local state and refresh
    setPropBots(prevBots => [newBot, ...prevBots]);
    toast.success(`Đã thêm bot ${newBot.name} vào hệ thống`);
    setIsAddDialogOpen(false);
  };

  const navigateToBotDetail = (botId: string) => {
    navigate(ADMIN_ROUTES.PROP_BOT_DETAIL(botId));
  };

  // Add toggling functions for bot tags
  const handleToggleFeatured = (botId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent navigation to detail page
    setPropBots(prevBots => 
      prevBots.map(bot => 
        bot.botId === botId 
          ? { ...bot, isFeatured: !bot.isFeatured } 
          : bot
      )
    );
    
    const bot = propBots.find(b => b.botId === botId);
    if (bot) {
      const action = bot.isFeatured ? "đã bỏ đánh dấu" : "đã đánh dấu";
      toast.success(`Bot ${action} là Nổi Bật`);
    }
  };

  const handleToggleNew = (botId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent navigation to detail page
    setPropBots(prevBots => 
      prevBots.map(bot => 
        bot.botId === botId 
          ? { ...bot, isNew: !bot.isNew } 
          : bot
      )
    );
    
    const bot = propBots.find(b => b.botId === botId);
    if (bot) {
      const action = bot.isNew ? "đã bỏ đánh dấu" : "đã đánh dấu";
      toast.success(`Bot ${action} là Mới`);
    }
  };

  const handleToggleBestSeller = (botId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent navigation to detail page
    setPropBots(prevBots => 
      prevBots.map(bot => 
        bot.botId === botId 
          ? { ...bot, isBestSeller: !bot.isBestSeller } 
          : bot
      )
    );
    
    const bot = propBots.find(b => b.botId === botId);
    if (bot) {
      const action = bot.isBestSeller ? "đã bỏ đánh dấu" : "đã đánh dấu";
      toast.success(`Bot ${action} là Bán Chạy`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Quản lý Prop Trading Bots</h1>
          <p className="text-zinc-400">
            Quản lý và cấu hình các Prop Trading Bots trong hệ thống
          </p>
        </div>
        <Button className="bg-tradebot text-zinc-900 hover:bg-tradebot/90" onClick={handleAddNewBot}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Thêm Prop Bot mới
        </Button>
      </div>

      <PropBotStatsCards bots={propBots} />

      <PropBotActions 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        isLoading={isLoading}
        refreshData={refreshData}
        selectedBots={selectedBots}
        clearSelections={clearSelections}
        openBulkActionDialog={openBulkActionDialog}
      />

      <PropBotsTable 
        currentBots={currentBots}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        onRowClick={navigateToBotDetail}
        onToggleFeatured={handleToggleFeatured}
        onToggleNew={handleToggleNew}
        onToggleBestSeller={handleToggleBestSeller}
        selectedBots={selectedBots}
        selectAll={selectAll}
        onSelectAll={handleSelectAll}
        onSelectBot={handleSelectBot}
      />

      <AddPropBotDialog 
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSuccess={handleAddSuccess}
      />

      <BulkActionDialog
        open={isBulkActionDialogOpen}
        onOpenChange={setIsBulkActionDialogOpen}
        selectedBotsCount={selectedBots.length}
        bulkAction={bulkActionType}
        onConfirm={executeBulkAction}
      />
    </div>
  );
};

export default PropBots;
