
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, Webhook, Key } from 'lucide-react';
import { toast } from 'sonner';

interface ConnectionSettingsCardProps {
  webhookUrl: string;
  signalToken: string;
}

const ConnectionSettingsCard = ({ webhookUrl, signalToken }: ConnectionSettingsCardProps) => {
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold">Connection Settings</CardTitle>
        <CardDescription>
          Use these settings to connect TradingView signals to this bot
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Webhook className="h-5 w-5 text-primary" />
              Webhook URL
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              This is the URL you should use in your TradingView alert message settings.
            </p>
            <div className="relative">
              <div className="flex items-center border rounded-md bg-slate-50 dark:bg-zinc-900 pl-4 pr-2 py-2">
                <code className="text-sm flex-grow break-all">{webhookUrl}</code>
                <div className="flex gap-1 ml-2">
                  <Button 
                    size="icon" 
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(webhookUrl, 'Webhook URL')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => window.open(webhookUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" />
              Signal Token
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Use this token in your TradingView alert to authenticate your signals.
            </p>
            <div className="relative">
              <div className="flex items-center border rounded-md bg-slate-50 dark:bg-zinc-900 pl-4 pr-2 py-2">
                <code className="text-sm flex-grow">{signalToken}</code>
                <Button 
                  size="icon" 
                  variant="ghost"
                  className="h-8 w-8 ml-2"
                  onClick={() => copyToClipboard(signalToken, 'Signal Token')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
            <h4 className="font-medium text-amber-800 mb-2">Example TradingView Alert Message</h4>
            <pre className="bg-white border border-amber-100 p-3 rounded text-xs overflow-auto text-slate-700">
{`{{strategy.order.alert_message}}`}
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionSettingsCard;
