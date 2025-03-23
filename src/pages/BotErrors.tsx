
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import ErrorSignals from '@/components/bots/ErrorSignals';
import { useUser } from '@clerk/clerk-react';

const BotErrors = () => {
  const [activeTab, setActiveTab] = useState('user-bots');
  const { user } = useUser();
  const userId = user?.id || '';

  return (
    <MainLayout title="Quản Lý Lỗi Bot">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex flex-col gap-6">
          <Alert variant="destructive" className="bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Chú ý</AlertTitle>
            <AlertDescription>
              Những lỗi được hiển thị ở đây cần được xử lý ngay để đảm bảo hệ thống của bạn hoạt động ổn định.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Lỗi Kết Nối Bot</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue="user-bots"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="user-bots" className="flex-1">
                    Bot Người Dùng
                  </TabsTrigger>
                  <TabsTrigger value="premium-bots" className="flex-1">
                    Premium Bots
                  </TabsTrigger>
                  <TabsTrigger value="prop-bots" className="flex-1">
                    Prop Trading Bots
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="user-bots" className="mt-0">
                  <ErrorSignals botId="USER-BOTS" userId={userId} />
                </TabsContent>

                <TabsContent value="premium-bots" className="mt-0">
                  <ErrorSignals botId="PREMIUM-BOTS" userId={userId} />
                </TabsContent>

                <TabsContent value="prop-bots" className="mt-0">
                  <ErrorSignals botId="PROP-BOTS" userId={userId} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default BotErrors;
