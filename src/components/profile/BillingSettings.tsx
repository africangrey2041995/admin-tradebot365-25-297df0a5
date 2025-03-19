
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, CheckCircle, TrendingUp, Calendar, ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type PlanType = 'free' | 'basic' | 'premium' | 'enterprise';

interface PlanOption {
  type: PlanType;
  name: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
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
      price: '0₫',
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
      price: '299.000₫',
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
      price: '799.000₫',
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
                  <div className="text-xl font-bold">{currentPlanDetails?.price}</div>
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
              <Card 
                key={plan.type}
                className={`border ${selectedPlan === plan.type ? 'border-primary ring-2 ring-primary/20' : 'border-border'} 
                  ${plan.popular ? 'relative overflow-hidden' : ''}`}
                onClick={() => handlePlanSelect(plan.type)}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-bl-md">
                    Phổ biến
                  </div>
                )}
                
                <CardContent className="p-4 space-y-4 cursor-pointer">
                  <div className="space-y-1">
                    <h4 className="font-bold">{plan.name}</h4>
                    <p className="text-xs text-muted-foreground">{plan.description}</p>
                  </div>
                  
                  <div>
                    <div className="text-2xl font-bold">{plan.price}</div>
                    {plan.type !== 'enterprise' && <div className="text-xs text-muted-foreground">mỗi tháng</div>}
                  </div>
                  
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {currentPlan === plan.type ? (
                    <Badge variant="outline" className="w-full justify-center py-1">
                      Gói hiện tại
                    </Badge>
                  ) : (
                    <Button 
                      variant={plan.popular ? "default" : "outline"} 
                      className="w-full"
                      onClick={() => handlePlanSelect(plan.type)}
                    >
                      {plan.type === 'enterprise' ? 'Liên hệ' : 'Chọn gói'}
                    </Button>
                  )}
                </CardContent>
              </Card>
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
