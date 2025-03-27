
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'solid';
  showIcon?: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  variant = 'outline',
  showIcon = true
}) => {
  // Normalize status to lowercase for comparison
  const normalizedStatus = status.toLowerCase();
  
  // Determine badge styling based on status
  let badgeStyle = '';
  let Icon = CheckCircle;
  
  if (normalizedStatus.includes('success') || normalizedStatus.includes('processed')) {
    badgeStyle = variant === 'outline' 
      ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800' 
      : 'bg-green-600 text-white';
    Icon = CheckCircle;
  } else if (normalizedStatus.includes('fail') || normalizedStatus.includes('error') || normalizedStatus === 'rejected') {
    badgeStyle = variant === 'outline' 
      ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800' 
      : 'bg-red-600 text-white';
    Icon = XCircle;
  } else if (normalizedStatus.includes('pending') || normalizedStatus.includes('waiting') || normalizedStatus === 'processing') {
    badgeStyle = variant === 'outline' 
      ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800' 
      : 'bg-yellow-500 text-white';
    Icon = Clock;
  } else {
    badgeStyle = variant === 'outline' 
      ? 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700' 
      : 'bg-gray-600 text-white';
    Icon = AlertTriangle;
  }
  
  // Size classes
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'px-3 py-1'
  };
  
  return (
    <Badge variant="outline" className={`${badgeStyle} ${sizeClasses[size]} flex items-center gap-1.5`}>
      {showIcon && <Icon className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />}
      <span>{status}</span>
    </Badge>
  );
};

export default StatusBadge;
