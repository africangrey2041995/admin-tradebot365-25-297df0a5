
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Webhook, Key, Copy, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface BotIntegrationInfoProps {
  botId: string;
  isAdmin?: boolean;
  signalToken?: string;
}

const BotIntegrationInfo: React.FC<BotIntegrationInfoProps> = ({ 
  botId, 
  isAdmin = false,
  signalToken: propSignalToken
}) => {
  const [showToken, setShowToken] = useState(false);
  
  // Webhook URL được tạo từ botId
  const webhookUrl = `https://api.tradebot365.com/webhook/${botId?.toLowerCase()}`;
  
  // Sử dụng signalToken được truyền vào từ props, hoặc tạo mới nếu không có
  const signalToken = propSignalToken || `tb365_${botId?.toLowerCase()}_${Math.random().toString(36).substring(2, 15)}`;
  
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} đã được sao chép vào clipboard`);
  };

  const toggleShowToken = () => {
    // Only allow toggling if not an admin view
    if (!isAdmin) {
      setShowToken(!showToken);
    }
  };

  return (
    <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <CardHeader>
        <CardTitle>Thông tin Tích hợp TradingView</CardTitle>
        <CardDescription>
          Thông tin tích hợp API của bot này để kết nối với TradingView Alerts
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
              {webhookUrl}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => copyToClipboard(webhookUrl, 'Webhook URL')}
              className="shrink-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Sử dụng URL này để cài đặt trong Tradingview Alert
          </p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-1 flex items-center gap-2">
            <Key className="h-4 w-4 text-red-400" />
            Signal Token
          </h3>
          <div className="flex items-center gap-2">
            <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md text-sm w-full font-mono border border-slate-200 dark:border-slate-700">
              {isAdmin ? (
                showToken ? signalToken : '••••••••••••••••••••••••••••••'
              ) : (
                '••••••••••••••••••••••••••••••'
              )}
            </div>
            {isAdmin && (
              <>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setShowToken(!showToken)}
                  className="shrink-0"
                >
                  {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                {showToken && (
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => copyToClipboard(signalToken, 'Signal Token')}
                    className="shrink-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Token này cần được bao gồm trong message của TradingView Alert để xác thực
            {!isAdmin && <span className="text-amber-500 ml-1">(Ẩn cho người dùng không phải admin)</span>}
          </p>
        </div>
        
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-4 rounded-md mt-4">
          <h4 className="font-medium text-amber-800 dark:text-amber-400 mb-2">Mẫu TradingView Alert Message</h4>
          <pre className="bg-white dark:bg-slate-900 border border-amber-100 dark:border-amber-900/50 p-3 rounded text-xs overflow-auto text-slate-700 dark:text-slate-200">
            {`{{strategy.order.alert_message}}`}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotIntegrationInfo;
