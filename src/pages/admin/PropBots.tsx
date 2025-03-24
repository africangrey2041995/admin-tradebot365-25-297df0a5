import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  RefreshCw, 
  Plus, 
  Loader2,
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ADMIN_ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';
import { PropBot } from '@/types';
import { BotType, BotRiskLevel, BotStatus } from '@/constants/botTypes';
import AdminLayout from '@/components/admin/AdminLayout';
import PropBotsTable from '@/components/admin/tables/PropBotsTable';
import DeleteConfirmationDialog from '@/components/admin/dialogs/DeleteConfirmationDialog';
import PropBotIdBadge from '@/components/admin/badges/PropBotIdBadge';
import PropBotStatusBadge from '@/components/admin/badges/PropBotStatusBadge';
import PropBotRiskBadge from '@/components/admin/badges/PropBotRiskBadge';

const mockPropBots: PropBot[] = [
  {
    botId: 'PROP-001',
    name: 'FTMO Challenger',
    description: 'Bot đặc biệt thiết kế để vượt qua FTMO Challenge với tỷ lệ thành công cao.',
    type: BotType.PROP_BOT,
    status: BotStatus.ACTIVE,
    exchange: 'FTMO',
    risk: BotRiskLevel.MEDIUM,
    performanceLastMonth: '+8.5%',
    performanceAllTime: '+32.7%',
    users: 42,
    minCapital: '$5,000',
    profit: '+8.5%',
    propFirm: 'FTMO',
    createdDate: '2023-08-15',
    lastUpdated: '2023-10-05',
    maxDrawdown: '4.2%',
    challengeDuration: '30 ngày',
    accountSizes: ['$10K', '$25K', '$50K', '$100K']
  },
  {
    botId: 'PROP-002',
    name: 'FundedNext Master',
    description: 'Bot chuyên biệt cho FundedNext, tối ưu hóa chiến lược để vượt qua các bài kiểm tra với hiệu suất cao nhất.',
    type: BotType.PROP_BOT,
    status: BotStatus.ACTIVE,
    exchange: 'FundedNext',
    risk: BotRiskLevel.LOW,
    performanceLastMonth: '+6.2%',
    performanceAllTime: '+28.5%',
    users: 37,
    minCapital: '$3,000',
    profit: '+6.2%',
    propFirm: 'FundedNext',
    createdDate: '2023-07-20',
    lastUpdated: '2023-10-10',
    maxDrawdown: '3.8%',
    challengeDuration: '45 ngày',
    accountSizes: ['$15K', '$30K', '$50K', '$100K', '$200K']
  },
  {
    botId: 'PROP-003',
    name: 'Coinstrat Challenge Bot',
    description: 'Bot tối ưu cho Coinstrat Pro, sử dụng các chiến lược đặc biệt phù hợp với quy tắc giao dịch của nền tảng.',
    type: BotType.PROP_BOT,
    status: BotStatus.ACTIVE,
    exchange: 'Coinstrat Pro',
    risk: BotRiskLevel.HIGH,
    performanceLastMonth: '+12.8%',
    performanceAllTime: '+45.2%',
    users: 28,
    minCapital: '$2,000',
    profit: '+12.8%',
    propFirm: 'Coinstrat Pro',
    createdDate: '2023-09-05',
    lastUpdated: '2023-10-15',
    maxDrawdown: '6.5%',
    challengeDuration: '21 ngày',
    accountSizes: ['$5K', '$10K', '$25K', '$50K']
  },
  {
    botId: 'PROP-004',
    name: 'Universal Prop Trader',
    description: 'Bot đa năng thích ứng với nhiều nền tảng prop trading khác nhau, phù hợp cho người mới bắt đầu.',
    type: BotType.PROP_BOT,
    status: BotStatus.ACTIVE,
    exchange: 'Multiple',
    risk: BotRiskLevel.MEDIUM,
    performanceLastMonth: '+7.5%',
    performanceAllTime: '+23.8%',
    users: 54,
    minCapital: '$1,000',
    profit: '+7.5%',
    propFirm: 'Multiple',
    createdDate: '2023-06-10',
    lastUpdated: '2023-10-12',
    maxDrawdown: '5.0%',
    challengeDuration: 'Varies',
    accountSizes: ['Varies by firm']
  },
];

const AdminPropBots = () => {
  const navigate = useNavigate();
  const [propBots, setPropBots] = useState<PropBot[]>(mockPropBots);
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [botToDelete, setBotToDelete] = useState<string | null>(null);

  const filteredPropBots = propBots.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bot.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = riskFilter === 'all' || bot.risk === riskFilter;
    const matchesStatus = statusFilter === 'all' || bot.status === statusFilter;
    
    return matchesSearch && matchesRisk && matchesStatus;
  });

  filteredPropBots.sort((a, b) => a.name.localeCompare(b.name));

  const handleDeleteConfirm = () => {
    if (!botToDelete) return;
    
    const updatedBots = propBots.filter(bot => bot.botId !== botToDelete);
    setPropBots(updatedBots);
    setDeleteModalOpen(false);
    
    toast.success("Bot xóa thành công", {
      description: `Prop Trading Bot với botId ${botToDelete} đã được xóa thành công.`,
    });
    
    setBotToDelete(null);
  };

  const handleDelete = (botId: string) => {
    setBotToDelete(botId);
    setDeleteModalOpen(true);
  };

  const handleView = (botId: string) => {
    navigate(ADMIN_ROUTES.PROP_BOT_DETAIL(botId));
  };

  const handleEdit = (botId: string) => {
    toast.info("Tính năng đang được phát triển");
  };

  const refreshData = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Dữ liệu đã được làm mới!");
    }, 1000);
  };

  const handleCreateNewBot = () => {
    toast.info("Tính năng đang được phát triển");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Quản lý Prop Trading Bots</h1>
          <Button onClick={handleCreateNewBot}>
            <Plus className="mr-2 h-4 w-4" />
            Tạo Prop Bot Mới
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              type="search"
              placeholder="Tìm kiếm theo tên hoặc mô tả..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Mức độ rủi ro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả rủi ro</SelectItem>
                <SelectItem value={BotRiskLevel.LOW}>Thấp</SelectItem>
                <SelectItem value={BotRiskLevel.MEDIUM}>Trung bình</SelectItem>
                <SelectItem value={BotRiskLevel.HIGH}>Cao</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value={BotStatus.ACTIVE}>Hoạt động</SelectItem>
                <SelectItem value={BotStatus.INACTIVE}>Không hoạt động</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Danh sách Prop Trading Bots</CardTitle>
              <CardDescription>
                Quản lý các Prop Trading Bots trên hệ thống
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">
                {filteredPropBots.length} Bot
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={refreshData}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <PropBotsTable 
                bots={filteredPropBots}
                isLoading={isLoading}
                onViewBot={handleView}
                onEditBot={handleEdit}
                onDeleteBot={handleDelete}
              />
            </div>
          </CardContent>
        </Card>

        <DeleteConfirmationDialog
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Xác nhận xóa Bot"
          description="Bạn có chắc chắn muốn xóa bot này? Thao tác này không thể hoàn tác."
        />
      </div>
    </AdminLayout>
  );
};

export default AdminPropBots;
