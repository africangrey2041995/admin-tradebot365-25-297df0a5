
import React from 'react';
import { formatDistanceToNow, format } from 'date-fns';

interface TimestampSectionProps {
  timestamp: string;
  showRelative?: boolean;
  showExactTime?: boolean;
  label?: string;
  className?: string;
}

const TimestampSection: React.FC<TimestampSectionProps> = ({
  timestamp,
  showRelative = true,
  showExactTime = true,
  label = "Received",
  className = ""
}) => {
  if (!timestamp) return null;
  
  const date = new Date(timestamp);
  const relativeTime = formatDistanceToNow(date, { addSuffix: true });
  const exactTime = format(date, 'PPpp'); // Format: Mar 20, 2023, 3:45 PM
  
  return (
    <div className={`text-sm ${className}`}>
      <span className="text-muted-foreground">{label}: </span>
      {showRelative && <span className="font-medium">{relativeTime}</span>}
      {showExactTime && showRelative && <span className="text-muted-foreground"> (</span>}
      {showExactTime && <span className="text-muted-foreground">{exactTime}</span>}
      {showExactTime && showRelative && <span className="text-muted-foreground">)</span>}
    </div>
  );
};

export default TimestampSection;
