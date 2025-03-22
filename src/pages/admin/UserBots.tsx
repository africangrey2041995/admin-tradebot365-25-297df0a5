import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-table"
import { UserBot } from '@/types/bot';
import { BotStatus } from '@/constants/botTypes';

interface UserBotColumn {
  accessorKey: string;
  header: string;
}

const columns: UserBotColumn[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'createdDate',
    header: 'Created Date',
  },
  {
    accessorKey: 'owner',
    header: 'Owner',
  },
  {
    accessorKey: 'accounts',
    header: 'Accounts',
  },
];

const mockUserBots = [
  {
    id: 'ub-001',
    name: 'My First Bot',
    status: BotStatus.ACTIVE,
    createdDate: '2023-08-15',
    owner: 'John Doe',
    accounts: 2,
    description: 'A simple bot for testing purposes',
    strategy: 'DCA',
    isActive: true,
    ownerId: 'user-001',
  },
  {
    id: 'ub-002',
    name: 'BTC Trader',
    status: BotStatus.ACTIVE,
    createdDate: '2023-09-10',
    owner: 'Jane Smith',
    accounts: 1,
    description: 'Trades BTC based on RSI',
    strategy: 'RSI',
    isActive: true,
    ownerId: 'user-002',
  },
  {
    id: 'ub-003',
    name: 'ETH Grid Bot',
    status: BotStatus.INACTIVE,
    createdDate: '2023-07-22',
    owner: 'Robert Johnson',
    accounts: 1,
    description: 'Grid trading bot for ETH',
    strategy: 'Grid',
    isActive: false,
    ownerId: 'user-003',
  },
  {
    id: 'ub-004',
    name: 'Auto Trader Pro',
    status: BotStatus.ACTIVE,
    createdDate: '2023-06-30',
    owner: 'Emma Wilson',
    accounts: 3,
    description: 'Advanced auto trading bot',
    strategy: 'AI',
    isActive: true,
    ownerId: 'user-004',
  },
  {
    id: 'ub-005',
    name: 'Altcoin Hunter',
    status: BotStatus.ACTIVE,
    createdDate: '2023-05-12',
    owner: 'Michael Brown',
    accounts: 2,
    description: 'Hunts for promising altcoins',
    strategy: 'Momentum',
    isActive: true,
    ownerId: 'user-005',
  }
];

const AdminUserBots = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredBots = mockUserBots.filter(bot =>
    bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bot.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addUserBot = () => {
    toast.success("Chức năng thêm User Bot đang được phát triển");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Quản lý User Bots</h1>
        <Button
          className="bg-amber-500 hover:bg-amber-600 text-white"
          onClick={addUserBot}
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm User Bot mới
        </Button>
      </div>

      <Card className="border-zinc-800 bg-zinc-900 text-white">
        <CardHeader>
          <CardTitle>Danh sách User Bots</CardTitle>
          <CardDescription className="text-zinc-400">
            Quản lý tất cả User Bots trong hệ thống Trade Bot 365.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-2">
            <Input
              type="text"
              placeholder="Tìm kiếm User Bots..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="max-w-md"
            />
          </div>
          <DataTable columns={columns} data={filteredBots} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserBots;
