
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { UserSubscription, getSubscriptionStatusDisplay, getDaysRemaining } from '@/types/subscription';
import { cn } from '@/lib/utils';

interface SubscriptionStatusBadgeProps {
  subscription: UserSubscription | null | undefined;
  showDaysRemaining?: boolean;
  className?: string;
}

export const SubscriptionStatusBadge: React.FC<SubscriptionStatusBadgeProps> = ({
  subscription,
  showDaysRemaining = true,
  className
}) => {
  if (!subscription) {
    return (
      <Badge variant="outline" className={cn("bg-gray-100 text-gray-600 hover:bg-gray-200", className)}>
        Không có gói dịch vụ
      </Badge>
    );
  }

  const daysRemaining = getDaysRemaining(subscription.endDate);
  const isExpiringSoon = daysRemaining > 0 && daysRemaining <= 7;
  
  const getStatusStyles = () => {
    switch(subscription.status) {
      case 'active':
        return isExpiringSoon 
          ? "bg-amber-100 text-amber-600 hover:bg-amber-200 border-amber-300" 
          : "bg-green-100 text-green-600 hover:bg-green-200 border-green-300";
      case 'pending':
        return "bg-blue-100 text-blue-600 hover:bg-blue-200 border-blue-300";
      case 'expired':
        return "bg-red-100 text-red-600 hover:bg-red-200 border-red-300";
      case 'cancelled':
        return "bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300";
      default:
        return "bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300";
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(getStatusStyles(), className)}
    >
      {getSubscriptionStatusDisplay(subscription)}
      {showDaysRemaining && isExpiringSoon && ` (${daysRemaining} ngày)`}
    </Badge>
  );
};

export default SubscriptionStatusBadge;
