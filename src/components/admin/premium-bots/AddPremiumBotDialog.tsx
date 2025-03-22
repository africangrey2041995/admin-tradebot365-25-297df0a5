
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface NewBotState {
  name: string;
  description: string;
  riskLevel: string;
  exchangeType: string;
  profitTarget: string;
  maxDrawdown: string;
  supportedAssets: string[];
  minInvestment: string;
  tradingStrategy: string;
  timeframe: string;
  indicatorsUsed: string;
  featureAdvancedEntries: boolean;
  featureAutomaticSl: boolean;
  featureDynamicTp: boolean;
  featureSmartFilters: boolean;
  maxActivePositions: string;
  maxLeverage: string;
}

interface AddPremiumBotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddBot: () => void;
  newBot: NewBotState;
  setNewBot: React.Dispatch<React.SetStateAction<NewBotState>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export const AddPremiumBotDialog: React.FC<AddPremiumBotDialogProps> = ({
  open,
  onOpenChange,
  onAddBot,
  newBot,
  setNewBot,
  activeTab,
  setActiveTab
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                      max={25}
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
                  <p className="text-sm text-zinc-400">
                    Sử dụng nhiều điều kiện phức tạp để xác định điểm vào tối ưu
                  </p>
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
                  <p className="text-sm text-zinc-400">
                    Tự động đặt stop loss dựa trên biến động thị trường
                  </p>
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
                  <p className="text-sm text-zinc-400">
                    Điều chỉnh take profit dựa trên điều kiện thị trường
                  </p>
                </div>
                <Switch
                  id="featureDynamicTp"
                  checked={newBot.featureDynamicTp}
                  onCheckedChange={(checked) => setNewBot({...newBot, featureDynamicTp: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="featureSmartFilters">Smart Filters</Label>
                  <p className="text-sm text-zinc-400">
                    Bộ lọc thông minh giúp tránh các tín hiệu giả
                  </p>
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
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-zinc-700 text-zinc-400">
            Hủy
          </Button>
          <Button onClick={onAddBot} className="bg-amber-500 hover:bg-amber-600 text-white">
            Tạo Bot
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
