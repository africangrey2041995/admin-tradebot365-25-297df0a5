
import React from 'react';
import { StatusBadge, ActionBadge, UserStatusBadge } from '../core/badges';
import { SignalAction, SignalStatus } from '@/types/signal';

interface CoinstratStatusBadgeProps {
  status: string | SignalStatus;
}

export const CoinstratStatusBadge: React.FC<CoinstratStatusBadgeProps> = ({ status }) => {
  return <StatusBadge status={status} />;
};

interface CoinstratActionBadgeProps {
  action: SignalAction;
}

export const CoinstratActionBadge: React.FC<CoinstratActionBadgeProps> = ({ action }) => {
  return <ActionBadge action={action} />;
};

interface CoinstratUserStatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'disabled';
}

export const CoinstratUserStatusBadge: React.FC<CoinstratUserStatusBadgeProps> = ({ status }) => {
  return <UserStatusBadge status={status} />;
};
