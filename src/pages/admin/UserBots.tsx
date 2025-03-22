
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreHorizontal, Play, Pause, Eye, Trash2, User } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

const AdminUserBots = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Statistics data
  const totalBots = 5;
  const activeBots = 3;
  const inactiveBots = 2;
  const totalAccounts = 8;
  const averageAccountsPerBot = Math.round(totalAccounts / totalBots);
  const performanceRate = "12.3%";
  const topPerformingRatio = "4 / 5";
  
  const bots = [
    { 
      id: 'BOT-3201', 
      name: 'BTC Long', 
      owner: 'Nguyễn Văn A',
      ownerId: 'USR-24051',
      status: 'active',
      accounts: 2,
      createdDate: '22/09/2023'
    },
    { 
      id: 'BOT-3202', 
      name: 'ETH Signal', 
      owner: 'Nguyễn Văn A',
      ownerId: 'USR-24051',
      status: 'active',
      accounts: 3,
      createdDate: '05/10/2023'
    },
    { 
      id: 'BOT-3203', 
      name: 'DOGE Short', 
      owner: 'Nguyễn Văn A',
      ownerId: 'USR-24051',
      status: 'inactive',
      accounts: 0,
      createdDate: '10/11/2023'
    },
    { 
      id: 'BOT-4201', 
      name: 'Gold Trading Bot', 
      owner: 'Trần Thị B',
      ownerId: 'USR-24052',
      status: 'active',
      accounts: 1,
      createdDate: '15/01/2024'
    },
    { 
      id: 'BOT-5301', 
      name: 'S&P500 Trend',
      owner: 'Phạm Đức D',
      ownerId: 'USR-24054',
      status: 'active',
      accounts: 2,
      createdDate: '28/02/2024'
    }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterClick = () => {
    // Toggle between filter states
    if (!filterStatus) {
      setFilterStatus('active');
    } else if (filterStatus === 'active') {
      setFilterStatus('inactive');
    } else {
      setFilterStatus(null);
    }
  };

  const viewBotDetail = (botId: string) => {
    // Always navigate to user-bots path for consistency
    navigate(`/admin/user-bots/${botId}`);
  };

  const viewUserDetail = (userId: string) => {
    navigate(`/admin/users/${userId}`);
  };

  const filteredBots = bots
    .filter(bot => 
      (searchTerm === '' || 
        bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bot.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bot.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bot.ownerId.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(bot => 
      (filterStatus === null || bot.status === filterStatus)
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Quản lý Bot người dùng</h1>
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
          <CardTitle>Danh sách Bot người dùng</CardTitle>
          <CardDescription className="text-zinc-400">
            Quản lý tất cả Bot do người dùng tạo trong hệ thống Trade Bot 365.
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
                  <TableHead className="text-zinc-400">User ID</TableHead>
                  <TableHead className="text-zinc-400">Trạng thái</TableHead>
                  <TableHead className="text-zinc-400 text-right">Tài khoản</TableHead>
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
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-zinc-400 hover:text-white font-mono text-xs"
                          onClick={() => viewUserDetail(bot.ownerId)}
                        >
                          {bot.ownerId}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <BotStatusBadge status={bot.status} />
                      </TableCell>
                      <TableCell className="text-right">{bot.accounts}</TableCell>
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
                            <DropdownMenuItem 
                              className="focus:bg-zinc-800"
                              onClick={() => viewBotDetail(bot.id)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              <span>Xem chi tiết</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="focus:bg-zinc-800"
                              onClick={() => viewUserDetail(bot.ownerId)}
                            >
                              <User className="mr-2 h-4 w-4" />
                              <span>Xem thông tin chủ sở hữu</span>
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
    </div>
  );
};

// Bot Status Badge Component
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
    case 'suspended':
      return (
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
          <span className="text-red-500">Đã khóa</span>
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

export default AdminUserBots;
