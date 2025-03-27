
import React from 'react';
import { ArrowUpRight, ArrowDownRight, ArrowRight, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * ActionBadge Component
 * 
 * Displays a badge representing a trading action with an appropriate icon and styling
 * based on the action type.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <ActionBadge action="buy" />
 * 
 * // With custom size
 * <ActionBadge action="sell" size="lg" />
 * 
 * // With custom className
 * <ActionBadge action="add" className="my-custom-class" />
 * ```
 */
interface ActionBadgeProps {
  /**
   * The trading action to display. Common values: 'buy', 'sell', 'long', 'short', 'add', 'reduce'.
   * The component will handle case insensitivity.
   */
  action: string;
  
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
 * A badge that visually represents a trading action with an appropriate icon.
 * Each action type uses a different color and icon for clear visual differentiation.
 */
const ActionBadge: React.FC<ActionBadgeProps> = ({ 
  action, 
  size = 'md',
  className 
}) => {
  // Define size classes
  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-1 text-xs',
    lg: 'px-2.5 py-1.5 text-sm',
  };

  // Set icon based on action
  let Icon;
  let colorClasses;

  switch (action?.toLowerCase()) {
    case 'buy':
    case 'long':
      Icon = ArrowUpRight;
      colorClasses = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      break;
    case 'sell':
    case 'short':
      Icon = ArrowDownRight;
      colorClasses = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      break;
    case 'add':
      Icon = Plus;
      colorClasses = 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      break;
    case 'reduce':
      Icon = Minus;
      colorClasses = 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      break;
    default:
      Icon = ArrowRight;
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
      <span>{action}</span>
    </span>
  );
};

export default ActionBadge;
