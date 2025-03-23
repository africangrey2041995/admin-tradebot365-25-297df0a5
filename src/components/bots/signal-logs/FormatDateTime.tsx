
import React from 'react';

interface FormatDateTimeProps {
  timestamp: string;
  options?: Intl.DateTimeFormatOptions;
}

const FormatDateTime: React.FC<FormatDateTimeProps> = ({ 
  timestamp, 
  options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
}) => {
  return (
    <span>
      {new Date(timestamp).toLocaleString('en-US', options)}
    </span>
  );
};

export default FormatDateTime;
