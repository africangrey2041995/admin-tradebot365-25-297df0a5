
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import ErrorSignals from '@/components/bots/ErrorSignals';
import { BotType } from '@/constants/botTypes';

// Mock admin user ID for admin pages
const ADMIN_USER_ID = 'ADMIN-001';

const BotErrors = () => {
  const [activeTab, setActiveTab] = useState('user-bots');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Quản Lý Lỗi Bot</h1>
        </div>

        <Alert variant="destructive" className="bg-red-950/30 border-red-900">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Chú ý</AlertTitle>
          <AlertDescription>
            Những lỗi được hiển thị ở đây cần được xử lý ngay để đảm bảo hệ thống hoạt động ổn định.
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
              <TabsList className="w-full bg-zinc-800/50 mb-6">
                <TabsTrigger 
                  value="user-bots"
                  className="flex-1 data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
                >
                  Bot Người Dùng
                </TabsTrigger>
                <TabsTrigger 
                  value="premium-bots"
                  className="flex-1 data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
                >
                  Premium Bots
                </TabsTrigger>
                <TabsTrigger 
                  value="prop-bots"
                  className="flex-1 data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
                >
                  Prop Trading Bots
                </TabsTrigger>
              </TabsList>

              <TabsContent value="user-bots" className="mt-0">
                <ErrorSignals botType={BotType.USER_BOT} userId={ADMIN_USER_ID} />
              </TabsContent>

              <TabsContent value="premium-bots" className="mt-0">
                <ErrorSignals botType={BotType.PREMIUM_BOT} userId={ADMIN_USER_ID} />
              </TabsContent>

              <TabsContent value="prop-bots" className="mt-0">
                <ErrorSignals botType={BotType.PROP_BOT} userId={ADMIN_USER_ID} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default BotErrors;
