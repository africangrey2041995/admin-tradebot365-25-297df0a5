
import React from 'react';
import { StatusBadge, ActionBadge } from '../core/badges';
import { SignalAction } from '@/types/signal';

interface TradingViewStatusBadgeProps {
  status: string;
}

export const TradingViewStatusBadge: React.FC<TradingViewStatusBadgeProps> = ({ status }) => {
  return <StatusBadge status={status} />;
};

interface TradingViewActionBadgeProps {
  action: SignalAction | string;
}

export const TradingViewActionBadge: React.FC<TradingViewActionBadgeProps> = ({ action }) => {
  return <ActionBadge action={action} />;
};
