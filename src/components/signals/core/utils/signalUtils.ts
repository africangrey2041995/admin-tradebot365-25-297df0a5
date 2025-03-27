
import { SignalAction, SignalStatus } from '@/types/signal';
import { ArrowUpRight, ArrowUpLeft, ArrowDownRight, ArrowDownLeft } from 'lucide-react';
import React from 'react';

type IconProps = {
  className?: string;
};

/**
 * Get the appropriate icon for a signal action
 * @param action - Signal action (ENTER_LONG, EXIT_LONG, etc.)
 * @returns Lucide icon component with styling
 */
export const getActionIcon = (action: SignalAction) => {
  switch (action) {
    case 'ENTER_LONG':
      return { icon: ArrowUpRight, className: "h-4 w-4 text-success" };
    case 'EXIT_LONG':
      return { icon: ArrowUpLeft, className: "h-4 w-4 text-muted-foreground" };
    case 'ENTER_SHORT':
      return { icon: ArrowDownRight, className: "h-4 w-4 text-destructive" };
    case 'EXIT_SHORT':
      return { icon: ArrowDownLeft, className: "h-4 w-4 text-muted-foreground" };
    default:
      return null;
  }
};

/**
 * Render action icon component
 * @param action - Signal action
 * @returns JSX element with the appropriate icon
 */
export const renderActionIcon = (action: SignalAction) => {
  const iconData = getActionIcon(action);
  if (!iconData) return null;
  
  const { icon: Icon, className } = iconData;
  return React.createElement(Icon, { className });
};

/**
 * Get human-readable label for a signal action
 * @param action - Signal action (ENTER_LONG, EXIT_LONG, etc.)
 * @returns Localized action label
 */
export const getActionLabel = (action: SignalAction) => {
  switch (action) {
    case 'ENTER_LONG':
      return 'MUA VÀO';
    case 'EXIT_LONG':
      return 'ĐÓNG MUA';
    case 'ENTER_SHORT':
      return 'BÁN RA';
    case 'EXIT_SHORT':
      return 'ĐÓNG BÁN';
    default:
      return action;
  }
};

/**
 * Format a date with localization support
 * @param dateString - ISO format date string
 * @param locale - Locale for formatting (default: user's locale)
 * @returns Formatted date string
 */
export const formatDate = (dateString: string, locale?: string) => {
  try {
    return new Date(dateString).toLocaleString(locale);
  } catch (e) {
    console.error('Error formatting date:', e);
    return dateString;
  }
};

/**
 * Convert signal status to an appropriate CSS class
 * @param status - Signal status (Processed, Pending, Failed, etc.)
 * @returns CSS class string
 */
export const getStatusClass = (status: SignalStatus | string): string => {
  switch (status) {
    case 'Processed':
      return 'text-success';
    case 'Pending':
      return 'text-warning';
    case 'Failed':
      return 'text-destructive';
    case 'Sent':
      return 'text-info';
    default:
      return 'text-muted-foreground';
  }
};
