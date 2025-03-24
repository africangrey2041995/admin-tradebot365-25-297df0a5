
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Check,
  X,
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { PropBot } from '@/types';
import { BotType, BotRiskLevel, BotStatus, BOT_STATUS_DISPLAY, BOT_RISK_DISPLAY } from '@/constants/botTypes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ADMIN_ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';

// Mock data for admin prop bots - fixed to explicitly use BotType.PROP_BOT
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
  const [propBots, setPropBots] = useState<PropBot[]>(mockPropBots);
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingBot, setEditingBot] = useState<PropBot | null>(null);
  const [botToDelete, setBotToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEdit = (botId: string) => {
    const propBotToEdit = propBots.find(bot => bot.botId === botId);
    if (propBotToEdit) {
      setEditingBot(propBotToEdit);
      setEditModalOpen(true);
    }
  };

  const filteredPropBots = propBots.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bot.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = riskFilter === 'all' || bot.risk === riskFilter;
    const matchesStatus = statusFilter === 'all' || bot.status === statusFilter;
    
    return matchesSearch && matchesRisk && matchesStatus;
  });

  filteredPropBots.sort((a, b) => a.name.localeCompare(b.name));

  const handleDeleteConfirm = (botId: string) => {
    setIsDeleting(true);
    
    setTimeout(() => {
      const updatedBots = propBots.filter(bot => bot.botId !== botId);
      setPropBots(updatedBots);
      setIsDeleting(false);
      setDeleteModalOpen(false);
      
      toast.success("Bot xóa thành công", {
        description: `Prop Trading Bot với botId ${botId} đã được xóa thành công.`,
      });
    }, 1000);
  };

  const handleDelete = (botId: string) => {
    setBotToDelete(botId);
    setDeleteModalOpen(true);
  };

  const handleView = (botId: string) => {
    // Redirect to admin detail route instead of user route
    navigate(ADMIN_ROUTES.PROP_BOT_DETAIL(botId));
  };

  const refreshData = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Dữ liệu đã được làm mới!");
    }, 1000);
  };

  const createNewBot = (botData: Partial<PropBot>) => {
    setIsCreating(true);
    
    setTimeout(() => {
      const newBot: PropBot = {
        botId: `PROP-${Math.floor(Math.random() * 1000)}`,
        name: botData.name || 'New Prop Bot',
        description: botData.description || 'Mô tả mặc định cho prop bot mới.',
        type: BotType.PROP_BOT,
        status: botData.status || BotStatus.ACTIVE,
        exchange: botData.exchange || 'Unknown',
        risk: botData.risk || BotRiskLevel.MEDIUM,
        performanceLastMonth: botData.performanceLastMonth || '+0.0%',
        performanceAllTime: botData.performanceAllTime || '+0.0%',
        users: 0,
        minCapital: botData.minCapital || '$1,000',
        profit: botData.performanceLastMonth || '+0.0%',
        propFirm: botData.propFirm || 'Unknown',
        createdDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        maxDrawdown: botData.maxDrawdown || '5.0%',
        challengeDuration: botData.challengeDuration || '30 ngày',
        accountSizes: botData.accountSizes || ['$10K', '$25K', '$50K']
      };
      
      setPropBots([newBot, ...propBots]);
      setIsCreating(false);
      setCreateModalOpen(false);
      
      toast.success("Bot tạo thành công", {
        description: `Prop Trading Bot mới với botId ${newBot.botId} đã được tạo thành công.`,
      });
    }, 1000);
  };

  const updateExistingBot = (botData: PropBot) => {
    setIsUpdating(true);
    
    setTimeout(() => {
      const updatedBots = propBots.map(bot => 
        bot.botId === botData.botId ? { ...botData, lastUpdated: new Date().toISOString() } : bot
      );
      
      setPropBots(updatedBots);
      setIsUpdating(false);
      setEditModalOpen(false);
      
      toast.success("Bot cập nhật thành công", {
        description: `Thông tin Bot với botId ${botData.botId} đã được cập nhật thành công.`,
      });
    }, 1000);
  };

  const handleCreateSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const botData: Partial<PropBot> = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      exchange: formData.get('exchange') as string,
      risk: formData.get('risk') as BotRiskLevel,
      status: formData.get('status') as BotStatus,
      performanceLastMonth: formData.get('performanceLastMonth') as string,
      performanceAllTime: formData.get('performanceAllTime') as string,
      minCapital: formData.get('minCapital') as string,
      propFirm: formData.get('propFirm') as string,
      maxDrawdown: formData.get('maxDrawdown') as string,
      challengeDuration: formData.get('challengeDuration') as string,
      accountSizes: formData.getAll('accountSizes') as string[],
    };
    
    createNewBot(botData);
  };

  const handleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!editingBot) return;
    
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const botData: PropBot = {
      ...editingBot,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      exchange: formData.get('exchange') as string,
      risk: formData.get('risk') as BotRiskLevel,
      status: formData.get('status') as BotStatus,
      performanceLastMonth: formData.get('performanceLastMonth') as string,
      performanceAllTime: formData.get('performanceAllTime') as string,
      minCapital: formData.get('minCapital') as string,
      propFirm: formData.get('propFirm') as string,
      maxDrawdown: formData.get('maxDrawdown') as string,
      challengeDuration: formData.get('challengeDuration') as string,
      accountSizes: formData.getAll('accountSizes') as string[],
    };
    
    updateExistingBot(botData);
  };

  const getRiskLabel = (risk: string) => {
    return BOT_RISK_DISPLAY[risk as BotRiskLevel] || risk;
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const getStatusLabel = (status: string) => {
    return BOT_STATUS_DISPLAY[status as BotStatus] || status;
  };

  const generatePropBotRows = () => {
    return filteredPropBots.map((bot) => (
      <tr key={bot.botId} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
        <td className="px-4 py-3">
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${
              bot.status === BotStatus.ACTIVE ? 'bg-green-500' : 'bg-gray-300'
            }`} />
            <span className="font-medium">{bot.name}</span>
          </div>
        </td>
        <td className="px-4 py-3 text-sm">
          <Badge variant="outline">{bot.botId}</Badge>
        </td>
        <td className="px-4 py-3 hidden md:table-cell">
          <div className="line-clamp-2 text-sm">{bot.description}</div>
        </td>
        <td className="px-4 py-3 text-sm hidden lg:table-cell">
          <Badge className={getRiskColor(bot.risk)}>{getRiskLabel(bot.risk)}</Badge>
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
              <DropdownMenuItem onClick={() => handleEdit(bot.botId)}>
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
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Quản lý Prop Trading Bots</h1>
        <Button onClick={() => setCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Tạo Prop Bot Mới
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          type="search"
          placeholder="Tìm kiếm bot..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex gap-2">
          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Lọc theo rủi ro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả rủi ro</SelectItem>
              <SelectItem value={BotRiskLevel.LOW}>{getRiskLabel(BotRiskLevel.LOW)}</SelectItem>
              <SelectItem value={BotRiskLevel.MEDIUM}>{getRiskLabel(BotRiskLevel.MEDIUM)}</SelectItem>
              <SelectItem value={BotRiskLevel.HIGH}>{getRiskLabel(BotRiskLevel.HIGH)}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value={BotStatus.ACTIVE}>{getStatusLabel(BotStatus.ACTIVE)}</SelectItem>
              <SelectItem value={BotStatus.INACTIVE}>{getStatusLabel(BotStatus.INACTIVE)}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Danh sách Prop Trading Bots</CardTitle>
          <div className="flex items-center gap-2">
            <Badge>{filteredPropBots.length} Bot</Badge>
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
          <div className="overflow-x-auto rounded-md">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Tên Bot</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Bot ID</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden md:table-cell">Mô tả</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden lg:table-cell">Rủi ro</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Người dùng</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Hiệu suất</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <RefreshCw className="h-6 w-6 animate-spin text-primary mb-2" />
                        <span className="text-sm text-muted-foreground">Đang tải dữ liệu...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredPropBots.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <FileQuestion className="h-10 w-10 text-muted-foreground/50 mb-2" />
                        <span className="text-muted-foreground">Không tìm thấy Bot nào phù hợp</span>
                        <Button 
                          variant="link" 
                          size="sm" 
                          onClick={() => {
                            setSearchQuery('');
                            setRiskFilter('all');
                            setStatusFilter('all');
                          }}
                          className="mt-2"
                        >
                          Xóa tất cả bộ lọc
                        </Button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  generatePropBotRows()
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tạo Prop Trading Bot mới</DialogTitle>
            <DialogDescription>
              Nhập thông tin cho Bot Prop Trading mới. Bot sẽ được thêm vào danh sách và có thể được chỉnh sửa sau.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleCreateSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Tên Bot</Label>
                <Input type="text" id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="exchange">Sàn giao dịch</Label>
                <Input type="text" id="exchange" name="exchange" required />
              </div>
              <div>
                <Label htmlFor="risk">Mức độ rủi ro</Label>
                <Select name="risk" defaultValue={BotRiskLevel.MEDIUM}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn mức độ rủi ro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={BotRiskLevel.LOW}>{getRiskLabel(BotRiskLevel.LOW)}</SelectItem>
                    <SelectItem value={BotRiskLevel.MEDIUM}>{getRiskLabel(BotRiskLevel.MEDIUM)}</SelectItem>
                    <SelectItem value={BotRiskLevel.HIGH}>{getRiskLabel(BotRiskLevel.HIGH)}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Trạng thái</Label>
                <Select name="status" defaultValue={BotStatus.ACTIVE}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={BotStatus.ACTIVE}>{getStatusLabel(BotStatus.ACTIVE)}</SelectItem>
                    <SelectItem value={BotStatus.INACTIVE}>{getStatusLabel(BotStatus.INACTIVE)}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="performanceLastMonth">Hiệu suất tháng này</Label>
                <Input type="text" id="performanceLastMonth" name="performanceLastMonth" defaultValue="+0.0%" required />
              </div>
              <div>
                <Label htmlFor="performanceAllTime">Hiệu suất tổng thời gian</Label>
                <Input type="text" id="performanceAllTime" name="performanceAllTime" defaultValue="+0.0%" required />
              </div>
              <div>
                <Label htmlFor="minCapital">Vốn tối thiểu</Label>
                <Input type="text" id="minCapital" name="minCapital" defaultValue="$1,000" required />
              </div>
              <div>
                <Label htmlFor="propFirm">Prop Firm</Label>
                <Input type="text" id="propFirm" name="propFirm" required />
              </div>
              <div>
                <Label htmlFor="maxDrawdown">Max Drawdown</Label>
                <Input type="text" id="maxDrawdown" name="maxDrawdown" defaultValue="5.0%" required />
              </div>
              <div>
                <Label htmlFor="challengeDuration">Challenge Duration</Label>
                <Input type="text" id="challengeDuration" name="challengeDuration" defaultValue="30 ngày" required />
              </div>
              <div className="col-span-2">
                <Label htmlFor="accountSizes">Account Sizes</Label>
                <Input type="text" id="accountSizes" name="accountSizes" defaultValue="$10K, $25K, $50K" required />
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea id="description" name="description" className="min-h-[80px]" required />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
                Hủy
              </Button>
              <Button type="submit" disabled={isCreating}>
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang tạo...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Tạo Bot
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa Prop Trading Bot</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin cho Bot Prop Trading với botId {editingBot?.botId}.
            </DialogDescription>
          </DialogHeader>
          
          {editingBot && (
            <form onSubmit={handleEditSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Tên Bot</Label>
                  <Input type="text" id="name" name="name" defaultValue={editingBot.name} required />
                </div>
                <div>
                  <Label htmlFor="exchange">Sàn giao dịch</Label>
                  <Input type="text" id="exchange" name="exchange" defaultValue={editingBot.exchange} required />
                </div>
                <div>
                  <Label htmlFor="risk">Mức độ rủi ro</Label>
                  <Select name="risk" defaultValue={editingBot.risk}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn mức độ rủi ro" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={BotRiskLevel.LOW}>{getRiskLabel(BotRiskLevel.LOW)}</SelectItem>
                      <SelectItem value={BotRiskLevel.MEDIUM}>{getRiskLabel(BotRiskLevel.MEDIUM)}</SelectItem>
                      <SelectItem value={BotRiskLevel.HIGH}>{getRiskLabel(BotRiskLevel.HIGH)}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select name="status" defaultValue={editingBot.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={BotStatus.ACTIVE}>{getStatusLabel(BotStatus.ACTIVE)}</SelectItem>
                      <SelectItem value={BotStatus.INACTIVE}>{getStatusLabel(BotStatus.INACTIVE)}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="performanceLastMonth">Hiệu suất tháng này</Label>
                  <Input type="text" id="performanceLastMonth" name="performanceLastMonth" defaultValue={editingBot.performanceLastMonth} required />
                </div>
                <div>
                  <Label htmlFor="performanceAllTime">Hiệu suất tổng thời gian</Label>
                  <Input type="text" id="performanceAllTime" name="performanceAllTime" defaultValue={editingBot.performanceAllTime} required />
                </div>
                <div>
                  <Label htmlFor="minCapital">Vốn tối thiểu</Label>
                  <Input type="text" id="minCapital" name="minCapital" defaultValue={editingBot.minCapital} required />
                </div>
                <div>
                  <Label htmlFor="propFirm">Prop Firm</Label>
                  <Input type="text" id="propFirm" name="propFirm" defaultValue={editingBot.propFirm} required />
                </div>
                <div>
                  <Label htmlFor="maxDrawdown">Max Drawdown</Label>
                  <Input type="text" id="maxDrawdown" name="maxDrawdown" defaultValue={editingBot.maxDrawdown} required />
                </div>
                <div>
                  <Label htmlFor="challengeDuration">Challenge Duration</Label>
                  <Input type="text" id="challengeDuration" name="challengeDuration" defaultValue={editingBot.challengeDuration} required />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="accountSizes">Account Sizes</Label>
                  <Input type="text" id="accountSizes" name="accountSizes" defaultValue={editingBot.accountSizes?.join(', ')} required />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea id="description" name="description" className="min-h-[80px]" defaultValue={editingBot.description} required />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang cập nhật...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Cập nhật Bot
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn xóa Bot này?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Bot sẽ bị xóa vĩnh viễn khỏi hệ thống và tất cả người dùng sẽ mất quyền truy cập vào nó.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteConfirm(botToDelete)}
              className="bg-red-600 text-white hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xóa...
                </>
              ) : (
                <>
                  <Trash className="mr-2 h-4 w-4" />
                  Xóa Bot
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPropBots;
