
import React from 'react';
import { CheckCircle, XCircle, Clock, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * UserStatusBadge Component
 * 
 * Displays a badge indicating a user or account status with appropriate
 * styling and icon based on the status value.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <UserStatusBadge status="active" />
 * 
 * // With custom size
 * <UserStatusBadge status="suspended" size="lg" />
 * 
 * // With custom className
 * <UserStatusBadge status="pending" className="my-custom-class" />
 * ```
 */
interface UserStatusBadgeProps {
  /**
   * Status value to display. Common values include 'active', 'inactive', 'pending', 'suspended', 'connected', 'disconnected'.
   * The component handles case insensitivity.
   */
  status: string;
  
  /**
   * Size variant of the badge
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Additional CSS classes to apply to the badge
   */
  className?: string;
}

/**
 * A badge that visually represents the status of a user or account.
 * Automatically selects appropriate colors and icons based on the status text.
 */
const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ 
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

  const normalizedStatus = status?.toLowerCase() || '';

  if (normalizedStatus === 'active' || normalizedStatus === 'connected') {
    Icon = CheckCircle;
    colorClasses = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
  } else if (normalizedStatus === 'suspended' || normalizedStatus === 'blocked') {
    Icon = ShieldAlert;
    colorClasses = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
  } else if (normalizedStatus === 'pending' || normalizedStatus === 'verifying') {
    Icon = Clock;
    colorClasses = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
  } else if (normalizedStatus === 'disconnected' || normalizedStatus === 'inactive') {
    Icon = XCircle;
    colorClasses = 'bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-300';
  } else {
    Icon = Clock;
    colorClasses = 'bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-300';
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
      <span>{status}</span>
    </span>
  );
};

export default UserStatusBadge;
