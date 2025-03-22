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
import { toast } from "sonner";

const AdminPremiumBots = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isAddBotDialogOpen, setIsAddBotDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
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
  
  const bots = [
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
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="featureAdvancedEntries">Điểm vào nâng cao</Label>
                    <p className="text-sm text-zinc-400">Sử dụng nhiều chỉ báo kết hợp để xác định điểm vào tối ưu</p>
                  </div>
                  <Switch
                    id="featureAdvancedEntries"
                    checked={newBot.featureAdvancedEntries}
                    onCheckedChange={(checked) => setNewBot({...newBot, featureAdvancedEntries: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="featureAutomaticSl">Stop Loss tự động</Label>
                    <p className="text-sm text-zinc-400">Tự động đặt stop loss dựa trên biến động thị trường</p>
                  </div>
                  <Switch
                    id="featureAutomaticSl"
                    checked={newBot.featureAutomaticSl}
                    onCheckedChange={(checked) => setNewBot({...newBot, featureAutomaticSl: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="featureDynamicTp">Take Profit động</Label>
                    <p className="text-sm text-zinc-400">Điều chỉnh take profit dựa trên xu hướng thị trường</p>
                  </div>
                  <Switch
                    id="featureDynamicTp"
                    checked={newBot.featureDynamicTp}
                    onCheckedChange={(checked) => setNewBot({...newBot, featureDynamicTp: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="featureSmartFilters">Bộ lọc thông minh</Label>
                    <p className="text-sm text-zinc-400">Loại bỏ tín hiệu sai trong điều kiện thị trường không thuận lợi</p>
                  </div>
                  <Switch
                    id="featureSmartFilters"
                    checked={newBot.featureSmartFilters}
                    onCheckedChange={(checked) => setNewBot({...newBot, featureSmartFilters: checked})}
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
              className="bg-amber-500 hover:bg-amber-600 text-white"
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

export default AdminPremiumBots;
