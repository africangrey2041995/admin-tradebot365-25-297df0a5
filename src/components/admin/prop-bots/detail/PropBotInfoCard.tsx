import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BotRiskLevel, BotStatus, BOT_STATUS_DISPLAY } from '@/constants/botTypes';
import { 
  BarChart4, 
  Briefcase, 
  Calendar, 
  ArrowLeftRight, 
  DollarSign, 
  Percent, 
  Edit,
  Check,
  X,
  Users,
  Activity
} from 'lucide-react';
import { 
  Popover,
  PopoverTrigger,
  PopoverContent 
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { PropBot } from '@/types/bot';

interface PropBotInfoCardProps {
  botId: string;
  description: string;
  createdDate: string;
  lastUpdated: string;
  performanceLastMonth: string;
  performanceAllTime: string;
  propFirm?: string;
  exchange?: string;
  status: BotStatus;
  risk: BotRiskLevel;
  colorScheme?: string;
  minCapital?: string;
  maxDrawdown?: string;
  challengeDuration?: string;
  connectedAccounts: number;
  processedSignals: number;
  onUpdate?: (updatedData: Partial<PropBot>) => void;
}

const PropBotInfoCard: React.FC<PropBotInfoCardProps> = ({
  botId,
  description,
  createdDate,
  lastUpdated,
  performanceLastMonth,
  performanceAllTime,
  propFirm,
  exchange,
  status,
  risk,
  colorScheme = 'green',
  minCapital,
  maxDrawdown,
  challengeDuration,
  connectedAccounts,
  processedSignals,
  onUpdate = () => {}
}) => {
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedPropFirm, setEditedPropFirm] = useState(propFirm || '');
  const [editedExchange, setEditedExchange] = useState(exchange || '');
  const [editedMinCapital, setEditedMinCapital] = useState(minCapital || '');
  const [editedMaxDrawdown, setEditedMaxDrawdown] = useState(maxDrawdown || '');
  const [editedChallengeDuration, setEditedChallengeDuration] = useState(challengeDuration || '');
  const [editedPerformanceLastMonth, setEditedPerformanceLastMonth] = useState(performanceLastMonth);
  const [editedPerformanceAllTime, setEditedPerformanceAllTime] = useState(performanceAllTime);
  const [editedStatus, setEditedStatus] = useState(status);
  const [editedRisk, setEditedRisk] = useState(risk);

  const [descriptionPopoverOpen, setDescriptionPopoverOpen] = useState(false);
  const [propFirmPopoverOpen, setPropFirmPopoverOpen] = useState(false);
  const [exchangePopoverOpen, setExchangePopoverOpen] = useState(false);
  const [minCapitalPopoverOpen, setMinCapitalPopoverOpen] = useState(false);
  const [maxDrawdownPopoverOpen, setMaxDrawdownPopoverOpen] = useState(false);
  const [challengeDurationPopoverOpen, setChallengeDurationPopoverOpen] = useState(false);
  const [performanceLastMonthPopoverOpen, setPerformanceLastMonthPopoverOpen] = useState(false);
  const [performanceAllTimePopoverOpen, setPerformanceAllTimePopoverOpen] = useState(false);
  const [statusPopoverOpen, setStatusPopoverOpen] = useState(false);
  const [riskPopoverOpen, setRiskPopoverOpen] = useState(false);

  const getColorSchemeClasses = () => {
    switch (colorScheme) {
      case 'blue': return 'bg-blue-500/10 border-blue-500/30';
      case 'green': return 'bg-green-500/10 border-green-500/30';
      case 'red': return 'bg-red-500/10 border-red-500/30';
      case 'purple': return 'bg-purple-500/10 border-purple-500/30';
      default: return 'bg-slate-500/10 border-slate-500/30';
    }
  };

  const getStatusColorClass = () => {
    switch (editedStatus) {
      case BotStatus.ACTIVE: return 'bg-green-500';
      case BotStatus.INACTIVE: return 'bg-slate-500';
      case BotStatus.MAINTENANCE: return 'bg-blue-500';
      case BotStatus.ERROR: return 'bg-red-500';
      case BotStatus.SUSPENDED: return 'bg-orange-500';
      default: return 'bg-slate-500';
    }
  };

  const formatPerformance = (perf: string) => {
    if (perf.startsWith('+')) {
      return <span className="text-green-500 font-semibold">{perf}</span>;
    } else if (perf.startsWith('-')) {
      return <span className="text-red-500 font-semibold">{perf}</span>;
    }
    return <span className="text-white font-semibold">{perf}</span>;
  };

  const handleSaveDescription = () => {
    if (onUpdate) {
      onUpdate({ description: editedDescription });
    }
    setDescriptionPopoverOpen(false);
    toast.success("Đã cập nhật mô tả");
  };

  const handleSavePropFirm = () => {
    if (onUpdate) {
      onUpdate({ propFirm: editedPropFirm });
    }
    setPropFirmPopoverOpen(false);
    toast.success("Đã cập nhật Prop Firm");
  };

  const handleSaveExchange = () => {
    if (onUpdate) {
      onUpdate({ exchange: editedExchange });
    }
    setExchangePopoverOpen(false);
    toast.success("Đã cập nhật sàn giao dịch");
  };

  const handleSaveMinCapital = () => {
    if (onUpdate) {
      onUpdate({ minCapital: editedMinCapital });
    }
    setMinCapitalPopoverOpen(false);
    toast.success("Đã cập nhật vốn tối thiểu");
  };

  const handleSaveMaxDrawdown = () => {
    if (onUpdate) {
      onUpdate({ maxDrawdown: editedMaxDrawdown });
    }
    setMaxDrawdownPopoverOpen(false);
    toast.success("Đã cập nhật drawdown tối đa");
  };

  const handleSaveChallengeDuration = () => {
    if (onUpdate) {
      onUpdate({ challengeDuration: editedChallengeDuration });
    }
    setChallengeDurationPopoverOpen(false);
    toast.success("Đã cập nhật thời gian thử thách");
  };

  const handleSavePerformanceLastMonth = () => {
    if (onUpdate) {
      onUpdate({ performanceLastMonth: editedPerformanceLastMonth });
    }
    setPerformanceLastMonthPopoverOpen(false);
    toast.success("Đã cập nhật hiệu suất tháng trước");
  };

  const handleSavePerformanceAllTime = () => {
    if (onUpdate) {
      onUpdate({ performanceAllTime: editedPerformanceAllTime });
    }
    setPerformanceAllTimePopoverOpen(false);
    toast.success("Đã cập nhật hiệu suất tổng");
  };

  const handleSaveStatus = () => {
    if (onUpdate) {
      onUpdate({ status: editedStatus });
    }
    setStatusPopoverOpen(false);
    toast.success("Đã cập nhật trạng thái");
  };

  const handleSaveRisk = () => {
    if (onUpdate) {
      onUpdate({ risk: editedRisk });
    }
    setRiskPopoverOpen(false);
    toast.success("Đã cập nhật mức độ rủi ro");
  };

  return (
    <Card className="border-gray-700 bg-gray-800/50">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${getColorSchemeClasses()}`}>
            <BarChart4 className="w-8 h-8 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-white">{botId}</h3>
              
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${getStatusColorClass()}`}></div>
                <span className="text-sm text-gray-200 ml-1">{BOT_STATUS_DISPLAY[editedStatus]}</span>
                
                <Popover open={statusPopoverOpen} onOpenChange={setStatusPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 ml-1 text-gray-400 hover:text-white"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-3">
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Trạng thái Bot</h4>
                      <Select value={editedStatus} onValueChange={(value) => setEditedStatus(value as BotStatus)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={BotStatus.ACTIVE}>Đang hoạt động</SelectItem>
                          <SelectItem value={BotStatus.INACTIVE}>Không hoạt động</SelectItem>
                          <SelectItem value={BotStatus.MAINTENANCE}>Bảo trì</SelectItem>
                          <SelectItem value={BotStatus.ERROR}>Lỗi</SelectItem>
                          <SelectItem value={BotStatus.SUSPENDED}>Tạm ngưng</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex justify-end gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setStatusPopoverOpen(false)}
                        >
                          <X className="h-3 w-3 mr-1" /> Hủy
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={handleSaveStatus}
                        >
                          <Check className="h-3 w-3 mr-1" /> Lưu
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="group relative mb-4">
              <p className="text-gray-100">{editedDescription}</p>
              <Popover open={descriptionPopoverOpen} onOpenChange={setDescriptionPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-0 right-0 h-6 w-6 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-3">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Mô tả Bot</h4>
                    <textarea 
                      className="w-full p-2 rounded text-sm bg-gray-800 border border-gray-700 text-white"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      rows={3}
                    />
                    <div className="flex justify-end gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setDescriptionPopoverOpen(false)}
                      >
                        <X className="h-3 w-3 mr-1" /> Hủy
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={handleSaveDescription}
                      >
                        <Check className="h-3 w-3 mr-1" /> Lưu
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="group relative">
                <p className="text-xs text-gray-400 mb-1 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  Ngày tạo
                </p>
                <p className="text-sm text-white">{createdDate}</p>
              </div>
              <div className="group relative">
                <p className="text-xs text-gray-400 mb-1 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  Cập nhật
                </p>
                <p className="text-sm text-white">{lastUpdated}</p>
              </div>
              
              <div className="group relative">
                <p className="text-xs text-gray-400 mb-1 flex items-center">
                  <ArrowLeftRight className="w-3 h-3 mr-1" />
                  Sàn giao dịch
                </p>
                <div className="flex items-center">
                  <p className="text-sm text-white font-medium">{editedExchange || 'Không xác định'}</p>
                  <Popover open={exchangePopoverOpen} onOpenChange={setExchangePopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 ml-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-3">
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Sàn giao dịch</h4>
                        <Select value={editedExchange} onValueChange={setEditedExchange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Chọn sàn" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Binance">Binance</SelectItem>
                            <SelectItem value="Bybit">Bybit</SelectItem>
                            <SelectItem value="KuCoin">KuCoin</SelectItem>
                            <SelectItem value="OKX">OKX</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex justify-end gap-2 pt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setExchangePopoverOpen(false)}
                          >
                            <X className="h-3 w-3 mr-1" /> Hủy
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={handleSaveExchange}
                          >
                            <Check className="h-3 w-3 mr-1" /> Lưu
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="group relative">
                <p className="text-xs text-gray-400 mb-1 flex items-center">
                  <Briefcase className="w-3 h-3 mr-1" />
                  Prop Firm
                </p>
                <div className="flex items-center">
                  <p className="text-sm text-white font-medium">{editedPropFirm || 'Không xác định'}</p>
                  <Popover open={propFirmPopoverOpen} onOpenChange={setPropFirmPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 ml-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-3">
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Prop Firm</h4>
                        <Select value={editedPropFirm} onValueChange={setEditedPropFirm}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Chọn Prop Firm" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="FTMO">FTMO</SelectItem>
                            <SelectItem value="Coinstrat Pro">Coinstrat Pro</SelectItem>
                            <SelectItem value="The 5%ers">The 5%ers</SelectItem>
                            <SelectItem value="Earn2Trade">Earn2Trade</SelectItem>
                            <SelectItem value="TopstepTrader">TopstepTrader</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex justify-end gap-2 pt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setPropFirmPopoverOpen(false)}
                          >
                            <X className="h-3 w-3 mr-1" /> Hủy
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={handleSavePropFirm}
                          >
                            <Check className="h-3 w-3 mr-1" /> Lưu
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-700/50 p-3 rounded-md border border-gray-600/50 group relative">
                <p className="text-xs text-gray-400 mb-1 flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  Tài khoản kết nối
                </p>
                <div className="flex items-center">
                  <p className="text-xl font-bold text-white">{connectedAccounts}</p>
                </div>
              </div>
              
              <div className="bg-gray-700/50 p-3 rounded-md border border-gray-600/50 group relative">
                <p className="text-xs text-gray-400 mb-1 flex items-center">
                  <Activity className="w-3 h-3 mr-1" />
                  Tín hiệu đã xử lý
                </p>
                <div className="flex items-center">
                  <p className="text-xl font-bold text-white">{processedSignals}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-gray-300">Mức độ rủi ro:</span>
              <Badge variant="outline" className={editedRisk === BotRiskLevel.LOW ? 'bg-green-500/20 text-green-400' : 
                                                editedRisk === BotRiskLevel.MEDIUM ? 'bg-amber-500/20 text-amber-400' : 
                                                'bg-red-500/20 text-red-400'}>
                {editedRisk === BotRiskLevel.LOW ? 'Thấp' : 
                 editedRisk === BotRiskLevel.MEDIUM ? 'Trung bình' : 'Cao'}
              </Badge>
              <Popover open={riskPopoverOpen} onOpenChange={setRiskPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 ml-1 text-gray-400 hover:text-white"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-3">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Mức độ rủi ro</h4>
                    <Select value={editedRisk} onValueChange={(value) => setEditedRisk(value as BotRiskLevel)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn mức độ rủi ro" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={BotRiskLevel.LOW}>Thấp</SelectItem>
                        <SelectItem value={BotRiskLevel.MEDIUM}>Trung bình</SelectItem>
                        <SelectItem value={BotRiskLevel.HIGH}>Cao</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex justify-end gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setRiskPopoverOpen(false)}
                      >
                        <X className="h-3 w-3 mr-1" /> Hủy
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={handleSaveRisk}
                      >
                        <Check className="h-3 w-3 mr-1" /> Lưu
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            {(editedMinCapital || editedMaxDrawdown || editedChallengeDuration) && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {editedMinCapital && (
                  <div className="bg-gray-700/50 p-3 rounded-md border border-gray-600/50 group relative">
                    <p className="text-xs text-gray-400 mb-1 flex items-center">
                      <DollarSign className="w-3 h-3 mr-1" />
                      Vốn tối thiểu
                    </p>
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-white">{editedMinCapital}</p>
                      <Popover open={minCapitalPopoverOpen} onOpenChange={setMinCapitalPopoverOpen}>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 ml-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56 p-3">
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm">Vốn tối thiểu</h4>
                            <Input 
                              value={editedMinCapital}
                              onChange={(e) => setEditedMinCapital(e.target.value)}
                              placeholder="Ví dụ: $5,000"
                            />
                            <div className="flex justify-end gap-2 pt-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setMinCapitalPopoverOpen(false)}
                              >
                                <X className="h-3 w-3 mr-1" /> Hủy
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={handleSaveMinCapital}
                              >
                                <Check className="h-3 w-3 mr-1" /> Lưu
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )}
                
                {editedMaxDrawdown && (
                  <div className="bg-gray-700/50 p-3 rounded-md border border-gray-600/50 group relative">
                    <p className="text-xs text-gray-400 mb-1 flex items-center">
                      <Percent className="w-3 h-3 mr-1" />
                      Drawdown tối đa
                    </p>
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-white">{editedMaxDrawdown}</p>
                      <Popover open={maxDrawdownPopoverOpen} onOpenChange={setMaxDrawdownPopoverOpen}>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 ml-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56 p-3">
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm">Drawdown tối đa</h4>
                            <Input 
                              value={editedMaxDrawdown}
                              onChange={(e) => setEditedMaxDrawdown(e.target.value)}
                              placeholder="Ví dụ: 5%"
                            />
                            <div className="flex justify-end gap-2 pt-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setMaxDrawdownPopoverOpen(false)}
                              >
                                <X className="h-3 w-3 mr-1" /> Hủy
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={handleSaveMaxDrawdown}
                              >
                                <Check className="h-3 w-3 mr-1" /> Lưu
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )}
                
                {editedChallengeDuration && (
                  <div className="bg-gray-700/50 p-3 rounded-md border border-gray-600/50 group relative">
                    <p className="text-xs text-gray-400 mb-1 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      Thời gian thử thách
                    </p>
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-white">{editedChallengeDuration}</p>
                      <Popover open={challengeDurationPopoverOpen} onOpenChange={setChallengeDurationPopoverOpen}>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 ml-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56 p-3">
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm">Thời gian thử thách</h4>
                            <Input 
                              value={editedChallengeDuration}
                              onChange={(e) => setEditedChallengeDuration(e.target.value)}
                              placeholder="Ví dụ: 30 ngày"
                            />
                            <div className="flex justify-end gap-2 pt-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setChallengeDurationPopoverOpen(false)}
                              >
                                <X className="h-3 w-3 mr-1" /> Hủy
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={handleSaveChallengeDuration}
                              >
                                <Check className="h-3 w-3 mr-1" /> Lưu
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropBotInfoCard;
