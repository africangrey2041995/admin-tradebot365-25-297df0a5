import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreHorizontal, Play, Pause, Settings, Trash2, Plus, Eye, Download, FileDown, FileSpreadsheet, FileX, Check } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useNavigate, useLocation } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { PropBot } from '@/types/admin-types';
import { BotType, BotStatus } from '@/constants/botTypes';
import * as XLSX from 'xlsx';

const AdminPropBots = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isAddBotDialogOpen, setIsAddBotDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [selectedBots, setSelectedBots] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const totalBots = 5;
  const activeBots = 3;
  const inactiveBots = 2;
  const totalAccounts = 170;
  const averageAccountsPerBot = 34;
  const performanceRate = "9.6%";
  const topPerformingRatio = "4 / 5";
  
  const [newBot, setNewBot] = useState({
    name: '',
    description: '',
    riskLevel: 'low',
    propFirm: 'coinstrat_pro',
    maxDrawdown: '5',
    targetProfit: '10',
    accountSizes: ['10k', '25k', '50k', '100k'],
    challengeType: 'one_phase',
    tradingWindow: '30',
    timeframe: '1h',
    tradingHours: 'all_day',
    maxDailyDrawdown: '2',
    tradingStrategy: 'risk_managed',
    enableWeekendTrading: false,
    enableNewsPause: true,
    enableVolatilityFilter: true,
    tradingAssets: 'forex_crypto',
    supportShort: true,
    supportLong: true
  });
  
  const propBots: PropBot[] = [
    {
      id: 'ptb-001',
      name: 'FTMO Challenge Bot',
      status: BotStatus.ACTIVE,
      createdDate: '2023-08-15',
      users: 25,
      profit: '+8.2%',
      type: BotType.PROP_BOT,
      propFirm: 'FTMO',
      performanceLastMonth: '+5.1%', 
      performanceAllTime: '+22.4%',
      minCapital: '$10,000',
      description: 'Specialized bot for FTMO challenges',
      lastUpdated: '2023-08-25'
    },
    {
      id: 'ptb-002',
      name: 'FTMO Challenge Bot - Aggressive',
      status: BotStatus.ACTIVE,
      createdDate: '2023-09-10',
      users: 15,
      profit: '+12.5%',
      type: BotType.PROP_BOT,
      propFirm: 'FTMO',
      performanceLastMonth: '+8.2%',
      performanceAllTime: '+35.7%',
      minCapital: '$25,000',
      description: 'Aggressive strategy for FTMO challenges',
      lastUpdated: '2023-09-20'
    },
    {
      id: 'ptb-003',
      name: 'FundedNext Challenge Bot',
      status: BotStatus.MAINTENANCE,
      createdDate: '2023-07-22',
      users: 18,
      profit: '+6.8%',
      type: BotType.PROP_BOT,
      propFirm: 'FundedNext',
      performanceLastMonth: '+3.5%',
      performanceAllTime: '+18.2%',
      minCapital: '$15,000',
      description: 'Optimized for FundedNext evaluation phases',
      lastUpdated: '2023-07-30'
    },
    {
      id: 'ptb-004',
      name: 'Coinstrat Pro Challenge Bot',
      status: BotStatus.INACTIVE,
      createdDate: '2023-06-30',
      users: 8,
      profit: '+3.2%',
      type: BotType.PROP_BOT,
      propFirm: 'Coinstrat Pro',
      performanceLastMonth: '+1.2%',
      performanceAllTime: '+7.5%',
      minCapital: '$5,000',
      description: 'Entry-level bot for Coinstrat Pro challenges',
      lastUpdated: '2023-07-05'
    }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterClick = () => {
    if (!filterStatus) {
      setFilterStatus('active');
    } else if (filterStatus === 'active') {
      setFilterStatus('inactive');
    } else if (filterStatus === 'inactive') {
      setFilterStatus('maintenance');
    } else {
      setFilterStatus(null);
    }
  };

  const viewBotDetail = (botId: string) => {
    navigate(`/admin/prop-bots/${botId}`, { 
      state: { from: location.pathname } 
    });
  };
  
  const handleAddBot = () => {
    if (!newBot.name || !newBot.description) {
      toast.error("Vui lòng điền đầy đủ thông tin bot");
      return;
    }
    
    toast.success("Đã thêm Prop Trading Bot mới thành công");
    setIsAddBotDialogOpen(false);
    
    setNewBot({
      name: '',
      description: '',
      riskLevel: 'low',
      propFirm: 'coinstrat_pro',
      maxDrawdown: '5',
      targetProfit: '10',
      accountSizes: ['10k', '25k', '50k', '100k'],
      challengeType: 'one_phase',
      tradingWindow: '30',
      timeframe: '1h',
      tradingHours: 'all_day',
      maxDailyDrawdown: '2',
      tradingStrategy: 'risk_managed',
      enableWeekendTrading: false,
      enableNewsPause: true,
      enableVolatilityFilter: true,
      tradingAssets: 'forex_crypto',
      supportShort: true,
      supportLong: true
    });
    
    setActiveTab('general');
  };

  const toggleAccountSize = (size: string) => {
    if (newBot.accountSizes.includes(size)) {
      setNewBot({
        ...newBot, 
        accountSizes: newBot.accountSizes.filter(s => s !== size)
      });
    } else {
      setNewBot({
        ...newBot, 
        accountSizes: [...newBot.accountSizes, size]
      });
    }
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    
    if (newSelectAll) {
      setSelectedBots(filteredBots.map(bot => bot.id));
    } else {
      setSelectedBots([]);
    }
  };

  const handleSelectBot = (botId: string) => {
    setSelectedBots(prev => {
      if (prev.includes(botId)) {
        return prev.filter(id => id !== botId);
      } else {
        return [...prev, botId];
      }
    });
  };

  const handleBulkAction = (action: 'activate' | 'deactivate') => {
    if (selectedBots.length === 0) {
      toast.error("Vui lòng chọn ít nhất một bot");
      return;
    }

    const statusMessage = action === 'activate' ? 'kích hoạt' : 'tạm dừng';
    
    toast.success(
      `Đã ${statusMessage} ${selectedBots.length} bot`,
      { description: `Các bot đã được ${statusMessage} thành công` }
    );

    // In a real app, we would update the status of the selected bots here
  };

  const handleExportData = (format: 'excel' | 'csv') => {
    const botsToExport = selectedBots.length > 0 
      ? filteredBots.filter(bot => selectedBots.includes(bot.id))
      : filteredBots;
    
    if (botsToExport.length === 0) {
      toast.error("Không có dữ liệu để xuất");
      return;
    }

    // Define headers for export
    const headers = ["ID", "Tên Bot", "Trạng thái", "Loại", "Tài khoản", "Lợi nhuận", "Ngày tạo"];
    
    // Map status to Vietnamese
    const translateStatus = (status: string): string => {
      switch(status) {
        case 'active': return 'Hoạt động';
        case 'inactive': return 'Tạm dừng';
        case 'maintenance': return 'Bảo trì';
        default: return status;
      }
    };
    
    // Format data for export
    const exportData = botsToExport.map(bot => [
      bot.id,
      bot.name,
      translateStatus(bot.status),
      bot.type || 'N/A',
      bot.users.toString(),
      bot.profit,
      bot.createdDate
    ]);
    
    if (format === 'csv') {
      // Create CSV content
      const csvContent = [
        headers.join(','),
        ...exportData.map(row => row.join(','))
      ].join('\n');
      
      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `prop-bots-${new Date().toISOString().slice(0, 10)}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Create worksheet for Excel
      const worksheet = XLSX.utils.aoa_to_sheet([headers, ...exportData]);
      
      // Create workbook and add the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Prop Bots');
      
      // Generate Excel file and download
      XLSX.writeFile(workbook, `prop-bots-${new Date().toISOString().slice(0, 10)}.xlsx`);
    }
    
    toast.success(
      `Đã xuất ${botsToExport.length} bot ra file ${format.toUpperCase()}`,
      { description: `Dữ liệu đã được xuất thành công` }
    );
  };

  const filteredBots = propBots
    .filter(bot => 
      (searchTerm === '' || 
        bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bot.id.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(bot => 
      (filterStatus === null || bot.status === filterStatus)
    );
    
  React.useEffect(() => {
    if (filteredBots.length > 0 && selectedBots.length === filteredBots.length &&
      filteredBots.every(bot => selectedBots.includes(bot.id))) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedBots, filteredBots]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Quản lý Prop Trading Bots</h1>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setIsAddBotDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm Prop Bot mới
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardContent className="p-6">
            <p className="text-zinc-400 text-sm">Tổng Bot</p>
            <h2 className="text-4xl font-bold mt-2 mb-4">{totalBots}</h2>
            
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-green-500">Hoạt động</p>
                <p className="text-2xl font-semibold mt-1">{activeBots}</p>
              </div>
              <div>
                <p className="text-yellow-500">Không hoạt động</p>
                <p className="text-2xl font-semibold mt-1">{inactiveBots}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardContent className="p-6">
            <p className="text-zinc-400 text-sm">Tài khoản</p>
            <h2 className="text-4xl font-bold mt-2 mb-4">{totalAccounts}</h2>
            
            <div>
              <p className="text-zinc-400 text-sm">Bình quân mỗi bot</p>
              <p className="text-2xl font-semibold mt-1">{averageAccountsPerBot}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardContent className="p-6">
            <p className="text-zinc-400 text-sm">Hiệu suất</p>
            <h2 className="text-4xl font-bold mt-2 mb-4 text-green-500">{performanceRate}</h2>
            
            <div>
              <p className="text-zinc-400 text-sm">Bot hiệu quả</p>
              <p className="text-2xl font-semibold mt-1">{topPerformingRatio}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-zinc-800 bg-zinc-900 text-white">
        <CardHeader>
          <CardTitle>Danh sách Prop Trading Bots</CardTitle>
          <CardDescription className="text-zinc-400">
            Quản lý tất cả Prop Trading Bots trong hệ thống Trade Bot 365.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:items-center gap-4">
              <div className="relative w-full sm:max-w-[400px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                <Input 
                  placeholder="Tìm kiếm Bot..." 
                  className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <Button 
                variant="outline" 
                className={`border-zinc-700 ${filterStatus ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}
                onClick={handleFilterClick}
              >
                <Filter className="h-4 w-4 mr-2" />
                {filterStatus ? `Lọc: ${filterStatus}` : 'Lọc'}
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {selectedBots.length > 0 ? (
                <>
                  <Button 
                    variant="outline" 
                    className="border-zinc-700 text-green-400 hover:text-green-300"
                    onClick={() => handleBulkAction('activate')}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Kích hoạt
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-zinc-700 text-amber-400 hover:text-amber-300"
                    onClick={() => handleBulkAction('deactivate')}
                  >
                    <Pause className="h-4 w-4 mr-2" />
                    Tạm dừng
                  </Button>
                </>
              ) : null}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="border-zinc-700 text-zinc-400"
                  >
                    <FileDown className="h-4 w-4 mr-2" />
                    Xuất dữ liệu
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-900 text-white">
                  <DropdownMenuLabel>Xuất d�� liệu</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-zinc-800" />
                  <DropdownMenuItem 
                    className="focus:bg-zinc-800 cursor-pointer"
                    onClick={() => handleExportData('excel')}
                  >
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    <span>Xuất Excel</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="focus:bg-zinc-800 cursor-pointer"
                    onClick={() => handleExportData('csv')}
                  >
                    <FileX className="mr-2 h-4 w-4" />
                    <span>Xuất CSV</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800">
                  <TableHead className="text-zinc-400 w-10">
                    <Checkbox 
                      className="border-zinc-600"
                      checked={selectAll && filteredBots.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-zinc-400 w-28">ID</TableHead>
                  <TableHead className="text-zinc-400">Tên Bot</TableHead>
                  <TableHead className="text-zinc-400">Trạng thái</TableHead>
                  <TableHead className="text-zinc-400">Loại</TableHead>
                  <TableHead className="text-zinc-400 text-right">Tài khoản</TableHead>
                  <TableHead className="text-zinc-400 text-right">Lợi nhuận</TableHead>
                  <TableHead className="text-zinc-400">Ngày tạo</TableHead>
                  <TableHead className="text-zinc-400 text-right">Tác vụ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBots.length > 0 ? (
                  filteredBots.map((bot) => (
                    <TableRow key={bot.id} className="border-zinc-800">
                      <TableCell>
                        <Checkbox
                          className="border-zinc-600"
                          checked={selectedBots.includes(bot.id)}
                          onCheckedChange={() => handleSelectBot(bot.id)}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-xs text-zinc-400">{bot.id}</TableCell>
                      <TableCell className="font-medium">{bot.name}</TableCell>
                      <TableCell>
                        <BotStatusBadge status={bot.status} />
                      </TableCell>
                      <TableCell>{bot.type}</TableCell>
                      <TableCell className="text-right">{bot.users}</TableCell>
                      <TableCell className={`text-right ${bot.profit.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {bot.profit}
                      </TableCell>
                      <TableCell>{bot.createdDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-900 text-white">
                            <DropdownMenuLabel>Tác vụ</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-zinc-800" />
                            <DropdownMenuItem className="focus:bg-zinc-800" onClick={() => viewBotDetail(bot.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>Xem chi tiết</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-zinc-800">
                              <Settings className="mr-2 h-4 w-4" />
                              <span>Chỉnh sửa</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-zinc-800">
                              {bot.status === 'active' ? (
                                <>
                                  <Pause className="mr-2 h-4 w-4" />
                                  <span>Tạm dừng</span>
                                </>
                              ) : (
                                <>
                                  <Play className="mr-2 h-4 w-4" />
                                  <span>Kích hoạt</span>
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-zinc-800" />
                            <DropdownMenuItem className="focus:bg-zinc-800 text-red-500 focus:text-red-500">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Xóa Bot</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                      Không tìm thấy kết quả phù hợp.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-zinc-400">
              {selectedBots.length > 0 ? (
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-400" />
                  <span>Đã chọn <span className="font-medium text-white">{selectedBots.length}</span> bot</span>
                </div>
              ) : (
                <div>
                  Hiển thị <span className="font-medium text-white">1-{filteredBots.length}</span> trong <span className="font-medium text-white">{filteredBots.length}</span> bots
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                Trước
              </Button>
              <Button variant="outline" size="sm" className="border-zinc-700 bg-zinc-800 text-white">
                1
              </Button>
              <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                Sau
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isAddBotDialogOpen} onOpenChange={setIsAddBotDialogOpen}>
        <DialogContent className="lg:max-w-[800px] border-zinc-800 bg-zinc-900 text-white">
          <DialogHeader>
            <DialogTitle>Thêm Prop Trading Bot Mới</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Tạo mới một Prop Trading Bot được tối ưu cho các bài kiểm tra Prop Trading.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="general">Thông tin chung</TabsTrigger>
              <TabsTrigger value="challenge">Cài đặt thử thách</TabsTrigger>
              <TabsTrigger value="strategy">Chiến lược & Tính năng</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Tên Bot</Label>
                  <Input
                    id="name"
                    placeholder="Nhập tên của Bot"
                    className="bg-zinc-800 border-zinc-700 text-white"
                    value={newBot.name}
                    onChange={(e) => setNewBot({...newBot, name: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    placeholder="Mô tả chiến lược và tính năng của Bot"
                    className="bg-zinc-800 border-zinc-700 text-white min-h-[100px]"
                    value={newBot.description}
                    onChange={(e) => setNewBot({...newBot, description: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="propFirm">Công ty Prop Trading</Label>
                    <Select 
                      value={newBot.propFirm} 
                      onValueChange={(value) => setNewBot({...newBot, propFirm: value})}
                    >
                      <SelectTrigger id="propFirm" className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue placeholder="Chọn công ty" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectItem value="coinstrat_pro">Coinstrat Pro</SelectItem>
                        <SelectItem value="ftmo">FTMO</SelectItem>
                        <SelectItem value="funded_next">FundedNext</SelectItem>
                        <SelectItem value="multiple">Nhiều công ty</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="riskLevel">Mức độ rủi ro</Label>
                    <Select 
                      value={newBot.riskLevel} 
                      onValueChange={(value) => setNewBot({...newBot, riskLevel: value})}
                    >
                      <SelectTrigger id="riskLevel" className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue placeholder="Chọn mức độ rủi ro" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectItem value="very_low">Rất thấp</SelectItem>
                        <SelectItem value="low">Thấp</SelectItem>
                        <SelectItem value="medium">Trung bình</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label className="mb-1">Kích thước tài khoản hỗ trợ</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="account10k" 
                        checked={newBot.accountSizes.includes('10k')}
                        onCheckedChange={() => toggleAccountSize('10k')}
                      />
                      <Label htmlFor="account10k" className="text-sm">10,000 USD</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="account25k" 
                        checked={newBot.accountSizes.includes('25k')}
                        onCheckedChange={() => toggleAccountSize('25k')}
                      />
                      <Label htmlFor="account25k" className="text-sm">25,000 USD</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="account50k" 
                        checked={newBot.accountSizes.includes('50k')}
                        onCheckedChange={() => toggleAccountSize('50k')}
                      />
                      <Label htmlFor="account50k" className="text-sm">50,000 USD</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="account100k" 
                        checked={newBot.accountSizes.includes('100k')}
                        onCheckedChange={() => toggleAccountSize('100k')}
                      />
                      <Label htmlFor="account100k" className="text-sm">100,000 USD</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="account200k" 
                        checked={newBot.accountSizes.includes('200k')}
                        onCheckedChange={() => toggleAccountSize('200k')}
                      />
                      <Label htmlFor="account200k" className="text-sm">200,000 USD</Label>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="challengeType">Loại thử thách</Label>
                    <Select 
                      value={newBot.challengeType} 
                      onValueChange={(value) => setNewBot({...newBot, challengeType: value})}
                    >
                      <SelectTrigger id="challengeType" className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue placeholder="Chọn loại thử thách" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectItem value="one_phase">Một giai đoạn</SelectItem>
                        <SelectItem value="two_phase">Hai giai đoạn</SelectItem>
                        <SelectItem value="evaluation">Evaluation Model</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="tradingAssets">Loại tài sản giao dịch</Label>
                    <Select 
                      value={newBot.tradingAssets} 
                      onValueChange={(value) => setNewBot({...newBot, tradingAssets: value})}
                    >
                      <SelectTrigger id="tradingAssets" className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue placeholder="Chọn loại tài sản" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectItem value="forex">Forex</SelectItem>
                        <SelectItem value="crypto">Crypto</SelectItem>
                        <SelectItem value="forex_crypto">Forex & Crypto</SelectItem>
                        <SelectItem value="all">Tất cả loại tài sản</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="challenge" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="targetProfit">Mục tiêu lợi nhuận (%)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="targetProfit"
                        defaultValue={[10]}
                        max={30}
                        step={1}
                        value={[parseInt(newBot.targetProfit)]}
                        onValueChange={(value) => setNewBot({...newBot, targetProfit: value[0].toString()})}
                        className="flex-1"
                      />
                      <span className="min-w-[3rem] text-center font-medium">{newBot.targetProfit}%</span>
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="maxDrawdown">Drawdown tối đa (%)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="maxDrawdown"
                        defaultValue={[5]}
                        max={10}
                        step={0.5}
                        value={[parseFloat(newBot.maxDrawdown)]}
                        onValueChange={(value) => setNewBot({...newBot, maxDrawdown: value[0].toString()})}
                        className="flex-1"
                      />
                      <span className="min-w-[3rem] text-center font-medium">{newBot.maxDrawdown}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="maxDailyDrawdown">Drawdown hàng ngày tối đa (%)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="maxDailyDrawdown"
                        defaultValue={[2]}
                        max={5}
                        step={0.1}
                        value={[parseFloat(newBot.maxDailyDrawdown)]}
                        onValueChange={(value) => setNewBot({...newBot, maxDailyDrawdown: value[0].toString()})}
                        className="flex-1"
                      />
                      <span className="min-w-[3rem] text-center font-medium">{newBot.maxDailyDrawdown}%</span>
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="tradingWindow">Cửa sổ giao dịch (ngày)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="tradingWindow"
                        defaultValue={[30]}
                        min={15}
                        max={60}
                        step={1}
                        value={[parseInt(newBot.tradingWindow)]}
                        onValueChange={(value) => setNewBot({...newBot, tradingWindow: value[0].toString()})}
                        className="flex-1"
                      />
                      <span className="min-w-[3rem] text-center font-medium">{newBot.tradingWindow}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="timeframe">Khung thời gian</Label>
                    <Select 
                      value={newBot.timeframe} 
                      onValueChange={(value) => setNewBot({...newBot, timeframe: value})}
                    >
                      <SelectTrigger id="timeframe" className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue placeholder="Chọn khung thời gian" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectItem value="5m">5 phút</SelectItem>
                        <SelectItem value="15m">15 phút</SelectItem>
                        <SelectItem value="30m">30 phút</SelectItem>
                        <SelectItem value="1h">1 giờ</SelectItem>
                        <SelectItem value="4h">4 giờ</SelectItem>
                        <SelectItem value="1d">Ngày</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="tradingHours">Giờ giao dịch</Label>
                    <Select 
                      value={newBot.tradingHours} 
                      onValueChange={(value) => setNewBot({...newBot, tradingHours: value})}
                    >
                      <SelectTrigger id="tradingHours" className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue placeholder="Chọn giờ giao dịch" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectItem value="all_day">Cả ngày</SelectItem>
                        <SelectItem value="london_ny">London & New York</SelectItem>
                        <SelectItem value="asia">Phiên Á</SelectItem>
                        <SelectItem value="custom">Tùy chỉnh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="strategy" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="tradingStrategy">Chiến lược giao dịch</Label>
                    <Select 
                      value={newBot.tradingStrategy} 
                      onValueChange={(value) => setNewBot({...newBot, tradingStrategy: value})}
                    >
                      <SelectTrigger id="tradingStrategy" className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue placeholder="Chọn chiến lược" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectItem value="risk_managed">Quản lý rủi ro chặt chẽ</SelectItem>
                        <SelectItem value="trend_following">Theo xu hướng</SelectItem>
                        <SelectItem value="breakout">Breakout</SelectItem>
                        <SelectItem value="mean_reversion">Mean Reversion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Hướng giao dịch</Label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="supportLong" 
                          checked={newBot.supportLong}
                          onCheckedChange={(checked) => setNewBot({...newBot, supportLong: checked as boolean})}
                        />
                        <Label htmlFor="supportLong" className="text-sm">Long</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="supportShort" 
                          checked={newBot.supportShort}
                          onCheckedChange={(checked) => setNewBot({...newBot, supportShort: checked as boolean})}
                        />
                        <Label htmlFor="supportShort" className="text-sm">Short</Label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableWeekendTrading">Giao dịch cuối tuần</Label>
                    <p className="text-sm text-zinc-400">Cho phép giao dịch cryptocurrency vào cuối tuần</p>
                  </div>
                  <Switch
                    id="enableWeekendTrading"
                    checked={newBot.enableWeekendTrading}
                    onCheckedChange={(checked) => setNewBot({...newBot, enableWeekendTrading: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableNewsPause">Tạm dừng trong tin tức</Label>
                    <p className="text-sm text-zinc-400">Tự động tạm dừng giao dịch trong các sự kiện tin tức quan trọng</p>
                  </div>
                  <Switch
                    id="enableNewsPause"
                    checked={newBot.enableNewsPause}
                    onCheckedChange={(checked) => setNewBot({...newBot, enableNewsPause: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableVolatilityFilter">Bộ lọc biến động</Label>
                    <p className="text-sm text-zinc-400">Tránh giao dịch trong các điều kiện thị trường biến động cao</p>
                  </div>
                  <Switch
                    id="enableVolatilityFilter"
                    checked={newBot.enableVolatilityFilter}
                    onCheckedChange={(checked) => setNewBot({...newBot, enableVolatilityFilter: checked})}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddBotDialogOpen(false)}
              className="border-zinc-700 text-zinc-400"
            >
              Hủy
            </Button>
            <Button 
              onClick={handleAddBot}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Tạo Bot
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const BotStatusBadge = ({ status }: { status: string }) => {
  switch(status) {
    case 'active':
      return (
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
          <span className="text-green-500">Hoạt động</span>
        </div>
      );
    case 'inactive':
      return (
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
          <span className="text-yellow-500">Không hoạt động</span>
        </div>
      );
    case 'maintenance':
      return (
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
          <span className="text-blue-500">Bảo trì</span>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-zinc-500 mr-2"></div>
          <span className="text-zinc-500">Không xác định</span>
        </div>
      );
  }
};

export default AdminPropBots;
