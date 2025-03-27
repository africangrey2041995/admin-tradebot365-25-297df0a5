
import React from 'react';
import { TradingViewSignal } from '@/types/signal';
import { ActionBadge, StatusBadge } from '@/components/signals/core/badges';
import FormatDateTime from '@/components/signals/core/components/FormatDateTime';

interface TradingViewLogItemProps {
  signal: TradingViewSignal;
  isSelected?: boolean;
  onClick?: () => void;
}

const TradingViewLogItem: React.FC<TradingViewLogItemProps> = ({
  signal,
  isSelected = false,
  onClick
}) => {
  return (
    <div 
      className={`
        p-4 border rounded-md cursor-pointer transition-colors
        ${isSelected 
          ? 'bg-primary/5 border-primary/20' 
          : 'hover:bg-muted/50'}
      `}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium">{signal.instrument}</h3>
          <div className="text-sm text-muted-foreground">
            ID: {signal.id}
          </div>
        </div>
        <div className="flex gap-2">
          <ActionBadge action={signal.action} />
          <StatusBadge status={signal.status as string} />
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground mt-2">
        <FormatDateTime timestamp={signal.timestamp} />
      </div>
    </div>
  );
};

export default TradingViewLogItem;
