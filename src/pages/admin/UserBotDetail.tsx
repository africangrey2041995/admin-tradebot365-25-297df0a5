
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TradingViewLogs from '@/components/bots/TradingViewLogs';
import CoinstratLogs from '@/components/bots/CoinstratLogs';

const UserBotDetail: React.FC = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/admin/user-bots')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-white">
            Chi tiết Bot Người Dùng
          </h1>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="integration">Tích hợp</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle className="text-black">Thông tin Bot</CardTitle>
              <CardDescription>
                Thông tin cơ bản về bot của người dùng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Thông tin bot sẽ hiển thị ở đây</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration">
          <Card>
            <CardHeader>
              <CardTitle className="text-black">Thông tin Tích hợp</CardTitle>
              <CardDescription>
                Thông tin API tích hợp cho bot này
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook" className="text-black">Webhook URL</Label>
                <Input
                  id="webhook"
                  className="bg-zinc-100 border-zinc-300 text-zinc-900"
                  readOnly
                  value="https://tb365.net/webhooks/bot-3201"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="token" className="text-black">Signal Token</Label>
                <Input
                  id="token"
                  className="bg-zinc-100 border-zinc-300 text-zinc-900"
                  readOnly
                  value="64a849aa-4ea9-4b89-a995-9c74f44855a7"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-black">TradingView Logs</CardTitle>
              <CardDescription>
                Lịch sử tín hiệu giao dịch từ TradingView
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TradingViewLogs botId={botId || ''} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-black">Coinstrat Logs</CardTitle>
              <CardDescription>
                Lịch sử tín hiệu giao dịch từ Coinstrat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CoinstratLogs botId={botId || ''} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserBotDetail;
