
import React, { useState } from 'react';
import { BarChart2, Users, Settings, FileText, AlertCircle } from 'lucide-react';
import EditableFeaturesCard from './EditableFeaturesCard';
import EditableRequirementsCard from './EditableRequirementsCard';
import { PropBot } from '@/types/bot';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
}

const AdminPropBotOverviewTab: React.FC<AdminPropBotOverviewTabProps> = ({
  propBot,
  botStats,
  botInfo,
  challengeRules,
  onUpdateBot = () => {}
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

  const [selectedPropFirm, setSelectedPropFirm] = useState<string>("Default");

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

  // Get the challenge rules for the selected prop firm
  const currentRules = challengeRules[selectedPropFirm] || challengeRules["Default"];

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
          
          {/* Challenge Rules Card - with tabs for different prop firms */}
          <Card className="border border-neutral-200 dark:border-neutral-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <FileText className="h-4 w-4 mr-2 text-primary" />
                Quy tắc Challenge theo Prop Firm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedPropFirm} onValueChange={setSelectedPropFirm} className="w-full">
                <TabsList className="mb-4">
                  {Object.keys(challengeRules).map(firm => (
                    <TabsTrigger key={firm} value={firm}>
                      {firm}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {Object.entries(challengeRules).map(([firm, rules]) => (
                  <TabsContent key={firm} value={firm}>
                    <ul className="space-y-2">
                      {rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 text-sm font-medium">
                            {idx + 1}
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
          
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
            <CardContent className="p-6">
              <h3 className="font-medium mb-3 text-lg">Mục tiêu Bot</h3>
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
            <CardContent className="p-6">
              <h3 className="font-medium mb-3 text-lg">Thông tin Bot</h3>
              <div className="space-y-2">
                <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-600 dark:text-neutral-400">ID Bot</span>
                  <span className="font-medium">{botInfo.botId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-600 dark:text-neutral-400">Ngày tạo</span>
                  <span className="font-medium">{botInfo.createdDate}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-600 dark:text-neutral-400">Cập nhật lần cuối</span>
                  <span className="font-medium">{botInfo.lastUpdated}</span>
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
    </div>
  );
};

export default AdminPropBotOverviewTab;
