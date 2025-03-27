
import React from 'react';
import FormatDateTime from './FormatDateTime';
import { InfoTooltip } from './CopyableField';

interface TimestampSectionProps {
  timestamp: string;
}

const TimestampSection: React.FC<TimestampSectionProps> = ({
  timestamp
}) => {
  return (
    <div className="border-t pt-4">
      <h4 className="text-xs text-muted-foreground">
        <InfoTooltip content="Date and time when this signal was received by the system">
          Timestamp
        </InfoTooltip>
      </h4>
      <p className="text-sm font-medium">
        <FormatDateTime
          timestamp={timestamp}
          options={{
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }}
        />
      </p>
    </div>
  );
};

export default TimestampSection;
