
import React from 'react';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight, ArrowUpLeft, ArrowDownLeft } from 'lucide-react';
import { SignalAction } from '@/types/signal';

/**
 * Props for the ActionBadge component
 * 
 * @property action - The action to display (BUY, SELL, etc.)
 * @property className - Additional CSS classes
 * @property showIcon - Whether to show the action icon
 * @property iconOnly - Display only the icon without text
 * @property size - Badge size: 'sm', 'md', or 'lg'
 */
export interface ActionBadgeProps extends Omit<BadgeProps, 'variant'> {
  /** 
   * The signal action to display 
   * Can be a standard SignalAction type or a custom string
   */
  action: SignalAction | string;
  
  /** Whether to show the action icon */
  showIcon?: boolean;
  
  /** Display only the icon without text */
  iconOnly?: boolean;
  
  /** Badge size: small, medium, or large */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Action Badge Component
 * 
 * Displays a visual indicator for signal actions like buy/sell with
 * appropriate styling and icons.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <ActionBadge action="ENTER_LONG" />
 * 
 * // Custom action with icon only
 * <ActionBadge action="BUY" iconOnly />
 * 
 * // Large size
 * <ActionBadge action="EXIT_SHORT" size="lg" />
 * ```
 * 
 * @accessibility
 * - Uses semantic colors for different actions
 * - Provides both color and icon indicators 
 * - Maintains sufficient color contrast in both light and dark modes
 */
const ActionBadge: React.FC<ActionBadgeProps> = ({
  action,
  className,
  showIcon = true,
  iconOnly = false,
  size = 'md',
  ...props
}) => {
  // Normalize action string for consistent comparison
  const normalizedAction = typeof action === 'string' 
    ? action.toUpperCase().trim()
    : 'UNKNOWN';
  
  // Map action to style and display text
  const getActionStyle = () => {
    // Buy/Long actions
    if (
      normalizedAction.includes('ENTER_LONG') || 
      normalizedAction.includes('BUY') ||
      normalizedAction.includes('LONG')
    ) {
      return {
        variant: 'default' as const,
        baseClasses: 'bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700',
        icon: <ArrowUpRight className={cn(
          size === 'sm' ? 'h-3 w-3' : 'h-4 w-4', 
          'mr-1'
        )} aria-hidden="true" />,
        displayText: 'BUY'
      };
    }
    
    // Sell/Short actions
    if (
      normalizedAction.includes('ENTER_SHORT') || 
      normalizedAction.includes('SELL') ||
      normalizedAction.includes('SHORT')
    ) {
      return {
        variant: 'default' as const,
        baseClasses: 'bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700',
        icon: <ArrowDownRight className={cn(
          size === 'sm' ? 'h-3 w-3' : 'h-4 w-4', 
          'mr-1'
        )} aria-hidden="true" />,
        displayText: 'SELL'
      };
    }
    
    // Exit long positions
    if (normalizedAction.includes('EXIT_LONG')) {
      return {
        variant: 'outline' as const,
        baseClasses: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/40',
        icon: <ArrowUpLeft className={cn(
          size === 'sm' ? 'h-3 w-3' : 'h-4 w-4', 
          'mr-1'
        )} aria-hidden="true" />,
        displayText: 'CLOSE LONG'
      };
    }
    
    // Exit short positions
    if (normalizedAction.includes('EXIT_SHORT')) {
      return {
        variant: 'outline' as const,
        baseClasses: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/40',
        icon: <ArrowDownLeft className={cn(
          size === 'sm' ? 'h-3 w-3' : 'h-4 w-4', 
          'mr-1'
        )} aria-hidden="true" />,
        displayText: 'CLOSE SHORT'
      };
    }
    
    // Default/unknown action
    return {
      variant: 'outline' as const,
      baseClasses: 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800/40 dark:text-gray-400 dark:border-gray-700',
      icon: null,
      displayText: normalizedAction
    };
  };
  
  const { variant, baseClasses, icon, displayText } = getActionStyle();
  
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
      {!iconOnly && displayText}
    </Badge>
  );
};

export default ActionBadge;
