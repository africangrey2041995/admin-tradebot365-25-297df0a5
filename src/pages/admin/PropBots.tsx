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
import { toast } from "sonner";

const AdminPropBots = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isAddBotDialogOpen, setIsAddBotDialogOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [newBot, setNewBot] = useState({
    name: '',
    description: '',
    riskLevel: 'low',
    propFirm: 'coinstrat_pro',
    maxDrawdown: '5',
    targetProfit: '10',
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
    if (!newBot.name || !newBot.description || !newBot.maxDrawdown || !newBot.targetProfit) {
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
    });
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
                  <TableHead className="text-zinc-400 text-right">Người dùng</TableHead>
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
        <DialogContent className="sm:max-w-[500px] border-zinc-800 bg-zinc-900 text-white">
          <DialogHeader>
            <DialogTitle>Thêm Prop Trading Bot Mới</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Tạo mới một Prop Trading Bot được tối ưu cho các bài kiểm tra Prop Trading.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
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
              <Input
                id="description"
                placeholder="Mô tả chiến lược và tính năng của Bot"
                className="bg-zinc-800 border-zinc-700 text-white"
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
                    <SelectItem value="low">Thấp</SelectItem>
                    <SelectItem value="medium">Trung bình</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="maxDrawdown">Drawdown tối đa (%)</Label>
                <Input
                  id="maxDrawdown"
                  type="number"
                  min="1"
                  max="10"
                  placeholder="ví dụ: 5"
                  className="bg-zinc-800 border-zinc-700 text-white"
                  value={newBot.maxDrawdown}
                  onChange={(e) => setNewBot({...newBot, maxDrawdown: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="targetProfit">Mục tiêu lợi nhuận (%)</Label>
                <Input
                  id="targetProfit"
                  type="number"
                  min="5"
                  max="30"
                  placeholder="ví dụ: 10"
                  className="bg-zinc-800 border-zinc-700 text-white"
                  value={newBot.targetProfit}
                  onChange={(e) => setNewBot({...newBot, targetProfit: e.target.value})}
                />
              </div>
            </div>
          </div>
          
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
