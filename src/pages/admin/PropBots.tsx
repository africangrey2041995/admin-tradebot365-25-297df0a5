
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw, 
  Plus, 
  Edit, 
  Trash, 
  Eye,
  MoreHorizontal,
  FileQuestion,
  Loader2,
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ADMIN_ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';
import { PropBot } from '@/types';
import { BotType, BotRiskLevel, BotStatus, BOT_STATUS_DISPLAY, BOT_RISK_DISPLAY } from '@/constants/botTypes';
import AdminLayout from '@/components/admin/AdminLayout';

// Mocking admin prop bots data
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

  const handleDeleteConfirm = (botId: string) => {
    // In a real application, you would make an API call here to delete the bot
    const updatedBots = propBots.filter(bot => bot.botId !== botId);
    setPropBots(updatedBots);
    setDeleteModalOpen(false);
    
    toast.success("Bot xóa thành công", {
      description: `Prop Trading Bot với botId ${botId} đã được xóa thành công.`,
    });
  };

  const handleDelete = (botId: string) => {
    setBotToDelete(botId);
    setDeleteModalOpen(true);
  };

  const handleView = (botId: string) => {
    navigate(ADMIN_ROUTES.PROP_BOT_DETAIL(botId));
  };

  const refreshData = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Dữ liệu đã được làm mới!");
    }, 1000);
  };

  const getBotStatusBadge = (status: BotStatus) => {
    const statusClass = status === BotStatus.ACTIVE 
      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      : "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400";
    
    return (
      <Badge variant="outline" className={statusClass}>
        {BOT_STATUS_DISPLAY[status]}
      </Badge>
    );
  };

  const getRiskBadge = (risk: BotRiskLevel) => {
    let riskClass = "";
    
    switch(risk) {
      case BotRiskLevel.LOW:
        riskClass = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
        break;
      case BotRiskLevel.MEDIUM:
        riskClass = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
        break;
      case BotRiskLevel.HIGH:
        riskClass = "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
        break;
    }
    
    return (
      <Badge variant="outline" className={riskClass}>
        {BOT_RISK_DISPLAY[risk]}
      </Badge>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Quản lý Prop Trading Bots</h1>
          <Button onClick={() => toast.info("Tính năng đang được phát triển")}>
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
                <SelectItem value={BotRiskLevel.LOW}>{BOT_RISK_DISPLAY[BotRiskLevel.LOW]}</SelectItem>
                <SelectItem value={BotRiskLevel.MEDIUM}>{BOT_RISK_DISPLAY[BotRiskLevel.MEDIUM]}</SelectItem>
                <SelectItem value={BotRiskLevel.HIGH}>{BOT_RISK_DISPLAY[BotRiskLevel.HIGH]}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value={BotStatus.ACTIVE}>{BOT_STATUS_DISPLAY[BotStatus.ACTIVE]}</SelectItem>
                <SelectItem value={BotStatus.INACTIVE}>{BOT_STATUS_DISPLAY[BotStatus.INACTIVE]}</SelectItem>
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
              <Badge variant="outline">{filteredPropBots.length} Bot</Badge>
              <Button
                variant="outline"
                size="icon"
                onClick={refreshData}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Đang tải dữ liệu...</span>
                </div>
              ) : filteredPropBots.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileQuestion className="h-12 w-12 text-muted-foreground opacity-30 mb-2" />
                  <h3 className="text-lg font-medium">Không tìm thấy bot nào</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Thử thay đổi bộ lọc tìm kiếm hoặc tạo một bot mới.
                  </p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Tên Bot</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Bot ID</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Prop Firm</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Trạng thái</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Rủi ro</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Người dùng</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Hiệu suất</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPropBots.map((bot) => (
                      <tr key={bot.botId} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-4 py-3">
                          <span className="font-medium">{bot.name}</span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <Badge variant="outline">{bot.botId}</Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {bot.propFirm}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {getBotStatusBadge(bot.status)}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {getRiskBadge(bot.risk)}
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          {bot.users}
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <div className={`font-medium ${parseFloat(bot.profit) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {bot.profit}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-5 w-5" />
                                <span className="sr-only">Menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleView(bot.botId)}>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>Xem chi tiết</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.info("Tính năng đang được phát triển")}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Chỉnh sửa</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleDelete(bot.botId)} className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Xóa</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </CardContent>
        </Card>

        {deleteModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg max-w-md w-full">
              <h3 className="text-lg font-semibold mb-2">Xác nhận xóa Bot</h3>
              <p className="text-muted-foreground mb-4">
                Bạn có chắc chắn muốn xóa bot này? Thao tác này không thể hoàn tác.
              </p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
                  Hủy
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => botToDelete && handleDeleteConfirm(botToDelete)}
                >
                  Xóa
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminPropBots;
