
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from '@/utils/formatUtils';

export interface PlanProps {
  id?: string;
  name: string;
  description: string;
  price: number | string;
  currency?: string;
  features: string[];
  isPopular?: boolean;
  isEnterprise?: boolean;
  isCurrentPlan?: boolean;
  isSelected?: boolean;
  actionLabel?: string;
  onSelect?: () => void;
  className?: string;
  showAction?: boolean;
  variant?: 'admin' | 'user';
}

const PlanCard: React.FC<PlanProps> = ({
  name,
  description,
  price,
  currency = 'VND',
  features,
  isPopular,
  isEnterprise,
  isCurrentPlan,
  isSelected,
  actionLabel = 'Chọn gói',
  onSelect,
  className,
  showAction = true,
  variant = 'user'
}) => {
  // Format price display
  const priceDisplay = typeof price === 'number' 
    ? (price === 0 ? 'Miễn phí' : formatCurrency(price, currency))
    : price;
  
  // Get card styles based on variant
  const getCardStyles = () => {
    let styles = "";
    
    // Base styles
    if (isSelected) {
      styles = "border-primary ring-2 ring-primary/20";
    } else {
      styles = variant === 'admin' ? "border-zinc-800" : "border-border";
    }
    
    // Background styles
    if (variant === 'admin') {
      styles += " bg-zinc-900 text-white";
    } else {
      styles += " bg-card text-card-foreground";
    }
    
    return styles;
  };
  
  return (
    <Card 
      className={cn(
        "relative overflow-hidden", 
        getCardStyles(),
        className
      )}
      onClick={onSelect}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-bl-md">
          Phổ biến
        </div>
      )}
      
      <CardContent className={cn("p-4 space-y-4", onSelect && "cursor-pointer")}>
        <div className="space-y-1">
          <h4 className="font-bold">{name}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        
        <div>
          <div className="text-2xl font-bold">{priceDisplay}</div>
          {!isEnterprise && <div className="text-xs text-muted-foreground">mỗi tháng</div>}
        </div>
        
        <ul className="space-y-2 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className={cn(
                "h-4 w-4 mt-0.5 shrink-0",
                variant === 'admin' ? "text-primary" : "text-primary"
              )} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        {showAction && (
          isCurrentPlan ? (
            <Badge variant="outline" className="w-full justify-center py-1">
              Gói hiện tại
            </Badge>
          ) : (
            <Button 
              variant={isPopular ? "default" : "outline"} 
              className="w-full"
              onClick={onSelect}
            >
              {isEnterprise ? 'Liên hệ' : actionLabel}
            </Button>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default PlanCard;
