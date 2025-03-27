import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "sonner";
import { PremiumBotStatsCards } from '@/components/admin/premium-bots/PremiumBotStatsCards';
import { PremiumBotsActions } from '@/components/admin/premium-bots/PremiumBotsActions';
import { PremiumBotsTable } from '@/components/admin/premium-bots/PremiumBotsTable';
import { PremiumBotsPagination } from '@/components/admin/premium-bots/PremiumBotsPagination';
import { AddPremiumBotDialog } from '@/components/admin/premium-bots/AddPremiumBotDialog';
import { BulkActionDialog } from '@/components/admin/premium-bots/BulkActionDialog';
import { BotStatus, BotType, BotRiskLevel } from '@/constants/botTypes';
import { PremiumBot } from '@/types';

const AdminPremiumBots = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isAddBotDialogOpen, setIsAddBotDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [selectedBots, setSelectedBots] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isBulkActionDialogOpen, setIsBulkActionDialogOpen] = useState(false);
  const [bulkAction, setBulkAction] = useState<'activate' | 'deactivate' | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [newBot, setNewBot] = useState({
    name: '',
    description: '',
    riskLevel: 'medium',
    exchange: 'binance',
    potentialProfit: '5-10%',
    maxDrawdown: '5',
    supportedAssets: ['BTC', 'ETH'],
    minCapital: '100',
    tradingStrategy: 'dca',
    timeframe: '1h',
    indicatorsUsed: '',
    featureAdvancedEntries: false,
    featureAutomaticSl: true,
    featureDynamicTp: true,
    featureSmartFilters: false,
    maxActivePositions: '3',
    maxLeverage: '3',
    isFeatured: false,
    isNew: false,
    isBestSeller: false
  });
  
  const bots: PremiumBot[] = [
    { 
      botId: 'PRE-001', 
      name: 'Premium DCA Bot',
      type: BotType.PREMIUM_BOT,
      status: BotStatus.ACTIVE,
      users: 48,
      profit: '+18.5%',
      createdDate: '10/02/2024',
      performanceLastMonth: '+12.3%',
      performanceAllTime: '+56.8%',
      risk: BotRiskLevel.MEDIUM,
      minCapital: '$500',
      subscribers: 48,
      lastUpdated: '15/02/2024',
      colorScheme: 'green',
      exchange: 'Binance',
      description: 'Premium bot for momentum trading'
    },
    { 
      botId: 'PRE-002', 
      name: 'Premium Swing Trader',
      type: BotType.PREMIUM_BOT,
      status: BotStatus.ACTIVE,
      users: 32,
      profit: '+14.3%',
      createdDate: '15/03/2024',
      performanceLastMonth: '+9.2%',
      performanceAllTime: '+41.5%',
      risk: BotRiskLevel.MEDIUM,
      minCapital: '$800',
      subscribers: 32,
      lastUpdated: '20/03/2024',
      colorScheme: 'blue',
      exchange: 'Bybit',
      description: 'Premium bot for momentum trading'
    },
    { 
      botId: 'PRE-003', 
      name: 'Premium Scalper Pro',
      type: BotType.PREMIUM_BOT,
      status: BotStatus.INACTIVE,
      users: 12,
      profit: '-2.1%',
      createdDate: '05/03/2024',
      performanceLastMonth: '-2.1%',
      performanceAllTime: '+15.8%',
      risk: BotRiskLevel.HIGH,
      minCapital: '$1000',
      subscribers: 12,
      lastUpdated: '10/03/2024',
      colorScheme: 'red',
      exchange: 'KuCoin',
      description: 'Premium bot for momentum trading'
    },
    { 
      botId: 'PRE-004', 
      name: 'Premium Grid Bot',
      type: BotType.PREMIUM_BOT,
      status: BotStatus.ACTIVE,
      users: 56,
      profit: '+9.7%',
      createdDate: '22/01/2024',
      performanceLastMonth: '+5.7%',
      performanceAllTime: '+35.2%',
      risk: BotRiskLevel.LOW,
      minCapital: '$300',
      subscribers: 56,
      lastUpdated: '25/01/2024',
      colorScheme: 'green',
      exchange: 'Binance',
      description: 'Premium bot for momentum trading'
    },
    { 
      botId: 'PRE-005', 
      name: 'Premium Crypto Master',
      type: BotType.PREMIUM_BOT,
      status: BotStatus.MAINTENANCE,
      users: 22,
      profit: '+7.8%',
      createdDate: '18/11/2023',
      performanceLastMonth: '+4.3%',
      performanceAllTime: '+28.9%',
      risk: BotRiskLevel.MEDIUM,
      minCapital: '$600',
      subscribers: 22,
      lastUpdated: '22/11/2023',
      colorScheme: 'purple',
      exchange: 'OKX',
      description: 'Premium bot for momentum trading'
    }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterClick = () => {
    if (!filterStatus) {
      setFilterStatus(BotStatus.ACTIVE);
    } else if (filterStatus === BotStatus.ACTIVE) {
      setFilterStatus(BotStatus.INACTIVE);
    } else if (filterStatus === BotStatus.INACTIVE) {
      setFilterStatus(BotStatus.MAINTENANCE);
    } else {
      setFilterStatus(null);
    }
  };

  const viewBotDetail = (botId: string) => {
    navigate(`/admin/premium-bots/${botId}`, { 
      state: { from: location.pathname } 
    });
  };
  
  const handleAddBot = () => {
    if (!newBot.name || !newBot.description) {
      toast.error("Vui lòng điền đầy đủ thông tin bot");
      return;
    }
    
    toast.success("Đã thêm Premium Bot mới thành công");
    setIsAddBotDialogOpen(false);
    
    setNewBot({
      name: '',
      description: '',
      riskLevel: 'medium',
      exchange: 'binance',
      potentialProfit: '5-10%',
      maxDrawdown: '5',
      supportedAssets: ['BTC', 'ETH'],
      minCapital: '100',
      tradingStrategy: 'dca',
      timeframe: '1h',
      indicatorsUsed: '',
      featureAdvancedEntries: false,
      featureAutomaticSl: true,
      featureDynamicTp: true,
      featureSmartFilters: false,
      maxActivePositions: '3',
      maxLeverage: '3',
      isFeatured: false,
      isNew: false,
      isBestSeller: false
    });
    
    setActiveTab('general');
  };

  const filteredBots = bots
    .filter(bot => 
      (searchTerm === '' || 
        bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bot.botId.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(bot => 
      (filterStatus === null || bot.status === filterStatus)
    );
  
  const handleCheckboxChange = (botId: string) => {
    setSelectedBots(prev => {
      if (prev.includes(botId)) {
        return prev.filter(id => id !== botId);
      } else {
        return [...prev, botId];
      }
    });
  };
  
  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedBots([]);
    } else {
      setSelectedBots(filteredBots.map(bot => bot.botId));
    }
    setSelectAll(!selectAll);
  };
  
  const clearSelections = () => {
    setSelectedBots([]);
    setSelectAll(false);
  };
  
  const exportToCSV = () => {
    let botsToExport = filteredBots;
    
    if (selectedBots.length > 0) {
      botsToExport = filteredBots.filter(bot => selectedBots.includes(bot.botId));
    }
    
    if (botsToExport.length === 0) {
      toast.error("Không có dữ liệu để xuất");
      return;
    }
    
    const csvHeader = ["ID", "Tên Bot", "Trạng thái", "Tài khoản", "Lợi nhuận", "Ngày tạo"];
    const csvRows = botsToExport.map(bot => [
      bot.botId,
      bot.name,
      bot.status,
      bot.users.toString(),
      bot.profit,
      bot.createdDate
    ]);
    
    const csvContent = [
      csvHeader.join(","),
      ...csvRows.map(row => row.join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `premium-bots-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`Đã xuất ${botsToExport.length} bot thành công`);
  };
  
  const exportToExcel = () => {
    let botsToExport = filteredBots;
    
    if (selectedBots.length > 0) {
      botsToExport = filteredBots.filter(bot => selectedBots.includes(bot.botId));
    }
    
    if (botsToExport.length === 0) {
      toast.error("Không có dữ liệu để xuất");
      return;
    }
    
    const tableHTML = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Bot</th>
            <th>Trạng thái</th>
            <th>Tài khoản</th>
            <th>Lợi nhuận</th>
            <th>Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          ${botsToExport.map(bot => `
            <tr>
              <td>${bot.botId}</td>
              <td>${bot.name}</td>
              <td>${bot.status}</td>
              <td>${bot.users}</td>
              <td>${bot.profit}</td>
              <td>${bot.createdDate}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    
    const blob = new Blob([tableHTML], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `premium-bots-export-${new Date().toISOString().split('T')[0]}.xls`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`Đã xuất ${botsToExport.length} bot thành công`);
  };
  
  const openBulkActionDialog = (action: 'activate' | 'deactivate') => {
    if (selectedBots.length === 0) {
      toast.error("Vui lòng chọn ít nhất một bot");
      return;
    }
    
    setBulkAction(action);
    setIsBulkActionDialogOpen(true);
  };
  
  const executeBulkAction = () => {
    if (!bulkAction || selectedBots.length === 0) {
      setIsBulkActionDialogOpen(false);
      return;
    }
    
    const actionText = bulkAction === 'activate' ? 'kích hoạt' : 'tạm dừng';
    toast.success(`Đã ${actionText} ${selectedBots.length} bot thành công`);
    
    setIsBulkActionDialogOpen(false);
    clearSelections();
  };

  const toggleFeatured = (botId: string) => {
    // Implement logic to toggle featured status
  };

  const toggleNew = (botId: string) => {
    // Implement logic to toggle new status
  };

  const toggleBestSeller = (botId: string) => {
    // Implement logic to toggle best seller status
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Quản lý Premium Bots</h1>
        <Button 
          className="bg-amber-500 hover:bg-amber-600 text-white"
          onClick={() => setIsAddBotDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm Premium Bot mới
        </Button>
      </div>

      <PremiumBotStatsCards bots={bots} />

      <Card className="border-zinc-800 bg-zinc-900 text-white">
        <CardHeader>
          <CardTitle>Danh sách Premium Bots</CardTitle>
          <CardDescription className="text-zinc-400">
            Quản lý tất cả Premium Bots trong hệ thống Trade Bot 365.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PremiumBotsActions 
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            selectedBots={selectedBots}
            onSearchChange={handleSearchChange}
            onFilterClick={handleFilterClick}
            clearSelections={clearSelections}
            exportToCSV={exportToCSV}
            exportToExcel={exportToExcel}
            openBulkActionDialog={openBulkActionDialog}
          />

          <PremiumBotsTable 
            bots={filteredBots}
            selectedBots={selectedBots}
            selectAll={selectAll}
            onSelectAll={handleSelectAllChange}
            onSelectBot={handleCheckboxChange}
            onViewBotDetail={viewBotDetail}
            onToggleFeatured={toggleFeatured}
            onToggleNew={toggleNew}
            onToggleBestSeller={toggleBestSeller}
          />

          <PremiumBotsPagination 
            totalItems={filteredBots.length}
            visibleItems={filteredBots.length}
          />
        </CardContent>
      </Card>
      
      <AddPremiumBotDialog 
        open={isAddBotDialogOpen}
        onOpenChange={setIsAddBotDialogOpen}
        onAddBot={handleAddBot}
        newBot={newBot}
        setNewBot={setNewBot}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <BulkActionDialog 
        open={isBulkActionDialogOpen}
        onOpenChange={setIsBulkActionDialogOpen}
        selectedBotsCount={selectedBots.length}
        bulkAction={bulkAction}
        onConfirm={executeBulkAction}
      />
    </div>
  );
};

export default AdminPremiumBots;
