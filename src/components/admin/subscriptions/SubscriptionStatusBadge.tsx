
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { SubscriptionStatus } from '@/types/subscription';

interface SubscriptionStatusBadgeProps {
  status: SubscriptionStatus;
}

export const SubscriptionStatusBadge: React.FC<SubscriptionStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'active':
      return (
        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
          Đang hoạt động
        </Badge>
      );
    case 'expired':
      return (
        <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
          Đã hết hạn
        </Badge>
      );
    case 'pending':
      return (
        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
          Chờ xác nhận
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge variant="outline" className="bg-gray-500/10 text-gray-400 border-gray-500/20">
          Đã hủy
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-gray-500/10 text-gray-400 border-gray-500/20">
          Không xác định
        </Badge>
      );
  }
};
