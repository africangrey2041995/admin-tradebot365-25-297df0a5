
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
  X
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
  challengeDuration
}) => {
  // State for edited values
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

  // Open/closed states for popovers
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
      return <span className="text-green-500">{perf}</span>;
    } else if (perf.startsWith('-')) {
      return <span className="text-red-500">{perf}</span>;
    }
    return <span>{perf}</span>;
  };

  const handleSaveDescription = () => {
    // In a real app, this would call an API to save the changes
    // For now, we'll just close the popover and show a toast
    setDescriptionPopoverOpen(false);
    toast.success("Đã cập nhật mô tả");
  };

  const handleSavePropFirm = () => {
    setPropFirmPopoverOpen(false);
    toast.success("Đã cập nhật Prop Firm");
  };

  const handleSaveExchange = () => {
    setExchangePopoverOpen(false);
    toast.success("Đã cập nhật sàn giao dịch");
  };

  const handleSaveMinCapital = () => {
    setMinCapitalPopoverOpen(false);
    toast.success("Đã cập nhật vốn tối thiểu");
  };

  const handleSaveMaxDrawdown = () => {
    setMaxDrawdownPopoverOpen(false);
    toast.success("Đã cập nhật drawdown tối đa");
  };

  const handleSaveChallengeDuration = () => {
    setChallengeDurationPopoverOpen(false);
    toast.success("Đã cập nhật thời gian thử thách");
  };

  const handleSavePerformanceLastMonth = () => {
    setPerformanceLastMonthPopoverOpen(false);
    toast.success("Đã cập nhật hiệu suất tháng trước");
  };

  const handleSavePerformanceAllTime = () => {
    setPerformanceAllTimePopoverOpen(false);
    toast.success("Đã cập nhật hiệu suất tổng");
  };

  const handleSaveStatus = () => {
    setStatusPopoverOpen(false);
    toast.success("Đã cập nhật trạng thái");
  };

  const handleSaveRisk = () => {
    setRiskPopoverOpen(false);
    toast.success("Đã cập nhật mức độ rủi ro");
  };

  return (
    <Card className="border-gray-700 bg-gray-800/50">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          {/* Bot Avatar */}
          <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${getColorSchemeClasses()}`}>
            <BarChart4 className="w-8 h-8 text-white" />
          </div>
          
          {/* Bot Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-white">{botId}</h3>
              
              {/* Status with Edit Button */}
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${getStatusColorClass()}`}></div>
                <span className="text-sm text-gray-400 ml-1">{BOT_STATUS_DISPLAY[editedStatus]}</span>
                
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
            
            {/* Description with Edit Button */}
            <div className="group relative mb-4">
              <p className="text-gray-300">{editedDescription}</p>
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
            
            {/* Bot Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="group relative">
                <p className="text-xs text-gray-400 mb-1 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  Ngày tạo
                </p>
                <p className="text-sm">{createdDate}</p>
              </div>
              <div className="group relative">
                <p className="text-xs text-gray-400 mb-1 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  Cập nhật
                </p>
                <p className="text-sm">{lastUpdated}</p>
              </div>
              
              {/* Exchange with Edit Button */}
              <div className="group relative">
                <p className="text-xs text-gray-400 mb-1 flex items-center">
                  <ArrowLeftRight className="w-3 h-3 mr-1" />
                  Sàn giao dịch
                </p>
                <div className="flex items-center">
                  <p className="text-sm">{editedExchange || 'Không xác định'}</p>
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
              
              {/* PropFirm with Edit Button */}
              <div className="group relative">
                <p className="text-xs text-gray-400 mb-1 flex items-center">
                  <Briefcase className="w-3 h-3 mr-1" />
                  Prop Firm
                </p>
                <div className="flex items-center">
                  <p className="text-sm">{editedPropFirm || 'Không xác định'}</p>
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
            
            {/* Performance Stats */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* Performance Last Month with Edit Button */}
              <div className="bg-gray-700/30 p-3 rounded-md group relative">
                <p className="text-xs text-gray-400 mb-1">Hiệu suất tháng trước</p>
                <div className="flex items-center">
                  <p className="text-xl font-bold">{formatPerformance(editedPerformanceLastMonth)}</p>
                  <Popover open={performanceLastMonthPopoverOpen} onOpenChange={setPerformanceLastMonthPopoverOpen}>
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
                        <h4 className="font-medium text-sm">Hiệu suất tháng trước</h4>
                        <Input 
                          value={editedPerformanceLastMonth}
                          onChange={(e) => setEditedPerformanceLastMonth(e.target.value)}
                          placeholder="Ví dụ: +12.5%"
                        />
                        <div className="flex justify-end gap-2 pt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setPerformanceLastMonthPopoverOpen(false)}
                          >
                            <X className="h-3 w-3 mr-1" /> Hủy
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={handleSavePerformanceLastMonth}
                          >
                            <Check className="h-3 w-3 mr-1" /> Lưu
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              {/* Performance All Time with Edit Button */}
              <div className="bg-gray-700/30 p-3 rounded-md group relative">
                <p className="text-xs text-gray-400 mb-1">Hiệu suất tổng</p>
                <div className="flex items-center">
                  <p className="text-xl font-bold">{formatPerformance(editedPerformanceAllTime)}</p>
                  <Popover open={performanceAllTimePopoverOpen} onOpenChange={setPerformanceAllTimePopoverOpen}>
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
                        <h4 className="font-medium text-sm">Hiệu suất tổng</h4>
                        <Input 
                          value={editedPerformanceAllTime}
                          onChange={(e) => setEditedPerformanceAllTime(e.target.value)}
                          placeholder="Ví dụ: +42.1%"
                        />
                        <div className="flex justify-end gap-2 pt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setPerformanceAllTimePopoverOpen(false)}
                          >
                            <X className="h-3 w-3 mr-1" /> Hủy
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={handleSavePerformanceAllTime}
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
            
            {/* Risk Level with Edit Button */}
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-gray-400">Mức độ rủi ro:</span>
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
            
            {/* Prop Trading Info Grid */}
            {(editedMinCapital || editedMaxDrawdown || editedChallengeDuration) && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {/* Min Capital with Edit Button */}
                {editedMinCapital && (
                  <div className="bg-gray-700/30 p-3 rounded-md group relative">
                    <p className="text-xs text-gray-400 mb-1 flex items-center">
                      <DollarSign className="w-3 h-3 mr-1" />
                      Vốn tối thiểu
                    </p>
                    <div className="flex items-center">
                      <p className="text-sm font-medium">{editedMinCapital}</p>
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
                
                {/* Max Drawdown with Edit Button */}
                {editedMaxDrawdown && (
                  <div className="bg-gray-700/30 p-3 rounded-md group relative">
                    <p className="text-xs text-gray-400 mb-1 flex items-center">
                      <Percent className="w-3 h-3 mr-1" />
                      Drawdown tối đa
                    </p>
                    <div className="flex items-center">
                      <p className="text-sm font-medium">{editedMaxDrawdown}</p>
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
                
                {/* Challenge Duration with Edit Button */}
                {editedChallengeDuration && (
                  <div className="bg-gray-700/30 p-3 rounded-md group relative">
                    <p className="text-xs text-gray-400 mb-1 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      Thời gian thử thách
                    </p>
                    <div className="flex items-center">
                      <p className="text-sm font-medium">{editedChallengeDuration}</p>
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

