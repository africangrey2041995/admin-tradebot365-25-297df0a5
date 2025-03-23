
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Bell, Filter } from 'lucide-react';
import ErrorSignalsTable from '@/components/bots/error-signals/ErrorSignalsTable';
import { useErrorSignals } from '@/hooks/useErrorSignals';
import UserLayout from '@/components/layout/UserLayout';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { useUser } from '@/hooks/use-user';

const Signals = () => {
  const [activeTab, setActiveTab] = useState('errors');
  const { user } = useUser();
  const userId = user?.id || '';
  
  const {
    errorSignals,
    unreadErrors,
    loading,
    error,
    handleMarkAsRead,
    refreshErrorSignals
  } = useErrorSignals(userId);

  return (
    <UserLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Quản Lý Tín Hiệu</h1>
          </div>

          <Alert variant="default" className="bg-amber-950/30 border-amber-900">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Chú ý</AlertTitle>
            <AlertDescription>
              Các tín hiệu lỗi cần được giám sát và xử lý để đảm bảo bot giao dịch hoạt động ổn định.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Quản Lý Tín Hiệu</CardTitle>
              <CardDescription>
                Giám sát và quản lý các tín hiệu giao dịch từ hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue="errors"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="w-full bg-zinc-800/50 mb-6">
                  <TabsTrigger 
                    value="errors"
                    className="flex-1 data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Tín Hiệu Lỗi
                  </TabsTrigger>
                  <TabsTrigger 
                    value="all"
                    className="flex-1 data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Tất Cả Tín Hiệu
                  </TabsTrigger>
                  <TabsTrigger 
                    value="filtered"
                    className="flex-1 data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Tìm Kiếm & Lọc
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="errors" className="mt-0">
                  <ErrorBoundary>
                    <ErrorSignalsTable 
                      errorSignals={errorSignals}
                      unreadErrors={unreadErrors}
                      onMarkAsRead={handleMarkAsRead}
                      loading={loading}
                      error={error}
                      onRefresh={refreshErrorSignals}
                    />
                  </ErrorBoundary>
                </TabsContent>

                <TabsContent value="all" className="mt-0">
                  <div className="py-12 text-center text-muted-foreground">
                    <p>Tính năng đang được phát triển.</p>
                    <p className="text-sm">Tất cả tín hiệu sẽ được hiển thị tại đây.</p>
                  </div>
                </TabsContent>

                <TabsContent value="filtered" className="mt-0">
                  <div className="py-12 text-center text-muted-foreground">
                    <p>Tính năng đang được phát triển.</p>
                    <p className="text-sm">Bộ lọc tìm kiếm nâng cao sẽ được thêm tại đây.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </UserLayout>
  );
};

export default Signals;
