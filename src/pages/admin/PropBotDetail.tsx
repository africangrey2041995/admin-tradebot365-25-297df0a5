import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Bot, 
  Save, 
  CheckCircle2,
  CircleAlert, 
  BarChart2, 
  TrendingUp,
  AlertTriangle,
  Users,
  DollarSign,
  Edit3,
  X,
  Plus,
  Trash2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from '@/components/ui/switch';
import AdminLayout from '@/components/admin/AdminLayout';
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import TradingViewLogs from '@/components/bots/TradingViewLogs';
import CoinstratLogs from '@/components/bots/CoinstratLogs';

// Placeholder data for prop trading bots
const propTradingBots = [
  {
    id: 'ptb-001',
    name: 'Prop Master',
    description: 'Bot đặc biệt thiết kế để vượt qua các bài kiểm tra của Coinstrat Pro Prop Trading với tỷ lệ thành công cao.',
    exchange: 'Coinstrat Pro',
    type: 'prop',
    performanceLastMonth: '+11.2%',
    performanceAllTime: '+45.8%',
    risk: 'low',
    minCapital: '$500',
    status: 'active',
    subscribers: 120,
    imageUrl: null,
    colorScheme: 'blue',
    features: [
      'Tối ưu hóa để vượt qua các bài kiểm tra Prop Trading',
      'Quản lý rủi ro tự động theo yêu cầu của Coinstrat Pro',
      'Báo cáo hiệu suất chi tiết theo các tiêu chí đánh giá Prop Trading',
      'Chiến lược giao dịch nhất quán với tỷ lệ win cao'
    ],
    requirements: [
      'Vốn tối thiểu $500',
      'Tài khoản Coinstrat Pro đã xác minh',
      'Phù hợp với giai đoạn Challenger hoặc Verification'
    ]
  },
  {
    id: 'ptb-002',
    name: 'Risk Manager Pro',
    description: 'Bot tối ưu quản lý rủi ro để đáp ứng các yêu cầu nghiêm ngặt của Prop Trading, giúp giữ tỷ lệ drawdown thấp.',
    exchange: 'Coinstrat Pro',
    type: 'prop',
    performanceLastMonth: '+8.5%',
    performanceAllTime: '+38.9%',
    risk: 'low',
    minCapital: '$700',
    status: 'active',
    subscribers: 95,
    imageUrl: null,
    colorScheme: 'green',
    features: [
      'Kiểm soát chặt chẽ tỷ lệ rủi ro trên từng giao dịch',
      'Giữ mức drawdown tối đa dưới 5%',
      'Tự động điều chỉnh kích thước vị thế dựa trên biến động thị trường',
      'Báo cáo phân tích rủi ro chi tiết'
    ],
    requirements: [
      'Vốn tối thiểu $700',
      'Tài khoản Coinstrat Pro đã xác minh',
      'Phù hợp cho giai đoạn Verification hoặc Funded'
    ]
  },
  {
    id: 'ptb-003',
    name: 'Consistent Trader',
    description: 'Bot tập trung vào tính nhất quán trong giao dịch, điều kiện cần thiết để vượt qua các vòng thử thách Prop Trading.',
    exchange: 'Coinstrat Pro',
    type: 'prop',
    performanceLastMonth: '+9.7%',
    performanceAllTime: '+42.3%',
    risk: 'medium',
    status: 'active',
    minCapital: '$600',
    subscribers: 83,
    imageUrl: null,
    colorScheme: 'purple',
    features: [
      'Tính nhất quán cao trong mọi điều kiện thị trường',
      'Tỷ lệ win/loss ổn định trên 65%',
      'Thời gian nắm giữ giao dịch tối ưu',
      'Cơ chế tự động tránh các sự kiện thị trường biến động mạnh'
    ],
    requirements: [
      'Vốn tối thiểu $600',
      'Tài khoản Coinstrat Pro đã xác minh',
      'Phù hợp với tất cả các giai đoạn Prop Trading'
    ]
  }
];

const PropBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  
  // Find the bot or use a default one if not found
  const initialBot = propTradingBots.find(b => b.id === botId) || propTradingBots[0];
  const [bot, setBot] = useState(initialBot);
  
  // Editing state for each section
  const [editingGeneral, setEditingGeneral] = useState(false);
  const [editingFeatures, setEditingFeatures] = useState(false);
  const [editingRequirements, setEditingRequirements] = useState(false);
  const [editingPerformance, setEditingPerformance] = useState(false);
  
  // Form state
  const [generalForm, setGeneralForm] = useState({
    name: bot.name,
    description: bot.description,
    exchange: bot.exchange,
    risk: bot.risk,
    minCapital: bot.minCapital,
    status: bot.status,
    colorScheme: bot.colorScheme
  });
  
  const [featuresForm, setFeaturesForm] = useState([...bot.features]);
  const [requirementsForm, setRequirementsForm] = useState([...bot.requirements]);
  
  const [performanceForm, setPerformanceForm] = useState({
    performanceLastMonth: bot.performanceLastMonth,
    performanceAllTime: bot.performanceAllTime
  });
  
  // For adding new items
  const [newFeature, setNewFeature] = useState('');
  const [newRequirement, setNewRequirement] = useState('');
  
  // Handle color scheme classes
  const colorSchemeClasses = {
    blue: {
      badge: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/10',
      icon: 'text-blue-500 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800/30'
    },
    green: {
      badge: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/10',
      icon: 'text-green-500 dark:text-green-400',
      border: 'border-green-200 dark:border-green-800/30'
    },
    purple: {
      badge: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/10',
      icon: 'text-purple-500 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800/30'
    },
    red: {
      badge: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/10',
      icon: 'text-red-500 dark:text-red-400',
      border: 'border-red-200 dark:border-red-800/30'
    },
    default: {
      badge: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-400',
      bg: 'bg-slate-50 dark:bg-slate-900/10',
      icon: 'text-slate-500 dark:text-slate-400',
      border: 'border-slate-200 dark:border-slate-800/30'
    }
  };
  
  const getColorByRisk = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400';
      case 'high': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-400';
    }
  };
  
  const riskLabel = {
    'low': 'Thấp',
    'medium': 'Trung bình',
    'high': 'Cao'
  }[bot.risk as 'low' | 'medium' | 'high'] || '';
  
  const riskColor = getColorByRisk(bot.risk);
  const colors = colorSchemeClasses[bot.colorScheme as keyof typeof colorSchemeClasses] || colorSchemeClasses.default;
  
  // Save handlers
  const saveGeneralInfo = () => {
    setBot({
      ...bot,
      name: generalForm.name,
      description: generalForm.description,
      exchange: generalForm.exchange,
      risk: generalForm.risk,
      minCapital: generalForm.minCapital,
      status: generalForm.status,
      colorScheme: generalForm.colorScheme
    });
    setEditingGeneral(false);
    toast.success('Thông tin chung đã được cập nhật');
  };
  
  const saveFeatures = () => {
    // Add the new feature if it's not empty
    const updatedFeatures = [...featuresForm];
    if (newFeature.trim()) {
      updatedFeatures.push(newFeature.trim());
      setNewFeature('');
    }
    
    setBot({
      ...bot,
      features: updatedFeatures
    });
    setFeaturesForm(updatedFeatures);
    setEditingFeatures(false);
    toast.success('Tính năng đã được cập nhật');
  };
  
  const saveRequirements = () => {
    // Add the new requirement if it's not empty
    const updatedRequirements = [...requirementsForm];
    if (newRequirement.trim()) {
      updatedRequirements.push(newRequirement.trim());
      setNewRequirement('');
    }
    
    setBot({
      ...bot,
      requirements: updatedRequirements
    });
    setRequirementsForm(updatedRequirements);
    setEditingRequirements(false);
    toast.success('Yêu cầu đã được cập nhật');
  };
  
  const savePerformance = () => {
    setBot({
      ...bot,
      performanceLastMonth: performanceForm.performanceLastMonth,
      performanceAllTime: performanceForm.performanceAllTime
    });
    setEditingPerformance(false);
    toast.success('Hiệu suất đã được cập nhật');
  };
  
  const removeFeature = (index: number) => {
    const updated = [...featuresForm];
    updated.splice(index, 1);
    setFeaturesForm(updated);
  };
  
  const removeRequirement = (index: number) => {
    const updated = [...requirementsForm];
    updated.splice(index, 1);
    setRequirementsForm(updated);
  };
  
  const cancelGeneral = () => {
    setGeneralForm({
      name: bot.name,
      description: bot.description,
      exchange: bot.exchange,
      risk: bot.risk,
      minCapital: bot.minCapital,
      status: bot.status,
      colorScheme: bot.colorScheme
    });
    setEditingGeneral(false);
  };
  
  const cancelFeatures = () => {
    setFeaturesForm([...bot.features]);
    setNewFeature('');
    setEditingFeatures(false);
  };
  
  const cancelRequirements = () => {
    setRequirementsForm([...bot.requirements]);
    setNewRequirement('');
    setEditingRequirements(false);
  };
  
  const cancelPerformance = () => {
    setPerformanceForm({
      performanceLastMonth: bot.performanceLastMonth,
      performanceAllTime: bot.performanceAllTime
    });
    setEditingPerformance(false);
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate('/admin/prop-bots')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">
              {bot.name}
            </h1>
          </div>
          
          {/* Delete Bot Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa Bot
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Xác nhận xóa Bot</DialogTitle>
                <DialogDescription>
                  Bạn có chắc chắn muốn xóa bot "{bot.name}"? Hành động này không thể hoàn tác.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => {}}>Hủy</Button>
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    toast.success(`Bot ${bot.name} đã được xóa`);
                    navigate('/admin/prop-bots');
                  }}
                >
                  Xóa Bot
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Chi tiết</TabsTrigger>
            <TabsTrigger value="accounts">Tài khoản</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* General Info Card */}
                <Card>
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle>Thông tin chung</CardTitle>
                      <CardDescription>
                        Thông tin cơ bản về Prop Trading Bot
                      </CardDescription>
                    </div>
                    {!editingGeneral ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setEditingGeneral(true)}
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Chỉnh sửa
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={cancelGeneral}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Hủy
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm" 
                          onClick={saveGeneralInfo}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Lưu
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    {!editingGeneral ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Avatar className={`h-14 w-14 ${colors.bg} ${colors.border} border-2`}>
                            <AvatarFallback className={colors.icon}>
                              <Bot className="h-6 w-6" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold">{bot.name}</h3>
                            <p className="text-muted-foreground">{bot.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          <Badge variant="outline" className={riskColor}>
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Rủi ro: {riskLabel}
                          </Badge>
                          <Badge variant="outline" className={colors.badge}>
                            <DollarSign className="h-3 w-3 mr-1" />
                            Vốn tối thiểu: {bot.minCapital}
                          </Badge>
                          <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-400">
                            <Users className="h-3 w-3 mr-1" />
                            {bot.subscribers} người đăng ký
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Tên Bot</Label>
                            <Input 
                              id="name" 
                              value={generalForm.name} 
                              onChange={(e) => setGeneralForm({...generalForm, name: e.target.value})}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="exchange">Sàn giao dịch</Label>
                            <Input 
                              id="exchange" 
                              value={generalForm.exchange} 
                              onChange={(e) => setGeneralForm({...generalForm, exchange: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="description">Mô tả</Label>
                          <Textarea 
                            id="description" 
                            value={generalForm.description} 
                            onChange={(e) => setGeneralForm({...generalForm, description: e.target.value})}
                            rows={3}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="risk">Mức độ rủi ro</Label>
                            <Select 
                              value={generalForm.risk} 
                              onValueChange={(value) => setGeneralForm({...generalForm, risk: value})}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn mức độ rủi ro" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Thấp</SelectItem>
                                <SelectItem value="medium">Trung bình</SelectItem>
                                <SelectItem value="high">Cao</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="minCapital">Vốn tối thiểu</Label>
                            <Input 
                              id="minCapital" 
                              value={generalForm.minCapital} 
                              onChange={(e) => setGeneralForm({...generalForm, minCapital: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="colorScheme">Màu sắc</Label>
                            <Select 
                              value={generalForm.colorScheme} 
                              onValueChange={(value) => setGeneralForm({...generalForm, colorScheme: value})}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn màu sắc" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="blue">Xanh dương</SelectItem>
                                <SelectItem value="green">Xanh lá</SelectItem>
                                <SelectItem value="purple">Tím</SelectItem>
                                <SelectItem value="red">Đỏ</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="status">Trạng thái</Label>
                            <div className="flex items-center justify-between rounded-md border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <Label htmlFor="status">Bot đang hoạt động</Label>
                              </div>
                              <Switch 
                                id="status" 
                                checked={generalForm.status === 'active'}
                                onCheckedChange={(checked) => 
                                  setGeneralForm({
                                    ...generalForm, 
                                    status: checked ? 'active' : 'inactive'
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Features Card */}
                <Card>
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                        Tính năng
                      </CardTitle>
                      <CardDescription>
                        Các tính năng chính của bot
                      </CardDescription>
                    </div>
                    {!editingFeatures ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setEditingFeatures(true)}
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Chỉnh sửa
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={cancelFeatures}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Hủy
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm" 
                          onClick={saveFeatures}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Lưu
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    {!editingFeatures ? (
                      <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                        {bot.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="space-y-4">
                        {featuresForm.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input 
                              value={feature} 
                              onChange={(e) => {
                                const updated = [...featuresForm];
                                updated[index] = e.target.value;
                                setFeaturesForm(updated);
                              }} 
                            />
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => removeFeature(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        
                        <div className="flex items-center gap-2">
                          <Input 
                            placeholder="Thêm tính năng mới" 
                            value={newFeature}
                            onChange={(e) => setNewFeature(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && newFeature.trim()) {
                                e.preventDefault();
                                setFeaturesForm([...featuresForm, newFeature.trim()]);
                                setNewFeature('');
                              }
                            }}
                          />
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => {
                              if (newFeature.trim()) {
                                setFeaturesForm([...featuresForm, newFeature.trim()]);
                                setNewFeature('');
                              }
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Requirements Card */}
                <Card>
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center">
                        <CircleAlert className="h-4 w-4 mr-2 text-amber-500" />
                        Yêu cầu
                      </CardTitle>
                      <CardDescription>
                        Các yêu cầu để sử dụng bot
                      </CardDescription>
                    </div>
                    {!editingRequirements ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setEditingRequirements(true)}
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Chỉnh sửa
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={cancelRequirements}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Hủy
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm" 
                          onClick={saveRequirements}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Lưu
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    {!editingRequirements ? (
                      <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                        {bot.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="space-y-4">
                        {requirementsForm.map((req, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input 
                              value={req} 
                              onChange={(e) => {
                                const updated = [...requirementsForm];
                                updated[index] = e.target.value;
                                setRequirementsForm(updated);
                              }} 
                            />
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => removeRequirement(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        
                        <div className="flex items-center gap-2">
                          <Input 
                            placeholder="Thêm yêu cầu mới" 
                            value={newRequirement}
                            onChange={(e) => setNewRequirement(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && newRequirement.trim()) {
                                e.preventDefault();
                                setRequirementsForm([...requirementsForm, newRequirement.trim()]);
                                setNewRequirement('');
                              }
                            }}
                          />
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => {
                              if (newRequirement.trim()) {
                                setRequirementsForm([...requirementsForm, newRequirement.trim()]);
                                setNewRequirement('');
                              }
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                {/* Performance Card */}
                <Card>
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center">
                        <BarChart2 className="h-4 w-4 mr-2 text-blue-500" />
                        Hiệu suất
                      </CardTitle>
                      <CardDescription>
                        Dữ liệu hiệu suất giao dịch
                      </CardDescription>
                    </div>
                    {!editingPerformance ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setEditingPerformance(true)}
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Chỉnh sửa
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={cancelPerformance}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Hủy
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm" 
                          onClick={savePerformance}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Lưu
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    {!editingPerformance ? (
                      <div className="grid grid-cols-1 gap-4">
                        <div className={`p-4 rounded-md ${colors.bg} ${colors.border} border`}>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Hiệu suất tháng trước</div>
                          <div className="text-2xl font-bold mt-1 flex items-center">
                            {bot.performanceLastMonth}
                            <TrendingUp className="ml-2 h-5 w-5 text-green-500" />
                          </div>
                        </div>
                        
                        <div className={`p-4 rounded-md ${colors.bg} ${colors.border} border`}>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Hiệu suất từ đầu</div>
                          <div className="text-2xl font-bold mt-1 flex items-center">
                            {bot.performanceAllTime}
                            <TrendingUp className="ml-2 h-5 w-5 text-green-500" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="performanceLastMonth">Hiệu suất tháng trước</Label>
                          <Input 
                            id="performanceLastMonth" 
                            value={performanceForm.performanceLastMonth} 
                            onChange={(e) => setPerformanceForm({...performanceForm, performanceLastMonth: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="performanceAllTime">Hiệu suất từ đầu</Label>
                          <Input 
                            id="performanceAllTime" 
                            value={performanceForm.performanceAllTime} 
                            onChange={(e) => setPerformanceForm({...performanceForm, performanceAllTime: e.target.value})}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Bot Info Card */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Thông tin Bot</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Sàn giao dịch
                      </div>
                      <div className="mt-1">{bot.exchange}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Loại bot
                      </div>
                      <div className="mt-1">Prop Trading</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Trạng thái
                      </div>
                      <div className="mt-1 flex items-center">
                        <span className={`inline-block w-2 h-2 rounded-full ${bot.status === 'active' ? 'bg-green-500' : 'bg-red-500'} mr-2`}></span>
                        {bot.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        ID Bot
                      </div>
                      <code className="mt-1 block bg-slate-50 dark:bg-slate-800 p-1.5 rounded text-xs">
                        {bot.id}
                      </code>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Người đăng ký
                      </div>
                      <div className="mt-1 flex items-center">
                        <Users className="h-4 w-4 mr-1 text-slate-400" />
                        {bot.subscribers} người dùng
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Preview Button */}
                <Button 
                  className="w-full"
                  onClick={() => window.open(`/prop-trading-bots/${bot.id}`, '_blank')}
                >
                  Xem trang người dùng
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="accounts">
            <Card>
              <CardHeader>
                <CardTitle>Tài khoản đã tích hợp</CardTitle>
                <CardDescription>
                  Quản lý tài khoản người dùng đã kết nối với bot này
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BotAccountsTable botId={botId || ''} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>TB365 Logs</CardTitle>
                <CardDescription>
                  Logs tín hiệu từ TradingView
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TradingViewLogs botId={botId || ''} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Coinstrat Logs</CardTitle>
                <CardDescription>
                  Logs tín hiệu từ Coinstrat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CoinstratLogs botId={botId || ''} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default PropBotDetail;

