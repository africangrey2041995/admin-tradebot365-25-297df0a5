
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Box, Copy, RefreshCw, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ADMIN_ROUTES } from '@/constants/routes';
import { BotRiskLevel, BotStatus, BOT_RISK_DISPLAY, BOT_STATUS_DISPLAY } from '@/constants/botTypes';
import { toast } from 'sonner';
import UserBotDetailTabs from '@/components/bots/UserBotDetailTabs';

// Dummy user ID for demo
const ADMIN_USER_ID = 'ADM-001';

const PropBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [botData, setBotData] = useState<any>(null);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      // Mock data for a single prop bot
      setBotData({
        botId: botId || 'PROP-001',
        name: 'FTMO Challenger Pro',
        description: 'Bot đặc biệt thiết kế để vượt qua FTMO Challenge với tỷ lệ thành công cao.',
        type: 'prop',
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
        lastUpdated: '2023-11-22',
        maxDrawdown: '4.2%',
        challengeDuration: '30 ngày',
        accountSizes: ['$10K', '$25K', '$50K', '$100K'],
        apiKey: 'prop_api_' + Math.random().toString(36).substring(2, 15),
        webhookUrl: 'https://api.example.com/webhook/prop-trading/' + botId,
      });

      // Mock accounts data
      setAccounts([
        {
          id: 'ACC-001',
          name: 'FTMO Challenge Account',
          exchange: 'FTMO',
          userId: 'USR-042',
          userName: 'John Trader',
          status: 'active',
          balance: '$10,240',
          profit: '+5.2%',
          lastSync: '2023-11-20T14:32:00Z'
        },
        {
          id: 'ACC-002',
          name: 'FundedNext Account',
          exchange: 'FundedNext',
          userId: 'USR-018',
          userName: 'Sarah Investor',
          status: 'active',
          balance: '$25,840',
          profit: '+3.7%',
          lastSync: '2023-11-21T09:15:00Z'
        }
      ]);

      // Mock logs data
      setLogs([
        {
          id: 'SIG-001',
          timestamp: new Date().toISOString(),
          action: 'BUY',
          instrument: 'EURUSD',
          amount: '0.5 lot',
          status: 'completed',
          processedAccounts: [{ id: 'ACC-001', name: 'FTMO Challenge Account' }],
          failedAccounts: [],
          originalSignalId: 'TB365-12345'
        },
        {
          id: 'SIG-002',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          action: 'SELL',
          instrument: 'GBPUSD',
          amount: '0.3 lot',
          status: 'completed',
          processedAccounts: [
            { id: 'ACC-001', name: 'FTMO Challenge Account' },
            { id: 'ACC-002', name: 'FundedNext Account' }
          ],
          failedAccounts: [],
          originalSignalId: 'TB365-12346'
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, [botId]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleRefresh = () => {
    setLoading(true);
    // Simulate refetch
    setTimeout(() => {
      setLoading(false);
      toast.success('Dữ liệu đã được cập nhật thành công!');
    }, 1000);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} đã được sao chép!`);
  };

  if (loading && !botData) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Đang tải...</span>
      </div>
    );
  }

  if (!botData) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate(ADMIN_ROUTES.PROP_BOTS)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Bot không tồn tại</h1>
        </div>
        <p>Bot với ID {botId} không tồn tại hoặc bạn không có quyền truy cập.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate(ADMIN_ROUTES.PROP_BOTS)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <div className="flex items-center">
                <h1 className="text-2xl font-bold mr-2">{botData.name}</h1>
                <Badge 
                  variant={botData.status === BotStatus.ACTIVE ? "default" : "secondary"}
                >
                  {BOT_STATUS_DISPLAY[botData.status as BotStatus]}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{botData.propFirm} - Bot ID: {botData.botId}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Làm mới
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate(`${ADMIN_ROUTES.PROP_BOTS}/edit/${botId}`)}
            >
              Chỉnh sửa
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="api-integration">API tích hợp</TabsTrigger>
            <TabsTrigger value="bot-details">Chi tiết Bot</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Thông tin Bot</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Mô tả</p>
                      <p>{botData.description}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Prop Firm</p>
                      <p>{botData.propFirm}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Mức độ rủi ro</p>
                      <Badge className="mt-1" variant="outline">{BOT_RISK_DISPLAY[botData.risk as BotRiskLevel]}</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Vốn tối thiểu</p>
                      <p>{botData.minCapital}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Số người dùng</p>
                      <p>{botData.users}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Hiệu suất tháng trước</p>
                      <p className="text-green-600">{botData.performanceLastMonth}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Max Drawdown</p>
                      <p>{botData.maxDrawdown}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Thời gian challenge</p>
                      <p>{botData.challengeDuration}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin quản lý</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Ngày tạo</p>
                      <p>{new Date(botData.createdDate).toLocaleDateString('vi-VN')}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Cập nhật cuối</p>
                      <p>{new Date(botData.lastUpdated).toLocaleDateString('vi-VN')}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Account Sizes</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {botData.accountSizes.map((size: string) => (
                          <Badge key={size} variant="outline">{size}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="api-integration" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin API tích hợp</CardTitle>
                <CardDescription>
                  Sử dụng thông tin dưới đây để tích hợp bot Prop Trading với hệ thống của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="webhook-url"
                      value={botData.webhookUrl}
                      readOnly
                      className="font-mono text-sm bg-muted"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(botData.webhookUrl, 'Webhook URL')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sử dụng URL này để nhận tín hiệu từ hệ thống Prop Trading của bạn
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="api-key"
                      value={botData.apiKey}
                      readOnly
                      className="font-mono text-sm bg-muted"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(botData.apiKey, 'API Key')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sử dụng API Key này để xác thực các yêu cầu webhook
                  </p>
                </div>

                <Separator />

                <div className="bg-muted p-4 rounded-md border">
                  <div className="flex items-center mb-2">
                    <Server className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="font-medium">Ví dụ cấu trúc webhook</h3>
                  </div>
                  <div className="bg-card p-3 rounded-md overflow-x-auto">
                    <pre className="text-xs">
{`POST ${botData.webhookUrl}
Content-Type: application/json
X-API-Key: ${botData.apiKey}

{
  "signal": {
    "instrument": "EURUSD",
    "action": "BUY",
    "amount": "0.5",
    "price": 1.0921,
    "signalId": "TB365-12345",
    "timestamp": "${new Date().toISOString()}"
  }
}`}
                    </pre>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Trạng thái API</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Đang hoạt động</span>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => toast.success('API Key đã được tạo mới!')}>
                      Tạo mới API Key
                    </Button>
                    <Button variant="destructive" onClick={() => toast.success('API Key đã bị vô hiệu hóa!')}>
                      Vô hiệu hóa API
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bot-details" className="mt-6">
            <UserBotDetailTabs
              userId={ADMIN_USER_ID}
              botId={botId || ''}
              accountsData={accounts}
              logsData={logs}
              isLoading={loading}
              onRefresh={handleRefresh}
              signalSourceLabel="TB365 ID"
              botType="prop"
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default PropBotDetail;
