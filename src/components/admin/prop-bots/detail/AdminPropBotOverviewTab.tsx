
import React, { useState } from 'react';
import { BarChart2, Users, Settings, FileText, AlertCircle, Pencil } from 'lucide-react';
import EditableFeaturesCard from './EditableFeaturesCard';
import EditableRequirementsCard from './EditableRequirementsCard';
import EditableChallengeRulesCard from './EditableChallengeRulesCard';
import { PropBot } from '@/types/bot';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BotType } from '@/constants/botTypes';

interface AdminPropBotOverviewTabProps {
  propBot: PropBot;
  botStats: {
    totalTrades: number;
    winRate: string;
    profitFactor: number;
    sharpeRatio: number;
    currentDrawdown: string;
  };
  botInfo: {
    createdDate: string;
    lastUpdated: string;
    botId: string;
  };
  challengeRules: Record<string, string[]>;
  onUpdateBot?: (updatedData: Partial<PropBot>) => void;
  onUpdateChallengeRules?: (propFirm: string, rules: string[]) => void;
}

const AdminPropBotOverviewTab: React.FC<AdminPropBotOverviewTabProps> = ({
  propBot,
  botStats,
  botInfo,
  challengeRules,
  onUpdateBot = () => {},
  onUpdateChallengeRules = () => {}
}) => {
  // Initial features and requirements
  const [features, setFeatures] = useState([
    'Tối ưu hóa để vượt qua các bài kiểm tra Prop Trading',
    'Quản lý rủi ro tự động theo yêu cầu của Prop Firm',
    'Báo cáo hiệu suất chi tiết theo các tiêu chí đánh giá Prop Trading',
    'Chiến lược giao dịch nhất quán với tỷ lệ win cao'
  ]);
  
  const [requirements, setRequirements] = useState([
    `Vốn tối thiểu ${propBot.minCapital}`,
    'Tài khoản Coinstrat Pro đã xác minh',
    'Phù hợp với giai đoạn Challenger hoặc Verification'
  ]);

  const coinstratRules = challengeRules["Coinstrat Pro"] || [];
  
  // State for bot info edit dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    botType: propBot.type || BotType.PROP_BOT,
    exchange: propBot.exchange || '',
    propFirm: propBot.propFirm || '',
    challengeDuration: propBot.challengeDuration || ''
  });

  const handleUpdateFeatures = (updatedFeatures: string[]) => {
    setFeatures(updatedFeatures);
    // Here you would typically update the backend
    console.log('Features updated:', updatedFeatures);
    toast.success('Đã cập nhật tính năng bot');
  };

  const handleUpdateRequirements = (updatedRequirements: string[]) => {
    setRequirements(updatedRequirements);
    // Here you would typically update the backend
    console.log('Requirements updated:', updatedRequirements);
    toast.success('Đã cập nhật yêu cầu bot');
  };

  const handleUpdateChallengeRules = (updatedRules: string[]) => {
    onUpdateChallengeRules("Coinstrat Pro", updatedRules);
  };
  
  const handleEditButtonClick = () => {
    setIsEditDialogOpen(true);
  };
  
  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleEditFormSubmit = () => {
    onUpdateBot({
      type: BotType.PROP_BOT, // Always use the enum value, not a string
      exchange: editFormData.exchange,
      propFirm: editFormData.propFirm,
      challengeDuration: editFormData.challengeDuration
    });
    setIsEditDialogOpen(false);
    toast.success('Thông tin Bot đã được cập nhật');
  };

  return (
    <div className="space-y-6">
      {/* Admin Dashboard Summary with real metrics */}
      <Card className="border border-neutral-200 dark:border-neutral-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <BarChart2 className="h-5 w-5 mr-2 text-primary" />
            Thông tin Tổng quan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
              <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1 flex items-center">
                <Users className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" />
                Người dùng tích hợp
              </div>
              <div className="text-2xl font-bold">{propBot.users || 0}</div>
            </div>
            
            <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
              <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1 flex items-center">
                <Settings className="h-4 w-4 mr-1 text-purple-600 dark:text-purple-400" />
                Prop Firm
              </div>
              <div className="text-2xl font-bold">{propBot.propFirm || "Chưa xác định"}</div>
            </div>
            
            <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
              <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1 flex items-center">
                <FileText className="h-4 w-4 mr-1 text-green-600 dark:text-green-400" />
                Thời gian Challenge
              </div>
              <div className="text-2xl font-bold">{propBot.challengeDuration || "30 ngày"}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Notice card about performance metrics */}
          <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800 dark:text-amber-300">Thông báo về dữ liệu hiệu suất</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                    Hiện tại hệ thống chưa theo dõi chi tiết hiệu suất giao dịch thực tế. 
                    Các số liệu hiển thị là mục tiêu cho người dùng cần đạt được trong quá trình 
                    tham gia Prop Trading Challenge.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Editable Challenge Rules Card */}
          <EditableChallengeRulesCard 
            rules={coinstratRules}
            onUpdate={handleUpdateChallengeRules}
          />
          
          {/* Admin-only editable cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditableFeaturesCard 
              features={features} 
              onUpdate={handleUpdateFeatures}
            />
            
            <EditableRequirementsCard 
              requirements={requirements} 
              onUpdate={handleUpdateRequirements}
            />
          </div>
        </div>
        
        {/* Right column - Info cards */}
        <div className="space-y-6">
          <Card className="border border-neutral-200 dark:border-neutral-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Mục tiêu Bot</CardTitle>
              <Button variant="ghost" size="sm" onClick={handleEditButtonClick}>
                <Pencil className="h-4 w-4 mr-1" />
                Chỉnh sửa
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-600 dark:text-neutral-400">Tổng giao dịch mục tiêu</span>
                  <span className="font-medium">{botStats.totalTrades}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-600 dark:text-neutral-400">Tỷ lệ thắng mục tiêu</span>
                  <span className="font-medium">{botStats.winRate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-600 dark:text-neutral-400">Hệ số lợi nhuận mục tiêu</span>
                  <span className="font-medium">{botStats.profitFactor}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-600 dark:text-neutral-400">Tỷ lệ Sharpe mục tiêu</span>
                  <span className="font-medium">{botStats.sharpeRatio}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-600 dark:text-neutral-400">Drawdown tối đa cho phép</span>
                  <span className="font-medium">{botStats.currentDrawdown}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-neutral-200 dark:border-neutral-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Thông tin Bot</CardTitle>
              <Button variant="ghost" size="sm" onClick={handleEditButtonClick}>
                <Pencil className="h-4 w-4 mr-1" />
                Chỉnh sửa
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-600 dark:text-neutral-400">ID Bot</span>
                  <span className="font-medium">{botInfo.botId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-600 dark:text-neutral-400">Ngày tạo</span>
                  <span className="font-medium">{botInfo.createdDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-600 dark:text-neutral-400">Cập nhật lần cuối</span>
                  <span className="font-medium">{botInfo.lastUpdated}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-600 dark:text-neutral-400">Prop Firm</span>
                  <span className="font-medium">{propBot.propFirm || "Chưa xác định"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-600 dark:text-neutral-400">Sàn giao dịch</span>
                  <span className="font-medium">{propBot.exchange || "Chưa xác định"}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-600 dark:text-neutral-400">Thời gian Challenge</span>
                  <span className="font-medium">{propBot.challengeDuration || "30 ngày"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Admin Notes Card */}
          <Card className="border border-neutral-200 dark:border-neutral-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Admin Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea 
                className="w-full min-h-[150px] p-2 text-sm rounded border border-neutral-200 dark:border-neutral-800 bg-transparent" 
                placeholder="Add admin notes here... (Only visible to admins)"
              />
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Edit dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin Bot</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="botType" className="text-right">
                Loại Bot
              </Label>
              <Input
                id="botType"
                name="botType"
                value={editFormData.botType}
                onChange={handleEditFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="exchange" className="text-right">
                Sàn giao dịch
              </Label>
              <Input
                id="exchange"
                name="exchange"
                value={editFormData.exchange}
                onChange={handleEditFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="propFirm" className="text-right">
                Prop Firm
              </Label>
              <Input
                id="propFirm"
                name="propFirm"
                value={editFormData.propFirm}
                onChange={handleEditFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="challengeDuration" className="text-right">
                Thời gian Challenge
              </Label>
              <Input
                id="challengeDuration"
                name="challengeDuration"
                value={editFormData.challengeDuration}
                onChange={handleEditFormChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleEditFormSubmit}>
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPropBotOverviewTab;
