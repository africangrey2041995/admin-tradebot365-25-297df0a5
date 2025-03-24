
import React, { useState } from 'react';
import { Share, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';

interface PropBotApiIntegrationCardProps {
  webhookUrl: string;
  apiToken: string;
}

const PropBotApiIntegrationCard: React.FC<PropBotApiIntegrationCardProps> = ({
  webhookUrl,
  apiToken
}) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    
    toast.success(`Đã sao chép ${label}`, {
      duration: 2000,
    });
    
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Share className="h-5 w-5 mr-2 text-primary" />
          API Integration
        </CardTitle>
        <CardDescription>
          Thông tin tích hợp API cho Prop Bot này
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">Webhook URL</div>
          <div className="flex items-center">
            <div className="bg-muted p-2 rounded-md flex-1 text-sm font-mono truncate">
              {webhookUrl}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-2"
              onClick={() => handleCopy(webhookUrl, 'Webhook URL')}
            >
              {copied === 'Webhook URL' ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm font-medium">API Token</div>
          <div className="flex items-center">
            <div className="bg-muted p-2 rounded-md flex-1 text-sm font-mono truncate">
              {apiToken}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-2"
              onClick={() => handleCopy(apiToken, 'API Token')}
            >
              {copied === 'API Token' ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Sử dụng token này để xác thực khi gửi request tới webhook URL.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropBotApiIntegrationCard;
