
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  RefreshCw, 
  Info, 
  ArrowLeft, 
  Webhook, 
  Key, 
  ExternalLink,
  Edit,
  Check,
  X
} from 'lucide-react';
import { PremiumBot } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import BotProfileTabs from '@/components/bots/BotProfileTabs';

const AdminPremiumBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [bot, setBot] = useState<PremiumBot | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBot, setEditedBot] = useState<Partial<PremiumBot>>({});

  useEffect(() => {
    const fetchBotDetails = () => {
      setIsLoading(true);
      
      // Simulated API call
      setTimeout(() => {
        const mockBot: PremiumBot = {
          id: botId || 'PRE-001',
          name: 'Premium DCA Bot',
          description: 'Bot giao dịch DCA tự động cho thị trường crypto.',
          exchange: 'binance',
          type: 'dca',
          performanceLastMonth: '+18.5%',
          performanceAllTime: '+68.2%',
          risk: 'medium',
          minCapital: '1000',
          status: 'active',
          subscribers: 48,
          imageUrl: null,
          colorScheme: 'default',
          isIntegrated: false
        };
        
        setBot(mockBot);
        setEditedBot(mockBot);
        setIsLoading(false);
      }, 500);
    };
    
    fetchBotDetails();
  }, [botId]);

  const goBack = () => {
    navigate('/admin/premium-bots');
  };

  const viewPublicBotProfile = () => {
    window.open(`/premium-bots/${botId}`, '_blank');
  };

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setEditedBot(bot || {});
  };

  const handleSaveChanges = () => {
    setIsLoading(true);
    
    // Simulated API call
    setTimeout(() => {
      setBot(editedBot as PremiumBot);
      setIsEditing(false);
      setIsLoading(false);
      
      // Show success notification (using alert for simplicity)
      alert('Bot details saved successfully!');
    }, 500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedBot(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setEditedBot(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-lg font-medium">Đang tải thông tin bot...</p>
        </div>
      </div>
    );
  }

  if (!bot) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <Info className="h-12 w-12 text-orange-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Không Tìm Thấy Bot</h2>
          <p className="text-muted-foreground mb-6">Chúng tôi không thể tìm thấy bot bạn đang tìm kiếm.</p>
          <Button onClick={goBack}>Quay Lại Danh Sách Bot</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={goBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-zinc-100">Chi tiết Premium Bot</h1>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancelEditing}>
                <X className="h-4 w-4 mr-2" />
                Hủy
              </Button>
              <Button onClick={handleSaveChanges}>
                <Check className="h-4 w-4 mr-2" />
                Lưu thay đổi
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={viewPublicBotProfile}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Xem trang người dùng
              </Button>
              <Button onClick={handleStartEditing}>
                <Edit className="h-4 w-4 mr-2" />
                Chỉnh sửa
              </Button>
            </>
          )}
        </div>
      </div>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader className="pb-2">
          {isEditing ? (
            <div className="space-y-2">
              <CardTitle>
                <Input 
                  name="name" 
                  value={editedBot.name || ''} 
                  onChange={handleInputChange} 
                  className="text-xl font-bold text-white bg-zinc-800 border-zinc-700"
                />
              </CardTitle>
              <CardDescription>
                <Textarea 
                  name="description" 
                  value={editedBot.description || ''} 
                  onChange={handleInputChange} 
                  className="text-zinc-400 bg-zinc-800 border-zinc-700 min-h-[80px]"
                />
              </CardDescription>
            </div>
          ) : (
            <div>
              <CardTitle className="text-xl text-zinc-100">{bot.name}</CardTitle>
              <CardDescription className="text-zinc-400">{bot.description}</CardDescription>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            <div className="lg:col-span-5">
              <Card className="border-zinc-800 bg-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-100">Bot Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium text-zinc-300">Exchange</label>
                        <Select 
                          value={editedBot.exchange || ''} 
                          onValueChange={(value) => handleSelectChange('exchange', value)}
                        >
                          <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white">
                            <SelectValue placeholder="Select exchange" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border-zinc-700">
                            <SelectItem value="binance">Binance</SelectItem>
                            <SelectItem value="coinbase">Coinbase</SelectItem>
                            <SelectItem value="kucoin">KuCoin</SelectItem>
                            <SelectItem value="bybit">Bybit</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <label className="text-sm font-medium text-zinc-300">Risk Level</label>
                        <Select 
                          value={editedBot.risk || ''} 
                          onValueChange={(value) => handleSelectChange('risk', value as 'low' | 'medium' | 'high')}
                        >
                          <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white">
                            <SelectValue placeholder="Select risk level" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border-zinc-700">
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <label className="text-sm font-medium text-zinc-300">Status</label>
                        <Select 
                          value={editedBot.status || ''} 
                          onValueChange={(value) => handleSelectChange('status', value as 'active' | 'inactive')}
                        >
                          <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border-zinc-700">
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <label className="text-sm font-medium text-zinc-300">Minimum Capital</label>
                        <Input 
                          name="minCapital" 
                          value={editedBot.minCapital || ''} 
                          onChange={handleInputChange} 
                          className="bg-zinc-900 border-zinc-700 text-white"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <label className="text-sm font-medium text-zinc-300">Performance Last Month</label>
                        <Input 
                          name="performanceLastMonth" 
                          value={editedBot.performanceLastMonth || ''} 
                          onChange={handleInputChange} 
                          className="bg-zinc-900 border-zinc-700 text-white"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <label className="text-sm font-medium text-zinc-300">Performance All Time</label>
                        <Input 
                          name="performanceAllTime" 
                          value={editedBot.performanceAllTime || ''} 
                          onChange={handleInputChange} 
                          className="bg-zinc-900 border-zinc-700 text-white"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-zinc-400">ID</div>
                          <div className="font-mono text-zinc-100">{bot.id}</div>
                        </div>
                        <div>
                          <div className="text-sm text-zinc-400">Exchange</div>
                          <div className="text-zinc-100">{bot.exchange}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-zinc-400">Risk Level</div>
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            bot.risk === 'high' ? 'bg-red-500/20 text-red-500' : 
                            bot.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-500' : 
                            'bg-green-500/20 text-green-500'
                          }`}>
                            {bot.risk.charAt(0).toUpperCase() + bot.risk.slice(1)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-zinc-400">Status</div>
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            bot.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                          }`}>
                            {bot.status === 'active' ? 'Active' : 'Inactive'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-zinc-400">Minimum Capital</div>
                          <div className="text-zinc-100">${bot.minCapital}</div>
                        </div>
                        <div>
                          <div className="text-sm text-zinc-400">Subscribers</div>
                          <div className="text-zinc-100">{bot.subscribers}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-zinc-400">Last Month</div>
                          <div className={`text-lg font-bold ${
                            bot.performanceLastMonth.startsWith('+') ? 'text-green-500' : 'text-red-500'
                          }`}>{bot.performanceLastMonth}</div>
                        </div>
                        <div>
                          <div className="text-sm text-zinc-400">All Time</div>
                          <div className={`text-lg font-bold ${
                            bot.performanceAllTime.startsWith('+') ? 'text-green-500' : 'text-red-500'
                          }`}>{bot.performanceAllTime}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-7">
              <Card className="border-zinc-800 bg-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-100">Thông tin Tích hợp</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Thông tin tích hợp API của bot này (chỉ hiển thị cho Admin)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-zinc-300 mb-1 flex items-center gap-2">
                      <Webhook className="h-4 w-4 text-primary" />
                      Webhook URL
                    </h3>
                    {isEditing ? (
                      <Input 
                        value={`https://api.tradebot365.com/webhook/premium/${botId?.toLowerCase()}`}
                        readOnly
                        className="bg-zinc-900 border-zinc-700 text-white font-mono text-sm w-full"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="bg-zinc-900 p-3 rounded-md text-sm w-full font-mono text-zinc-300 border border-zinc-700">
                          https://api.tradebot365.com/webhook/premium/{botId?.toLowerCase()}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-zinc-300 mb-1 flex items-center gap-2">
                      <Key className="h-4 w-4 text-red-400" />
                      Signal Token {isEditing ? '' : <span className="text-xs text-red-400">(Đã ẩn)</span>}
                    </h3>
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <Input 
                          name="signalToken"
                          defaultValue="CSTYSPMEV8C-PREMIUM"
                          className="bg-zinc-900 border-zinc-700 text-white font-mono text-sm w-full"
                        />
                        <Button variant="outline" size="sm">
                          Generate New
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="bg-zinc-900 p-3 rounded-md text-sm w-full font-mono text-zinc-300 border border-zinc-700">
                          ************************
                        </div>
                      </div>
                    )}
                    {!isEditing && <p className="text-xs text-zinc-500 mt-1">Token đã được ẩn đi vì lý do bảo mật</p>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <BotProfileTabs botId={bot.id} onAddAccount={() => {
            console.log("Add account to premium bot", bot.id);
          }} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPremiumBotDetail;
