import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, CheckCircle, TrendingUp, Calendar, ArrowUpRight, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PlanCard from '@/components/shared/PlanCard';
import { UserPlan } from '@/constants/userConstants';
import { useSubscription } from '@/hooks/useSubscription';
import { SubscriptionStatusBadge } from '@/components/shared/SubscriptionStatusBadge';
import { formatCurrency } from '@/utils/formatUtils';
import { UserPlanBadge } from '@/components/admin/users/UserPlanBadge';

type PlanType = 'free' | 'basic' | 'premium' | 'enterprise';

interface PlanOption {
  type: PlanType;
  name: string;
  description: string;
  price: string | number;
  features: string[];
  popular?: boolean;
  enterprise?: boolean;
}

const BillingSettings = () => {
  // Use the mock user ID for demo
  const userId = 'USR-001';
  const { 
    subscription, 
    isLoading, 
    toggleAutoRenew, 
    updateSubscription,
    isUpdating
  } = useSubscription(userId);
  
  const [currentPlan, setCurrentPlan] = useState<PlanType>('basic');
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  
  const plans: PlanOption[] = [
    {
      type: 'free',
      name: 'Free',
      description: 'Truy cập cơ bản vào Trade Bot 365',
      price: 0,
      features: [
        'Số lượng bot giới hạn',
        'Số lượng tài khoản giới hạn',
        'Tính năng cơ bản',
      ],
    },
    {
      type: 'basic',
      name: 'Basic',
      description: 'Dành cho nhà giao dịch cá nhân',
      price: 299000,
      features: [
        'Tối đa 3 bot',
        'Tối đa 2 tài khoản',
        'Hỗ trợ email',
        'Phân tích cơ bản',
      ],
    },
    {
      type: 'premium',
      name: 'Premium',
      description: 'Dành cho nhà giao dịch chuyên nghiệp',
      price: 799000,
      features: [
        'Bot không giới hạn',
        'Tối đa 5 tài khoản',
        'Hỗ trợ ưu tiên',
        'Phân tích nâng cao',
        'Tín hiệu Premium',
      ],
      popular: true,
    },
    {
      type: 'enterprise',
      name: 'Enterprise',
      description: 'Dành cho tổ chức và công ty',
      price: 'Liên hệ',
      features: [
        'Tùy chỉnh hoàn toàn',
        'Tài khoản không giới hạn',
        'Quản lý chuyên dụng',
        'API riêng',
        'SLA',
      ],
      enterprise: true,
    },
  ];

  const handlePlanSelect = (plan: PlanType) => {
    setSelectedPlan(plan);
  };

  const handleUpgrade = () => {
    if (selectedPlan && subscription) {
      updateSubscription(subscription.id, {
        packageId: `pkg_${selectedPlan}`,
        // In real app, would update other subscription details
      });
      setCurrentPlan(selectedPlan);
      setShowUpgradeDialog(false);
      setSelectedPlan(null);
    }
  };

  const getCurrentPlanDetails = () => {
    return plans.find(plan => plan.type === currentPlan);
  };

  const currentPlanDetails = getCurrentPlanDetails();
  
  const getNextBillingDate = () => {
    if (subscription?.nextPaymentDate) {
      return new Date(subscription.nextPaymentDate).toLocaleDateString('vi-VN');
    }
    
    if (subscription?.endDate) {
      return new Date(subscription.endDate).toLocaleDateString('vi-VN');
    }
    
    const today = new Date();
    const nextMonth = new Date(today.setMonth(today.getMonth() + 1));
    return nextMonth.toLocaleDateString('vi-VN');
  };

  const handleToggleAutoRenew = () => {
    if (subscription) {
      toggleAutoRenew(subscription.id, subscription.autoRenew);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
        <span className="ml-2">Đang tải thông tin thanh toán...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Gói hiện tại của bạn</h3>
          <div className="flex items-center gap-2">
            <UserPlanBadge plan={subscription?.packageId?.replace('pkg_', '') || currentPlan} />
            {subscription && (
              <SubscriptionStatusBadge subscription={subscription} />
            )}
          </div>
        </div>
        
        <Card className="border border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-lg">{currentPlanDetails?.name || 'Free'}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{currentPlanDetails?.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">
                    {typeof currentPlanDetails?.price === 'number' 
                      ? (currentPlanDetails.price === 0 ? 'Miễn phí' : formatCurrency(currentPlanDetails.price, 'VND'))
                      : currentPlanDetails?.price}
                  </div>
                  <p className="text-sm text-muted-foreground">mỗi tháng</p>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Ngày thanh toán tiếp theo: {getNextBillingDate()}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm mr-2">Tự động gia hạn:</span>
                    <Badge 
                      variant={subscription?.autoRenew ? "default" : "secondary"} 
                      className="cursor-pointer"
                      onClick={handleToggleAutoRenew}
                    >
                      {subscription?.autoRenew ? 'Bật' : 'Tắt'}
                    </Badge>
                  </div>
                </div>
                
                {subscription?.status === 'active' && subscription.autoRenew && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Tài khoản của bạn sẽ được tự động gia hạn</span>
                  </div>
                )}
                
                {subscription?.status === 'active' && !subscription.autoRenew && (
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <span>Gói dịch vụ sẽ hết hạn vào {new Date(subscription.endDate).toLocaleDateString('vi-VN')}</span>
                  </div>
                )}
                
                {subscription?.status === 'cancelled' && (
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span>Gói dịch vụ đã bị hủy</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Features */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Tính năng bao gồm</h3>
        <ul className="space-y-2">
          {currentPlanDetails?.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <Button 
          variant="default" 
          className="gap-2" 
          onClick={() => setShowUpgradeDialog(true)}
          disabled={subscription?.status === 'cancelled'}
        >
          <TrendingUp className="h-4 w-4" />
          Nâng cấp gói
        </Button>
        <Button variant="outline" className="gap-2">
          <CreditCard className="h-4 w-4" />
          Quản lý thanh toán
        </Button>
      </div>
      
      {/* Upgrade Plan Dialog */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Nâng cấp gói đăng ký của bạn</DialogTitle>
            <DialogDescription>
              Chọn gói phù hợp với nhu cầu giao dịch của bạn
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <PlanCard
                key={plan.type}
                name={plan.name}
                description={plan.description}
                price={plan.price}
                features={plan.features}
                isPopular={plan.popular}
                isEnterprise={plan.enterprise}
                isCurrentPlan={currentPlan === plan.type}
                isSelected={selectedPlan === plan.type}
                onSelect={() => handlePlanSelect(plan.type)}
              />
            ))}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpgradeDialog(false)}>Hủy</Button>
            <Button 
              disabled={!selectedPlan || selectedPlan === currentPlan || isUpdating} 
              onClick={handleUpgrade}
              className="gap-2"
            >
              {isUpdating ? 'Đang xử lý...' : 'Nâng cấp'}
              {!isUpdating && <ArrowUpRight className="h-4 w-4" />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BillingSettings;
