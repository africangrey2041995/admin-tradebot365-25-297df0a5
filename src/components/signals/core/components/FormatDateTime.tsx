
import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';

interface FormatDateTimeProps {
  timestamp: string;
  showRelative?: boolean;
  dateFormat?: string;
  className?: string;
}

const FormatDateTime: React.FC<FormatDateTimeProps> = ({
  timestamp,
  showRelative = true,
  dateFormat = 'MMM d, yyyy HH:mm:ss',
  className = "text-sm text-muted-foreground"
}) => {
  if (!timestamp) return null;
  
  try {
    const date = new Date(timestamp);
    const formattedDate = format(date, dateFormat);
    
    if (showRelative) {
      const relativeTime = formatDistanceToNow(date, { addSuffix: true });
      return (
        <span className={className} title={formattedDate}>
          {relativeTime}
        </span>
      );
    }
    
    return <span className={className}>{formattedDate}</span>;
  } catch (error) {
    console.error("Error formatting date:", error);
    return <span className={className}>{timestamp}</span>;
  }
};

export default FormatDateTime;
