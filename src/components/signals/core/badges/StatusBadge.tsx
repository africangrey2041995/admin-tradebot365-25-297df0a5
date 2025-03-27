
import React from 'react';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Clock, AlertTriangle, Ban } from 'lucide-react';

/**
 * Status Badge variants representing different signal states
 */
export type StatusBadgeVariant = 
  | 'Processed' 
  | 'Success' 
  | 'Failed' 
  | 'Pending' 
  | 'Sent' 
  | 'Expired' 
  | 'Cancelled' 
  | 'Unknown';

/**
 * Props for the StatusBadge component
 * 
 * @property status - The status to display, case-insensitive
 * @property className - Additional CSS classes
 * @property showIcon - Whether to show the status icon
 * @property iconOnly - Display only the icon without text
 * @property size - Badge size: 'sm', 'md', or 'lg'
 */
export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  /** The status to display (case-insensitive) */
  status: string;
  
  /** Whether to show the status icon */
  showIcon?: boolean;
  
  /** Display only the icon without text */
  iconOnly?: boolean;
  
  /** Badge size: small, medium, or large */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Status Badge Component
 * 
 * Displays a visual indicator for the current status of a signal with
 * appropriate styling based on the status value.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <StatusBadge status="Processed" />
 * 
 * // With icon only
 * <StatusBadge status="Failed" iconOnly />
 * 
 * // Custom styling
 * <StatusBadge status="Pending" className="px-6" />
 * ```
 * 
 * @accessibility
 * - Uses semantic colors for different statuses
 * - Provides both color and icon indicators for status
 * - Maintains sufficient color contrast in both light and dark modes
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
  showIcon = true,
  iconOnly = false,
  size = 'md',
  ...props
}) => {
  // Normalize status string for consistent comparison
  const normalizedStatus = typeof status === 'string' 
    ? status.toLowerCase().trim()
    : 'unknown';
  
  // Map normalized status to Badge variant and styling
  const getStatusStyle = () => {
    if (normalizedStatus.includes('processed') || normalizedStatus.includes('success')) {
      return {
        variant: 'outline' as const,
        baseClasses: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/40',
        icon: <CheckCircle className={cn(
          size === 'sm' ? 'h-3 w-3' : 'h-4 w-4', 
          'mr-1'
        )} aria-hidden="true" />
      };
    }
    
    if (normalizedStatus.includes('fail') || normalizedStatus.includes('error')) {
      return {
        variant: 'outline' as const,
        baseClasses: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/40',
        icon: <XCircle className={cn(
          size === 'sm' ? 'h-3 w-3' : 'h-4 w-4', 
          'mr-1'
        )} aria-hidden="true" />
      };
    }
    
    if (normalizedStatus.includes('pending')) {
      return {
        variant: 'outline' as const,
        baseClasses: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800/40',
        icon: <Clock className={cn(
          size === 'sm' ? 'h-3 w-3' : 'h-4 w-4', 
          'mr-1'
        )} aria-hidden="true" />
      };
    }
    
    if (normalizedStatus.includes('sent')) {
      return {
        variant: 'outline' as const,
        baseClasses: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/40',
        icon: <CheckCircle className={cn(
          size === 'sm' ? 'h-3 w-3' : 'h-4 w-4', 
          'mr-1'
        )} aria-hidden="true" />
      };
    }
    
    if (normalizedStatus.includes('expired')) {
      return {
        variant: 'outline' as const,
        baseClasses: 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800/40 dark:text-gray-400 dark:border-gray-700/40',
        icon: <AlertTriangle className={cn(
          size === 'sm' ? 'h-3 w-3' : 'h-4 w-4', 
          'mr-1'
        )} aria-hidden="true" />
      };
    }
    
    if (normalizedStatus.includes('cancelled')) {
      return {
        variant: 'outline' as const,
        baseClasses: 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800/40 dark:text-gray-400 dark:border-gray-700/40',
        icon: <Ban className={cn(
          size === 'sm' ? 'h-3 w-3' : 'h-4 w-4', 
          'mr-1'
        )} aria-hidden="true" />
      };
    }
    
    // Default/unknown status
    return {
      variant: 'outline' as const,
      baseClasses: 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800/40 dark:text-gray-400 dark:border-gray-700',
      icon: <AlertTriangle className={cn(
        size === 'sm' ? 'h-3 w-3' : 'h-4 w-4', 
        'mr-1'
      )} aria-hidden="true" />
    };
  };
  
  const { variant, baseClasses, icon } = getStatusStyle();
  
  // Format display text based on status
  const getDisplayText = () => {
    if (normalizedStatus.includes('processed')) return 'Processed';
    if (normalizedStatus.includes('success')) return 'Success';
    if (normalizedStatus.includes('fail')) return 'Failed';
    if (normalizedStatus.includes('error')) return 'Error';
    if (normalizedStatus.includes('pending')) return 'Pending';
    if (normalizedStatus.includes('sent')) return 'Sent';
    if (normalizedStatus.includes('expired')) return 'Expired';
    if (normalizedStatus.includes('cancelled')) return 'Cancelled';
    
    // If it doesn't match any of the known statuses, use the original with first letter capitalized
    return status.charAt(0).toUpperCase() + status.slice(1);
  };
  
  // Apply size-specific classes
  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-xs'
    : size === 'lg'
      ? 'px-4 py-1.5 text-sm font-medium'
      : 'px-3 py-1 text-sm'; // Default 'md' size
  
  return (
    <Badge
      variant={variant}
      className={cn(
        baseClasses,
        sizeClasses,
        className
      )}
      {...props}
    >
      {showIcon && icon}
      {!iconOnly && getDisplayText()}
    </Badge>
  );
};

export default StatusBadge;
