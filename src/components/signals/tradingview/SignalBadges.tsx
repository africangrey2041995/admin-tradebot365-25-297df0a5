
import React from 'react';
import { StatusBadge, ActionBadge, UserStatusBadge } from '../core/badges';
import { SignalAction, SignalStatus } from '@/types/signal';

interface TradingViewStatusBadgeProps {
  status: string | SignalStatus;
}

export const TradingViewStatusBadge: React.FC<TradingViewStatusBadgeProps> = ({ status }) => {
  return <StatusBadge status={status} />;
};

interface TradingViewActionBadgeProps {
  action: SignalAction;
}

export const TradingViewActionBadge: React.FC<TradingViewActionBadgeProps> = ({ action }) => {
  return <ActionBadge action={action} />;
};

interface TradingViewUserStatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'disabled';
}

export const TradingViewUserStatusBadge: React.FC<TradingViewUserStatusBadgeProps> = ({ status }) => {
  return <UserStatusBadge status={status} />;
};
