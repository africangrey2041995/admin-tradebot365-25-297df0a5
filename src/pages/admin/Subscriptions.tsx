
import React from 'react';
import { useSubscriptionManagement } from '@/hooks/admin/useSubscriptionManagement';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SubscriptionsTable } from '@/components/admin/subscriptions/SubscriptionsTable';
import { SubscriptionsHeader } from '@/components/admin/subscriptions/SubscriptionsHeader';
import { EditSubscriptionDialog } from '@/components/admin/subscriptions/EditSubscriptionDialog';
import { CancelSubscriptionDialog } from '@/components/admin/subscriptions/CancelSubscriptionDialog';
import { RenewSubscriptionDialog } from '@/components/admin/subscriptions/RenewSubscriptionDialog';
import ViewSubscriptionDetailsDialog from '@/components/admin/subscriptions/ViewSubscriptionDetailsDialog';
import { SubscriptionsStatsCards } from '@/components/admin/subscriptions/SubscriptionsStatsCards';
import BulkActionsBar from '@/components/admin/subscriptions/BulkActionsBar';
import BulkActionDialog from '@/components/admin/subscriptions/BulkActionDialog';

const SubscriptionsPage: React.FC = () => {
  const {
    subscriptions,
    isLoading,
    error,
    selectedSubscription,
    statusFilter,
    selectedSubscriptionIds,
    
    isEditDialogOpen,
    isCancelDialogOpen,
    isRenewDialogOpen,
    isViewDetailsDialogOpen,
    isBulkActionDialogOpen,
    bulkAction,
    newBulkStatus,
    
    isSubmitting,
    isCancelling,
    isRenewing,
    isBulkProcessing,
    
    handleSearch,
    handleStatusFilterChange,
    handleEditSubscription,
    handleCancelSubscriptionClick,
    handleRenewSubscriptionClick,
    handleViewDetailsClick,
    handleUpdateSubscription,
    handleConfirmCancel,
    handleConfirmRenew,
    
    handleSelectedRowsChange,
    handleBulkCancel,
    handleBulkRenew,
    handleBulkChangeStatus,
    handleConfirmBulkAction,
    setNewBulkStatus,
    
    setIsEditDialogOpen,
    setIsCancelDialogOpen,
    setIsRenewDialogOpen,
    setIsViewDetailsDialogOpen,
    setIsBulkActionDialogOpen
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
      
      {/* Thêm thống kê */}
      <SubscriptionsStatsCards 
        subscriptions={subscriptions} 
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
        
        <TabsContent value={statusFilter} className="mt-4">
          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardContent className="pt-6">
              <SubscriptionsTable
                subscriptions={subscriptions}
                isLoading={isLoading}
                error={error instanceof Error ? error : null}
                onEdit={handleEditSubscription}
                onCancel={handleCancelSubscriptionClick}
                onRenew={handleRenewSubscriptionClick}
                onViewDetails={handleViewDetailsClick}
                selectedRows={selectedSubscriptionIds}
                onSelectedRowsChange={handleSelectedRowsChange}
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
      
      {/* Thêm dialog xem chi tiết */}
      <ViewSubscriptionDetailsDialog
        open={isViewDetailsDialogOpen}
        onOpenChange={setIsViewDetailsDialogOpen}
        subscription={selectedSubscription}
        onClose={() => setIsViewDetailsDialogOpen(false)}
      />
      
      {/* Thêm dialog hành động hàng loạt */}
      <BulkActionDialog
        open={isBulkActionDialogOpen}
        onOpenChange={setIsBulkActionDialogOpen}
        count={selectedSubscriptionIds.length}
        action={bulkAction}
        onConfirm={handleConfirmBulkAction}
        isProcessing={isBulkProcessing}
        status={newBulkStatus}
        setStatus={setNewBulkStatus}
        currentPeriod={selectedSubscription?.currentPeriod}
      />
      
      {/* Thanh hành động hàng loạt */}
      <BulkActionsBar
        selectedCount={selectedSubscriptionIds.length}
        onCancel={handleBulkCancel}
        onRenew={handleBulkRenew}
        onChangeStatus={handleBulkChangeStatus}
        onClearSelection={() => handleSelectedRowsChange([])}
        isProcessing={isBulkProcessing}
      />
    </div>
  );
};

export default SubscriptionsPage;
