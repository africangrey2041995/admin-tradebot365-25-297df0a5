
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, CheckCircle, TrendingUp, Calendar, ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PlanCard from '@/components/shared/PlanCard';
import { UserPlan } from '@/constants/userConstants';

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
    if (selectedPlan) {
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
    const today = new Date();
    const nextMonth = new Date(today.setMonth(today.getMonth() + 1));
    return nextMonth.toLocaleDateString('vi-VN');
  };

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Gói hiện tại của bạn</h3>
          <Badge variant="outline" className="text-primary px-2 py-1">
            {currentPlanDetails?.name || 'Free'}
          </Badge>
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
                      ? (currentPlanDetails.price === 0 ? 'Miễn phí' : `${currentPlanDetails.price.toLocaleString()}₫`)
                      : currentPlanDetails?.price}
                  </div>
                  <p className="text-sm text-muted-foreground">mỗi tháng</p>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Thanh toán tiếp theo: {getNextBillingDate()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Được lập hóa đơn hàng tháng</span>
                </div>
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
              disabled={!selectedPlan || selectedPlan === currentPlan} 
              onClick={handleUpgrade}
              className="gap-2"
            >
              Nâng cấp <ArrowUpRight className="h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BillingSettings;
