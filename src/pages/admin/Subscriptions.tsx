
import React from 'react';
import { useSubscriptionManagement } from '@/hooks/admin/useSubscriptionManagement';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SubscriptionsTable } from '@/components/admin/subscriptions/SubscriptionsTable';
import { SubscriptionsHeader } from '@/components/admin/subscriptions/SubscriptionsHeader';
import { EditSubscriptionDialog } from '@/components/admin/subscriptions/EditSubscriptionDialog';
import { CancelSubscriptionDialog } from '@/components/admin/subscriptions/CancelSubscriptionDialog';
import { RenewSubscriptionDialog } from '@/components/admin/subscriptions/RenewSubscriptionDialog';

const SubscriptionsPage: React.FC = () => {
  const {
    subscriptions,
    isLoading,
    error,
    selectedSubscription,
    statusFilter,
    isEditDialogOpen,
    isCancelDialogOpen,
    isRenewDialogOpen,
    isSubmitting,
    isCancelling,
    isRenewing,
    handleSearch,
    handleStatusFilterChange,
    handleEditSubscription,
    handleCancelSubscriptionClick,
    handleRenewSubscriptionClick,
    handleUpdateSubscription,
    handleConfirmCancel,
    handleConfirmRenew,
    setIsEditDialogOpen,
    setIsCancelDialogOpen,
    setIsRenewDialogOpen
  } = useSubscriptionManagement();

  const refreshData = () => {
    // In a real app, this would trigger a refetch
    console.log('Refreshing subscription data...');
  };

  return (
    <div className="space-y-6">
      <SubscriptionsHeader 
        onSearch={handleSearch} 
        onRefresh={refreshData}
        isLoading={isLoading}
      />
      
      <Tabs defaultValue="all" value={statusFilter} onValueChange={handleStatusFilterChange}>
        <TabsList className="bg-zinc-800">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="active">Đang hoạt động</TabsTrigger>
          <TabsTrigger value="expired">Đã hết hạn</TabsTrigger>
          <TabsTrigger value="pending">Chờ xác nhận</TabsTrigger>
          <TabsTrigger value="cancelled">Đã hủy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardContent className="pt-6">
              <SubscriptionsTable
                subscriptions={subscriptions}
                isLoading={isLoading}
                error={error instanceof Error ? error : null}
                onEdit={handleEditSubscription}
                onCancel={handleCancelSubscriptionClick}
                onRenew={handleRenewSubscriptionClick}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active" className="mt-4">
          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardContent className="pt-6">
              <SubscriptionsTable
                subscriptions={subscriptions}
                isLoading={isLoading}
                error={error instanceof Error ? error : null}
                onEdit={handleEditSubscription}
                onCancel={handleCancelSubscriptionClick}
                onRenew={handleRenewSubscriptionClick}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expired" className="mt-4">
          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardContent className="pt-6">
              <SubscriptionsTable
                subscriptions={subscriptions}
                isLoading={isLoading}
                error={error instanceof Error ? error : null}
                onEdit={handleEditSubscription}
                onCancel={handleCancelSubscriptionClick}
                onRenew={handleRenewSubscriptionClick}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending" className="mt-4">
          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardContent className="pt-6">
              <SubscriptionsTable
                subscriptions={subscriptions}
                isLoading={isLoading}
                error={error instanceof Error ? error : null}
                onEdit={handleEditSubscription}
                onCancel={handleCancelSubscriptionClick}
                onRenew={handleRenewSubscriptionClick}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cancelled" className="mt-4">
          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardContent className="pt-6">
              <SubscriptionsTable
                subscriptions={subscriptions}
                isLoading={isLoading}
                error={error instanceof Error ? error : null}
                onEdit={handleEditSubscription}
                onCancel={handleCancelSubscriptionClick}
                onRenew={handleRenewSubscriptionClick}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Dialogs */}
      <EditSubscriptionDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        subscription={selectedSubscription}
        onUpdate={handleUpdateSubscription}
        isSubmitting={isSubmitting}
      />
      
      <CancelSubscriptionDialog
        open={isCancelDialogOpen}
        onOpenChange={setIsCancelDialogOpen}
        subscription={selectedSubscription}
        onConfirm={handleConfirmCancel}
        isCancelling={isCancelling}
      />
      
      <RenewSubscriptionDialog
        open={isRenewDialogOpen}
        onOpenChange={setIsRenewDialogOpen}
        subscription={selectedSubscription}
        onConfirm={handleConfirmRenew}
        isRenewing={isRenewing}
      />
    </div>
  );
};

export default SubscriptionsPage;
