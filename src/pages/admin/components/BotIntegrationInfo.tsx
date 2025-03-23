
import React from 'react';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Webhook, Key } from 'lucide-react';

interface BotIntegrationInfoProps {
  botId: string;
}

const BotIntegrationInfo: React.FC<BotIntegrationInfoProps> = ({ botId }) => {
  return (
    <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <CardHeader>
        <CardTitle>Thông tin Tích hợp</CardTitle>
        <CardDescription>
          Thông tin tích hợp API của bot này (chỉ hiển thị cho Admin)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-1 flex items-center gap-2">
            <Webhook className="h-4 w-4 text-primary" />
            Webhook URL
          </h3>
          <div className="flex items-center gap-2">
            <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md text-sm w-full font-mono border border-slate-200 dark:border-slate-700">
              https://api.tradebot365.com/webhook/{botId?.toLowerCase()}
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-1 flex items-center gap-2">
            <Key className="h-4 w-4 text-red-400" />
            Signal Token <span className="text-xs text-red-400">(Đã ẩn)</span>
          </h3>
          <div className="flex items-center gap-2">
            <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md text-sm w-full font-mono border border-slate-200 dark:border-slate-700">
              ************************
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-1">Token đã được ẩn đi vì lý do bảo mật</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotIntegrationInfo;
