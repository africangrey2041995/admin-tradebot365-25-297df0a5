
import React from 'react';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = 'md',
  className 
}) => {
  // Size classes for the badge
  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-1 text-xs',
    lg: 'px-2.5 py-1.5 text-sm',
  };

  // Set icon and colors based on status
  let Icon;
  let colorClasses;
  let statusText = status;

  const normalizedStatus = status?.toLowerCase() || '';

  if (normalizedStatus.includes('success') || normalizedStatus.includes('processed')) {
    Icon = CheckCircle;
    colorClasses = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    statusText = normalizedStatus.includes('processed') ? 'Processed' : 'Success';
  } else if (normalizedStatus.includes('fail') || normalizedStatus.includes('error')) {
    Icon = XCircle;
    colorClasses = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    statusText = normalizedStatus.includes('failed') ? 'Failed' : 'Error';
  } else if (normalizedStatus.includes('pend') || normalizedStatus.includes('process')) {
    Icon = Clock;
    colorClasses = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    statusText = 'Pending';
  } else if (normalizedStatus.includes('warn')) {
    Icon = AlertTriangle;
    colorClasses = 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
    statusText = 'Warning';
  } else {
    Icon = AlertTriangle;
    colorClasses = 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300';
  }

  return (
    <span className={cn(
      'inline-flex items-center gap-1 rounded-full font-medium',
      sizeClasses[size],
      colorClasses,
      className
    )}>
      <Icon className={cn(
        'shrink-0',
        size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-3.5 w-3.5' : 'h-4 w-4'
      )} />
      <span>{statusText}</span>
    </span>
  );
};

export default StatusBadge;
