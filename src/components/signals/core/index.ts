
/**
 * Signal Core Components and Badges
 * 
 * This module provides the base components used for displaying signals,
 * including UI badges and state components.
 */

// Export badge components
export { default as ActionBadge } from './badges/ActionBadge';
export { default as StatusBadge } from './badges/StatusBadge';

// Export state components 
export { default as SignalLoadingState } from './components/SignalLoadingState';
export { default as SignalErrorState } from './components/SignalErrorState';

// Export types
export type { ActionBadgeProps } from './badges/ActionBadge';
export type { StatusBadgeProps, StatusBadgeVariant } from './badges/StatusBadge';
export type { SignalLoadingStateProps } from './components/SignalLoadingState';
export type { SignalErrorStateProps } from './components/SignalErrorState';
