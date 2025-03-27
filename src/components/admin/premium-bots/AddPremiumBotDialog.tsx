
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
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Star, Sparkles, Trophy } from 'lucide-react';

export interface NewBotState {
  name: string;
  description: string;
  riskLevel: string;
  exchange: string;
  maxDrawdown: string;
  supportedAssets: string[];
  minCapital: string;
  potentialProfit: string;
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
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
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="general">Thông tin chung</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
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
                  <Label htmlFor="exchange">Sàn giao dịch</Label>
                  <Select 
                    value={newBot.exchange} 
                    onValueChange={(value) => setNewBot({...newBot, exchange: value})}
                  >
                    <SelectTrigger id="exchange" className="bg-zinc-800 border-zinc-700 text-white">
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
                  <Label htmlFor="minCapital">Đầu tư tối thiểu (USDT)</Label>
                  <Input
                    id="minCapital"
                    type="number"
                    placeholder="ví dụ: 100"
                    className="bg-zinc-800 border-zinc-700 text-white"
                    value={newBot.minCapital}
                    onChange={(e) => setNewBot({...newBot, minCapital: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="maxDrawdown">Drawdown tối đa (%)</Label>
                  <Input
                    id="maxDrawdown"
                    type="number"
                    placeholder="ví dụ: 5"
                    className="bg-zinc-800 border-zinc-700 text-white"
                    value={newBot.maxDrawdown}
                    onChange={(e) => setNewBot({...newBot, maxDrawdown: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="potentialProfit">Lợi nhuận dự kiến (%/tháng)</Label>
                <Input
                  id="potentialProfit"
                  type="text"
                  placeholder="ví dụ: 5-10%"
                  className="bg-zinc-800 border-zinc-700 text-white"
                  value={newBot.potentialProfit}
                  onChange={(e) => setNewBot({...newBot, potentialProfit: e.target.value})}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="marketing" className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                  <div>
                    <Label htmlFor="isFeatured">Đánh dấu là Bot nổi bật</Label>
                    <p className="text-sm text-zinc-400">
                      Hiển thị nhãn "Nổi bật" và ưu tiên trong danh sách
                    </p>
                  </div>
                </div>
                <Switch
                  id="isFeatured"
                  checked={newBot.isFeatured}
                  onCheckedChange={(checked) => setNewBot({...newBot, isFeatured: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  <div>
                    <Label htmlFor="isNew">Đánh dấu là Bot mới</Label>
                    <p className="text-sm text-zinc-400">
                      Hiển thị nhãn "Mới" để thu hút sự chú ý
                    </p>
                  </div>
                </div>
                <Switch
                  id="isNew"
                  checked={newBot.isNew}
                  onCheckedChange={(checked) => setNewBot({...newBot, isNew: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-emerald-500 fill-emerald-500" />
                  <div>
                    <Label htmlFor="isBestSeller">Đánh dấu là Best Seller</Label>
                    <p className="text-sm text-zinc-400">
                      Hiển thị nhãn "Best Seller" để tăng độ tin cậy
                    </p>
                  </div>
                </div>
                <Switch
                  id="isBestSeller"
                  checked={newBot.isBestSeller}
                  onCheckedChange={(checked) => setNewBot({...newBot, isBestSeller: checked})}
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

