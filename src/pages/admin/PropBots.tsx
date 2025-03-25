
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { PropBotStatsCards } from "@/components/admin/prop-bots/PropBotStatsCards";
import { PropBotActions } from "@/components/admin/prop-bots/PropBotActions";
import { PropBotsTable } from "@/components/admin/prop-bots/PropBotsTable";
import { mockPropBots } from '@/mocks/propBotsMock';

const PropBots: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  // Filter and pagination logic
  const filteredBots = mockPropBots.filter(bot => {
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
    }, 800);
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
        <Button className="bg-tradebot text-zinc-900 hover:bg-tradebot/90" onClick={() => console.log('Add new prop bot')}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Thêm Prop Bot mới
        </Button>
      </div>

      <PropBotStatsCards bots={mockPropBots} />

      <PropBotActions 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        isLoading={isLoading}
        refreshData={refreshData}
      />

      <PropBotsTable 
        currentBots={currentBots}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default PropBots;
