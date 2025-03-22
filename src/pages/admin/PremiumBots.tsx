
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreHorizontal, Play, Pause, Settings, Trash2, Plus, Eye, Check, Download, X } from "lucide-react";
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
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { PremiumBot } from "@/types/admin-types";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";

// BotStatusBadge component for rendering status badges
const BotStatusBadge = ({ status }: { status: string }) => {
  if (status === 'active') {
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
      Hoạt động
    </span>;
  } else if (status === 'inactive') {
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
      Không hoạt động
    </span>;
  } else {
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-500/10 text-orange-500 border border-orange-500/20">
      Bảo trì
    </span>;
  }
};

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
    exchangeType: 'binance',
    profitTarget: '15',
    maxDrawdown: '5',
    supportedAssets: ['BTC', 'ETH'],
    minInvestment: '100',
    tradingStrategy: 'dca',
    timeframe: '1h',
    indicatorsUsed: '',
    featureAdvancedEntries: false,
    featureAutomaticSl: true,
    featureDynamicTp: true,
    featureSmartFilters: false,
    maxActivePositions: '3',
    maxLeverage: '3'
  });
  
  const bots: PremiumBot[] = [
    { 
      id: 'PRE-001', 
      name: 'Premium DCA Bot', 
      status: 'active',
      users: 48,
      profit: '+18.5%',
      createdDate: '10/02/2024'
    },
    { 
      id: 'PRE-002', 
      name: 'Premium Swing Trader', 
      status: 'active',
      users: 32,
      profit: '+14.3%',
      createdDate: '15/03/2024'
    },
    { 
      id: 'PRE-003', 
      name: 'Premium Scalper Pro', 
      status: 'inactive',
      users: 12,
      profit: '-2.1%',
      createdDate: '05/03/2024'
    },
    { 
      id: 'PRE-004', 
      name: 'Premium Grid Bot', 
      status: 'active',
      users: 56,
      profit: '+9.7%',
      createdDate: '22/01/2024'
    },
    { 
      id: 'PRE-005', 
      name: 'Premium Crypto Master', 
      status: 'maintenance',
      users: 22,
      profit: '+7.8%',
      createdDate: '18/11/2023'
    }
  ];

  const totalBots = bots.length;
  const activeBots = bots.filter(bot => bot.status === 'active').length;
  const inactiveBots = bots.filter(bot => bot.status === 'inactive' || bot.status === 'maintenance').length;
  const totalUsers = bots.reduce((sum, bot) => sum + bot.users, 0);
  const positivePerformance = bots.filter(bot => parseFloat(bot.profit) > 0).length;
  const averageProfit = (bots.reduce((sum, bot) => sum + parseFloat(bot.profit), 0) / totalBots).toFixed(1) + '%';

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
      exchangeType: 'binance',
      profitTarget: '15',
      maxDrawdown: '5',
      supportedAssets: ['BTC', 'ETH'],
      minInvestment: '100',
      tradingStrategy: 'dca',
      timeframe: '1h',
      indicatorsUsed: '',
      featureAdvancedEntries: false,
      featureAutomaticSl: true,
      featureDynamicTp: true,
      featureSmartFilters: false,
      maxActivePositions: '3',
      maxLeverage: '3'
    });
    
    setActiveTab('general');
  };

  // Filter bots based on search term and status filter
  const filteredBots = bots
    .filter(bot => 
      (searchTerm === '' || 
        bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bot.id.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(bot => 
      (filterStatus === null || bot.status === filterStatus)
    );
  
  // Handle checkbox change for a single bot
  const handleCheckboxChange = (botId: string) => {
    setSelectedBots(prev => {
      if (prev.includes(botId)) {
        return prev.filter(id => id !== botId);
      } else {
        return [...prev, botId];
      }
    });
  };
  
  // Handle select all checkbox change
  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedBots([]);
    } else {
      setSelectedBots(filteredBots.map(bot => bot.id));
    }
    setSelectAll(!selectAll);
  };
  
  // Clear all selections
  const clearSelections = () => {
    setSelectedBots([]);
    setSelectAll(false);
  };
  
  // Export data to CSV
  const exportToCSV = () => {
    let botsToExport = filteredBots;
    
    // If there are selected bots, only export those
    if (selectedBots.length > 0) {
      botsToExport = filteredBots.filter(bot => selectedBots.includes(bot.id));
    }
    
    if (botsToExport.length === 0) {
      toast.error("Không có dữ liệu để xuất");
      return;
    }
    
    // Create CSV content
    const csvHeader = ["ID", "Tên Bot", "Trạng thái", "Tài khoản", "Lợi nhuận", "Ngày tạo"];
    const csvRows = botsToExport.map(bot => [
      bot.id,
      bot.name,
      bot.status,
      bot.users.toString(),
      bot.profit,
      bot.createdDate
    ]);
    
    // Combine header and rows
    const csvContent = [
      csvHeader.join(","),
      ...csvRows.map(row => row.join(","))
    ].join("\n");
    
    // Create and download the file
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
  
  // Export data to Excel (XLSX format)
  const exportToExcel = () => {
    let botsToExport = filteredBots;
    
    // If there are selected bots, only export those
    if (selectedBots.length > 0) {
      botsToExport = filteredBots.filter(bot => selectedBots.includes(bot.id));
    }
    
    if (botsToExport.length === 0) {
      toast.error("Không có dữ liệu để xuất");
      return;
    }
    
    // Create a simple HTML table for Excel export
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
              <td>${bot.id}</td>
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
    
    // Convert to blob and download
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
  
  // Handle bulk action confirmation dialog
  const openBulkActionDialog = (action: 'activate' | 'deactivate') => {
    if (selectedBots.length === 0) {
      toast.error("Vui lòng chọn ít nhất một bot");
      return;
    }
    
    setBulkAction(action);
    setIsBulkActionDialogOpen(true);
  };
  
  // Execute bulk action
  const executeBulkAction = () => {
    if (!bulkAction || selectedBots.length === 0) {
      setIsBulkActionDialogOpen(false);
      return;
    }
    
    // In a real app, this would call an API to update the bots
    // For now, we'll just show a success message
    
    const actionText = bulkAction === 'activate' ? 'kích hoạt' : 'tạm dừng';
    toast.success(`Đã ${actionText} ${selectedBots.length} bot thành công`);
    
    // Close dialog and clear selections
    setIsBulkActionDialogOpen(false);
    clearSelections();
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-zinc-800 bg-zinc-900/80 text-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="w-full">
                <p className="text-zinc-400 text-sm">Tổng Bot</p>
                <h3 className="text-3xl font-bold mt-1">{totalBots}</h3>
                <div className="flex justify-between space-x-6 mt-4">
                  <div>
                    <p className="text-green-400 text-xs">Hoạt động</p>
                    <p className="text-xl font-medium">{activeBots}</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 text-xs">Không hoạt động</p>
                    <p className="text-xl font-medium">{inactiveBots}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-zinc-800 bg-zinc-900/80 text-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="w-full">
                <p className="text-zinc-400 text-sm">Tài khoản</p>
                <h3 className="text-3xl font-bold mt-1">{totalUsers}</h3>
                <div className="mt-4">
                  <p className="text-zinc-400 text-xs">Bình quân mỗi bot</p>
                  <p className="text-xl font-medium">{(totalUsers / totalBots).toFixed(1)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-zinc-800 bg-zinc-900/80 text-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="w-full">
                <p className="text-zinc-400 text-sm">Hiệu suất</p>
                <h3 className={`text-3xl font-bold mt-1 ${parseFloat(averageProfit) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {averageProfit}
                </h3>
                <div className="mt-4">
                  <p className="text-zinc-400 text-xs">Bot hiệu quả</p>
                  <p className="text-xl font-medium">{positivePerformance} / {totalBots}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-zinc-800 bg-zinc-900 text-white">
        <CardHeader>
          <CardTitle>Danh sách Premium Bots</CardTitle>
          <CardDescription className="text-zinc-400">
            Quản lý tất cả Premium Bots trong hệ thống Trade Bot 365.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
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
            
            {/* Bulk action controls */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center">
                {selectedBots.length > 0 ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white bg-zinc-800 px-3 py-1 rounded-md">
                      Đã chọn {selectedBots.length} bot
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 border-zinc-700 text-zinc-400"
                      onClick={clearSelections}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Bỏ chọn
                    </Button>
                  </div>
                ) : null}
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-zinc-400"
                  onClick={() => exportToCSV()}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Xuất CSV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-zinc-400"
                  onClick={() => exportToExcel()}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Xuất Excel
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-green-500 hover:text-green-400"
                  onClick={() => openBulkActionDialog('activate')}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Kích hoạt
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-yellow-500 hover:text-yellow-400"
                  onClick={() => openBulkActionDialog('deactivate')}
                >
                  <Pause className="h-4 w-4 mr-2" />
                  Tạm dừng
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800">
                  <TableHead className="w-10">
                    <Checkbox 
                      checked={selectAll}
                      onCheckedChange={handleSelectAllChange}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead className="text-zinc-400 w-28">ID</TableHead>
                  <TableHead className="text-zinc-400">Tên Bot</TableHead>
                  <TableHead className="text-zinc-400">Trạng thái</TableHead>
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
                          checked={selectedBots.includes(bot.id)}
                          onCheckedChange={() => handleCheckboxChange(bot.id)}
                          aria-label={`Select ${bot.name}`}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-xs text-zinc-400">{bot.id}</TableCell>
                      <TableCell className="font-medium">{bot.name}</TableCell>
                      <TableCell>
                        <BotStatusBadge status={bot.status} />
                      </TableCell>
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
                    <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                      Không tìm thấy kết quả phù hợp.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-zinc-400">
              Hiển thị <span className="font-medium text-white">1-{filteredBots.length}</span> trong <span className="font-medium text-white">{filteredBots.length}</span> bots
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
      
      {/* Add Bot Dialog */}
      <Dialog open={isAddBotDialogOpen} onOpenChange={setIsAddBotDialogOpen}>
        <DialogContent className="lg:max-w-[800px] border-zinc-800 bg-zinc-900 text-white">
          <DialogHeader>
            <DialogTitle>Thêm Premium Bot Mới</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Tạo mới một Premium Bot để người dùng có thể đăng ký sử dụng.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="general">Thông tin chung</TabsTrigger>
              <TabsTrigger value="trading">Cài đặt giao dịch</TabsTrigger>
              <TabsTrigger value="features">Tính năng</TabsTrigger>
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
                    <Label htmlFor="riskLevel">Mức độ rủi ro</Label>
                    <Select 
                      value={newBot.riskLevel} 
                      onValueChange={(value) => setNewBot({...newBot, riskLevel: value})}
                    >
                      <SelectTrigger id="riskLevel" className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue placeholder="Chọn mức độ rủi ro" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectItem value="low">Thấp</SelectItem>
                        <SelectItem value="medium">Trung bình</SelectItem>
                        <SelectItem value="high">Cao</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="exchangeType">Sàn giao dịch</Label>
                    <Select 
                      value={newBot.exchangeType} 
                      onValueChange={(value) => setNewBot({...newBot, exchangeType: value})}
                    >
                      <SelectTrigger id="exchangeType" className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue placeholder="Chọn sàn giao dịch" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectItem value="binance">Binance</SelectItem>
                        <SelectItem value="bybit">ByBit</SelectItem>
                        <SelectItem value="coinstart_pro">Coinstart Pro</SelectItem>
                        <SelectItem value="multiple">Nhiều sàn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="minInvestment">Đầu tư tối thiểu (USDT)</Label>
                    <Input
                      id="minInvestment"
                      type="number"
                      placeholder="ví dụ: 100"
                      className="bg-zinc-800 border-zinc-700 text-white"
                      value={newBot.minInvestment}
                      onChange={(e) => setNewBot({...newBot, minInvestment: e.target.value})}
                    />
                  </div>
                  
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
                        <SelectItem value="dca">DCA (Dollar Cost Average)</SelectItem>
                        <SelectItem value="grid">Grid Trading</SelectItem>
                        <SelectItem value="swing">Swing Trading</SelectItem>
                        <SelectItem value="scalping">Scalping</SelectItem>
                        <SelectItem value="trend_following">Trend Following</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="trading" className="space-y-4">
              <div className="grid gap-4">
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
                        <SelectItem value="1m">1 phút</SelectItem>
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
                    <Label htmlFor="maxLeverage">Đòn bẩy tối đa</Label>
                    <Input
                      id="maxLeverage"
                      type="number"
                      placeholder="ví dụ: 3"
                      className="bg-zinc-800 border-zinc-700 text-white"
                      value={newBot.maxLeverage}
                      onChange={(e) => setNewBot({...newBot, maxLeverage: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="maxActivePositions">Số vị thế tối đa</Label>
                  <Input
                    id="maxActivePositions"
                    type="number"
                    placeholder="ví dụ: 3"
                    className="bg-zinc-800 border-zinc-700 text-white"
                    value={newBot.maxActivePositions}
                    onChange={(e) => setNewBot({...newBot, maxActivePositions: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="indicatorsUsed">Chỉ báo sử dụng</Label>
                  <Textarea
                    id="indicatorsUsed"
                    placeholder="Liệt kê các chỉ báo được sử dụng trong chiến lược"
                    className="bg-zinc-800 border-zinc-700 text-white min-h-[80px]"
                    value={newBot.indicatorsUsed}
                    onChange={(e) => setNewBot({...newBot, indicatorsUsed: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="profitTarget">Mục tiêu lợi nhuận (%/tháng)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="profitTarget"
                        defaultValue={[15]}
                        max={50}
                        step={1}
                        value={[parseInt(newBot.profitTarget)]}
                        onValueChange={(value) => setNewBot({...newBot, profitTarget: value[0].toString()})}
                        className="flex-1"
                      />
                      <span className="min-w-[3rem] text-center font-medium">{newBot.profitTarget}%</span>
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="maxDrawdown">Drawdown tối đa (%)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="maxDrawdown"
                        defaultValue={[5]}
                        max={20}
                        step={1}
                        value={[parseInt(newBot.maxDrawdown)]}
                        onValueChange={(value) => setNewBot({...newBot, maxDrawdown: value[0].toString()})}
                        className="flex-1"
                      />
                      <span className="min-w-[3rem] text-center font-medium">{newBot.maxDrawdown}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label className="text-lg font-medium pb-2 border-b border-zinc-800">Tính năng cao cấp</Label>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <Label htmlFor="featureAdvancedEntries" className="font-medium">Entry Points Nâng cao</Label>
                      <p className="text-xs text-zinc-400">Cải thiện điểm vào lệnh với các xác nhận đa chỉ báo</p>
                    </div>
                    <Switch
                      id="featureAdvancedEntries"
                      checked={newBot.featureAdvancedEntries}
                      onCheckedChange={(checked) => setNewBot({...newBot, featureAdvancedEntries: checked})}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <Label htmlFor="featureAutomaticSl" className="font-medium">Stop Loss Tự động</Label>
                      <p className="text-xs text-zinc-400">Tự động đặt và điều chỉnh stop loss dựa trên biến động</p>
                    </div>
                    <Switch
                      id="featureAutomaticSl"
                      checked={newBot.featureAutomaticSl}
                      onCheckedChange={(checked) => setNewBot({...newBot, featureAutomaticSl: checked})}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <Label htmlFor="featureDynamicTp" className="font-medium">Take Profit Động</Label>
                      <p className="text-xs text-zinc-400">Điều chỉnh mục tiêu lợi nhuận dựa trên momentum thị trường</p>
                    </div>
                    <Switch
                      id="featureDynamicTp"
                      checked={newBot.featureDynamicTp}
                      onCheckedChange={(checked) => setNewBot({...newBot, featureDynamicTp: checked})}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <Label htmlFor="featureSmartFilters" className="font-medium">Bộ lọc thông minh</Label>
                      <p className="text-xs text-zinc-400">Tránh giao dịch trong điều kiện thị trường không thuận lợi</p>
                    </div>
                    <Switch
                      id="featureSmartFilters"
                      checked={newBot.featureSmartFilters}
                      onCheckedChange={(checked) => setNewBot({...newBot, featureSmartFilters: checked})}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
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
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              Tạo Bot
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Bulk Action Dialog */}
      <AlertDialog open={isBulkActionDialogOpen} onOpenChange={setIsBulkActionDialogOpen}>
        <AlertDialogContent className="border-zinc-800 bg-zinc-900 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {bulkAction === 'activate' ? 'Kích hoạt hàng loạt' : 'Tạm dừng hàng loạt'}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Bạn có chắc chắn muốn {bulkAction === 'activate' ? 'kích hoạt' : 'tạm dừng'} {selectedBots.length} bot đã chọn?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-zinc-700 text-zinc-400">Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={executeBulkAction}
              className={bulkAction === 'activate' ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'}
            >
              {bulkAction === 'activate' ? (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Kích hoạt
                </>
              ) : (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Tạm dừng
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPremiumBots;

