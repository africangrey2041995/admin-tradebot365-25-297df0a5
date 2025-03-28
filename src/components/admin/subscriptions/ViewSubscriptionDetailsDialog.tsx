
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SubscriptionStatusBadge } from './SubscriptionStatusBadge';
import { UserSubscription, PaymentRecord } from '@/types/subscription';
import { Calendar, CreditCard, AlertCircle, CheckCircle, Clock, User, Package, Repeat, Receipt } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface ViewSubscriptionDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription: UserSubscription | null;
  onClose: () => void;
}

export const ViewSubscriptionDetailsDialog: React.FC<ViewSubscriptionDetailsDialogProps> = ({
  open,
  onOpenChange,
  subscription,
  onClose,
}) => {
  if (!subscription) return null;

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: vi });
    } catch (e) {
      return 'Không hợp lệ';
    }
  };

  const renderPaymentStatus = (status: string) => {
    switch (status) {
      case 'success':
        return <span className="text-green-500 flex items-center"><CheckCircle className="w-3 h-3 mr-1" /> Thành công</span>;
      case 'pending':
        return <span className="text-amber-500 flex items-center"><Clock className="w-3 h-3 mr-1" /> Đang xử lý</span>;
      case 'failed':
        return <span className="text-red-500 flex items-center"><AlertCircle className="w-3 h-3 mr-1" /> Thất bại</span>;
      case 'refunded':
        return <span className="text-blue-500 flex items-center"><Repeat className="w-3 h-3 mr-1" /> Hoàn tiền</span>;
      default:
        return status;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <Receipt className="h-5 w-5 mr-2 text-primary" />
            Chi tiết đăng ký
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Thông tin chi tiết về đăng ký và lịch sử thanh toán
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Thông tin chính */}
          <div className="bg-zinc-800/50 p-4 rounded-md">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-3">
              <div className="flex-1">
                <h3 className="text-zinc-400 text-sm font-medium mb-1">ID đăng ký</h3>
                <p className="font-mono text-sm">{subscription.id}</p>
              </div>
              <div>
                <h3 className="text-zinc-400 text-sm font-medium mb-1">Trạng thái</h3>
                <SubscriptionStatusBadge status={subscription.status} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 text-zinc-400 mt-0.5" />
                <div>
                  <h3 className="text-zinc-400 text-sm font-medium">ID người dùng</h3>
                  <p>{subscription.userId}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Package className="h-4 w-4 text-zinc-400 mt-0.5" />
                <div>
                  <h3 className="text-zinc-400 text-sm font-medium">Gói dịch vụ</h3>
                  <p>{subscription.packageId}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-zinc-400 mt-0.5" />
                <div>
                  <h3 className="text-zinc-400 text-sm font-medium">Thời gian đăng ký</h3>
                  <p>Từ {formatDate(subscription.startDate)} đến {formatDate(subscription.endDate)}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CreditCard className="h-4 w-4 text-zinc-400 mt-0.5" />
                <div>
                  <h3 className="text-zinc-400 text-sm font-medium">Phương thức thanh toán</h3>
                  <p>{subscription.paymentMethod || 'Không có thông tin'}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-zinc-400 mt-0.5" />
                <div>
                  <h3 className="text-zinc-400 text-sm font-medium">Chu kỳ thanh toán</h3>
                  <p>
                    {subscription.currentPeriod === 'monthly' ? 'Hàng tháng' : 
                     subscription.currentPeriod === 'quarterly' ? 'Hàng quý' : 'Hàng năm'} 
                    {subscription.autoRenew ? ' (Tự động gia hạn)' : ' (Không tự động gia hạn)'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-zinc-400 mt-0.5" />
                <div>
                  <h3 className="text-zinc-400 text-sm font-medium">Thanh toán tiếp theo</h3>
                  <p>
                    {subscription.autoRenew && subscription.status === 'active' 
                      ? formatDate(subscription.nextPaymentDate) 
                      : 'Không có thanh toán tiếp theo'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lịch sử thanh toán */}
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              Lịch sử thanh toán
            </h3>
            
            {subscription.paymentHistory && subscription.paymentHistory.length > 0 ? (
              <div className="border rounded-md border-zinc-800 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-zinc-800/60">
                      <th className="text-left p-3 text-xs font-medium text-zinc-400">Mã giao dịch</th>
                      <th className="text-left p-3 text-xs font-medium text-zinc-400">Ngày thanh toán</th>
                      <th className="text-left p-3 text-xs font-medium text-zinc-400">Số tiền</th>
                      <th className="text-left p-3 text-xs font-medium text-zinc-400">Phương thức</th>
                      <th className="text-left p-3 text-xs font-medium text-zinc-400">Trạng thái</th>
                      <th className="text-left p-3 text-xs font-medium text-zinc-400">Mô tả</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscription.paymentHistory.map((payment: PaymentRecord) => (
                      <tr key={payment.id} className="border-t border-zinc-800 hover:bg-zinc-800/30">
                        <td className="p-3 font-mono text-xs">{payment.id}</td>
                        <td className="p-3">{formatDate(payment.paymentDate)}</td>
                        <td className="p-3">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: payment.currency }).format(payment.amount)}</td>
                        <td className="p-3">{payment.paymentMethod}</td>
                        <td className="p-3">{renderPaymentStatus(payment.status)}</td>
                        <td className="p-3 text-zinc-400">{payment.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-zinc-800/30 p-4 rounded-md text-center text-zinc-400">
                Không có dữ liệu lịch sử thanh toán
              </div>
            )}
          </div>

          {/* Thông tin thêm */}
          <div className="bg-zinc-800/30 p-4 rounded-md grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-zinc-400 text-sm font-medium mb-1">Ngày tạo</h3>
              <p>{formatDate(subscription.createdAt)}</p>
            </div>
            <div>
              <h3 className="text-zinc-400 text-sm font-medium mb-1">Cập nhật lần cuối</h3>
              <p>{formatDate(subscription.updatedAt)}</p>
            </div>
            {subscription.cancelledAt && (
              <div>
                <h3 className="text-zinc-400 text-sm font-medium mb-1">Ngày hủy</h3>
                <p>{formatDate(subscription.cancelledAt)}</p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" className="border-zinc-700" onClick={onClose}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSubscriptionDetailsDialog;
