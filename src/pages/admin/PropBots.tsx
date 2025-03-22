import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreHorizontal, Play, Pause, Settings, Trash2, Plus, Eye } from "lucide-react";
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

const AdminPropBots = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isAddBotDialogOpen, setIsAddBotDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const navigate = useNavigate();
  const location = useLocation();
  
  const totalBots = 4;
  const activeBots = 2;
  const totalUsers = 25;
  const averageUsersPerBot = Math.round(totalUsers / totalBots);
  const totalProfit = '+14.7%';
  const activePercent = Math.round((activeBots / totalBots) * 100);
  
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
  
  const bots = [
    { 
      id: 'PROP-001', 
      name: 'Prop Trading Master', 
      status: 'active',
      users: 12,
      profit: '+22.5%',
      createdDate: '05/01/2024'
    },
    { 
      id: 'PROP-002', 
      name: 'Prop FTMO Winner', 
      status: 'active',
      users: 8,
      profit: '+17.3%',
      createdDate: '20/02/2024'
    },
    { 
      id: 'PROP-003', 
      name: 'Prop Trading Elite', 
      status: 'maintenance',
      users: 5,
      profit: '+9.1%',
      createdDate: '15/03/2024'
    },
    { 
      id: 'PROP-004', 
      name: 'Prop 100K Challenge', 
      status: 'inactive',
      users: 0,
      profit: '0.0%',
      createdDate: '05/04/2024'
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

  const filteredBots = bots
    .filter(bot => 
      (searchTerm === '' || 
        bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bot.id.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(bot => 
      (filterStatus === null || bot.status === filterStatus)
    );

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
        <Card className="border-zinc-800 bg-zinc-900/60 text-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="w-full">
                <p className="text-zinc-400 text-sm">Tài khoản</p>
                <h3 className="text-3xl font-bold mt-1">{totalUsers}</h3>
                <div className="mt-4">
                  <p className="text-zinc-400 text-xs">Bình quân mỗi bot</p>
                  <p className="text-lg font-medium">{averageUsersPerBot}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-zinc-800 bg-zinc-900/60 text-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="w-full">
                <p className="text-zinc-400 text-sm">Prop Bots</p>
                <h3 className="text-3xl font-bold mt-1">{totalBots}</h3>
                <div className="mt-4">
                  <p className="text-zinc-400 text-xs">Đang hoạt động</p>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-medium">{activeBots}</p>
                    <span className="text-xs text-green-500">({activePercent}%)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-zinc-800 bg-zinc-900/60 text-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="w-full">
                <p className="text-zinc-400 text-sm">Lợi nhuận trung bình</p>
                <h3 className="text-3xl font-bold mt-1 text-green-500">{totalProfit}</h3>
                <div className="mt-4">
                  <p className="text-zinc-400 text-xs">Tháng này</p>
                  <p className="text-lg font-medium text-green-500">+8.5%</p>
                </div>
              </div>
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
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
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

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800">
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
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
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
