
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ArrowLeft, User, Bot, CreditCard, ShieldCheck } from "lucide-react";
import { RoleBadge, StatusBadge } from './Users';

const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  // Mock user data (in a real app, this would be fetched from an API)
  const user = {
    id: userId || 'USR-24051',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    role: 'user',
    status: 'active',
    bots: 3,
    joinDate: '15/08/2023',
    phone: '+84 123 456 789',
    address: 'Hà Nội, Việt Nam',
    subscription: 'Premium',
    balance: '500,000 VND',
    accountType: 'Verified',
    lastLogin: '20/03/2024 15:30',
    referredBy: null,
    userBots: [
      { id: 'BOT-3201', name: 'BTC Long', type: 'Custom', status: 'active', created: '22/09/2023' },
      { id: 'BOT-3202', name: 'ETH Signal', type: 'Custom', status: 'active', created: '05/10/2023' },
      { id: 'BOT-3203', name: 'DOGE Short', type: 'Custom', status: 'inactive', created: '10/11/2023' }
    ],
    premiumBots: [
      { id: 'PRE-5101', name: 'Crypto Master', type: 'Premium', status: 'active', activated: '01/01/2024' }
    ],
    propBots: [
      { id: 'PROP-7201', name: 'Prop Alpha', type: 'Prop Trading', status: 'active', activated: '15/02/2024' }
    ]
  };

  // Subscription tiers with features for reference
  const subscriptionTiers = [
    { 
      id: 'free', 
      name: 'Miễn phí', 
      price: '0 VND', 
      features: ['2 Bot tùy chỉnh', 'Phân tích cơ bản'] 
    },
    { 
      id: 'basic', 
      name: 'Cơ bản', 
      price: '200,000 VND/tháng', 
      features: ['5 Bot tùy chỉnh', 'Truy cập 3 Premium Bot', 'Phân tích nâng cao'] 
    },
    { 
      id: 'premium', 
      name: 'Premium', 
      price: '500,000 VND/tháng', 
      features: ['Không giới hạn Bot tùy chỉnh', 'Truy cập đầy đủ Premium Bot', 'Phân tích chuyên sâu'] 
    }
  ];

  const handleReturn = () => {
    navigate('/admin/users');
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb navigation */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/users">Người dùng</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Chi tiết người dùng</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleReturn}
            className="h-8 w-8 border-zinc-800"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-white">Chi tiết người dùng</h1>
        </div>
        <div className="flex items-center gap-2">
          <RoleBadge role={user.role} />
          <StatusBadge status={user.status} />
        </div>
      </div>

      {/* User summary card */}
      <Card className="border-zinc-800 bg-zinc-900 text-white">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                {user.name}
                <span className="text-sm font-mono text-zinc-400">{user.id}</span>
              </CardTitle>
              <CardDescription className="text-zinc-400 mt-1">
                {user.email}
              </CardDescription>
            </div>
            <div className="mt-4 sm:mt-0">
              <Badge className="bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30 border-0">
                {user.subscription}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-zinc-400">Ngày tham gia</div>
              <div>{user.joinDate}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-zinc-400">Lần cuối đăng nhập</div>
              <div>{user.lastLogin}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-zinc-400">Số dư tài khoản</div>
              <div>{user.balance}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-zinc-800 border-zinc-700">
          <TabsTrigger value="profile" className="data-[state=active]:bg-zinc-700">
            <User className="h-4 w-4 mr-2" />
            Thông tin cá nhân
          </TabsTrigger>
          <TabsTrigger value="bots" className="data-[state=active]:bg-zinc-700">
            <Bot className="h-4 w-4 mr-2" />
            Bot & Trading
          </TabsTrigger>
          <TabsTrigger value="subscription" className="data-[state=active]:bg-zinc-700">
            <CreditCard className="h-4 w-4 mr-2" />
            Gói đăng ký
          </TabsTrigger>
        </TabsList>

        {/* Profile Information Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
              <CardDescription className="text-zinc-400">
                Thông tin chi tiết về người dùng.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-sm text-zinc-400">Họ và tên</div>
                  <div>{user.name}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-zinc-400">Email</div>
                  <div>{user.email}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-zinc-400">Số điện thoại</div>
                  <div>{user.phone}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-zinc-400">Địa chỉ</div>
                  <div>{user.address}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-zinc-400">Loại tài khoản</div>
                  <div>{user.accountType}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-zinc-400">Người giới thiệu</div>
                  <div>{user.referredBy || "Không có"}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bots Tab */}
        <TabsContent value="bots" className="space-y-6">
          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardHeader>
              <CardTitle>Bot tùy chỉnh</CardTitle>
              <CardDescription className="text-zinc-400">
                Danh sách các bot tùy chỉnh người dùng đã tạo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user.userBots.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left pb-3 text-zinc-400">ID</th>
                        <th className="text-left pb-3 text-zinc-400">Tên Bot</th>
                        <th className="text-left pb-3 text-zinc-400">Trạng thái</th>
                        <th className="text-left pb-3 text-zinc-400">Ngày tạo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.userBots.map(bot => (
                        <tr key={bot.id} className="border-b border-zinc-800">
                          <td className="py-3 text-sm font-mono text-zinc-400">{bot.id}</td>
                          <td className="py-3">{bot.name}</td>
                          <td className="py-3">
                            <StatusBadge status={bot.status} />
                          </td>
                          <td className="py-3">{bot.created}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4 text-zinc-400">
                  Người dùng chưa tạo bot nào.
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardHeader>
              <CardTitle>Premium Bot</CardTitle>
              <CardDescription className="text-zinc-400">
                Danh sách các Premium Bot người dùng đã kích hoạt.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user.premiumBots.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left pb-3 text-zinc-400">ID</th>
                        <th className="text-left pb-3 text-zinc-400">Tên Bot</th>
                        <th className="text-left pb-3 text-zinc-400">Trạng thái</th>
                        <th className="text-left pb-3 text-zinc-400">Ngày kích hoạt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.premiumBots.map(bot => (
                        <tr key={bot.id} className="border-b border-zinc-800">
                          <td className="py-3 text-sm font-mono text-zinc-400">{bot.id}</td>
                          <td className="py-3">{bot.name}</td>
                          <td className="py-3">
                            <StatusBadge status={bot.status} />
                          </td>
                          <td className="py-3">{bot.activated}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4 text-zinc-400">
                  Người dùng chưa kích hoạt Premium Bot nào.
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardHeader>
              <CardTitle>Prop Trading Bot</CardTitle>
              <CardDescription className="text-zinc-400">
                Danh sách các Prop Trading Bot người dùng đã kích hoạt.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user.propBots.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left pb-3 text-zinc-400">ID</th>
                        <th className="text-left pb-3 text-zinc-400">Tên Bot</th>
                        <th className="text-left pb-3 text-zinc-400">Trạng thái</th>
                        <th className="text-left pb-3 text-zinc-400">Ngày kích hoạt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.propBots.map(bot => (
                        <tr key={bot.id} className="border-b border-zinc-800">
                          <td className="py-3 text-sm font-mono text-zinc-400">{bot.id}</td>
                          <td className="py-3">{bot.name}</td>
                          <td className="py-3">
                            <StatusBadge status={bot.status} />
                          </td>
                          <td className="py-3">{bot.activated}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4 text-zinc-400">
                  Người dùng chưa kích hoạt Prop Trading Bot nào.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscription Tab */}
        <TabsContent value="subscription" className="space-y-6">
          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardHeader>
              <CardTitle>Gói đăng ký hiện tại</CardTitle>
              <CardDescription className="text-zinc-400">
                Thông tin về gói đăng ký hiện tại của người dùng.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 border border-amber-500/20 rounded-lg bg-amber-500/5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-amber-500">{user.subscription}</h3>
                    <p className="text-zinc-400 mt-1">Đã kích hoạt từ: 01/03/2024</p>
                  </div>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                    Thay đổi gói
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-4">Các quyền lợi của gói</h3>
                <ul className="space-y-2">
                  {subscriptionTiers.find(tier => tier.name === user.subscription)?.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardHeader>
              <CardTitle>Lịch sử giao dịch</CardTitle>
              <CardDescription className="text-zinc-400">
                Lịch sử thanh toán và gia hạn gói đăng ký.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left pb-3 text-zinc-400">ID giao dịch</th>
                      <th className="text-left pb-3 text-zinc-400">Ngày</th>
                      <th className="text-left pb-3 text-zinc-400">Mô tả</th>
                      <th className="text-right pb-3 text-zinc-400">Số tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3 text-sm font-mono text-zinc-400">TX-46291</td>
                      <td className="py-3">01/03/2024</td>
                      <td className="py-3">Nâng cấp lên gói Premium</td>
                      <td className="py-3 text-right">500,000 VND</td>
                    </tr>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3 text-sm font-mono text-zinc-400">TX-38754</td>
                      <td className="py-3">01/02/2024</td>
                      <td className="py-3">Gia hạn gói Basic</td>
                      <td className="py-3 text-right">200,000 VND</td>
                    </tr>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3 text-sm font-mono text-zinc-400">TX-27356</td>
                      <td className="py-3">01/01/2024</td>
                      <td className="py-3">Nâng cấp lên gói Basic</td>
                      <td className="py-3 text-right">200,000 VND</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDetail;
