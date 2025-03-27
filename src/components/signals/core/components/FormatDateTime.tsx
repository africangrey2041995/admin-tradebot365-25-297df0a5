
import React from 'react';

interface FormatDateTimeProps {
  timestamp: string | number | Date;
  options?: Intl.DateTimeFormatOptions;
  className?: string;
}

const FormatDateTime: React.FC<FormatDateTimeProps> = ({ 
  timestamp, 
  options, 
  className 
}) => {
  if (!timestamp) return <span className={className}>-</span>;
  
  const date = new Date(timestamp);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return <span className={className}>Invalid date</span>;
  }

  // Default options that can be overridden
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  const mergedOptions = { ...defaultOptions, ...options };
  
  try {
    const formattedDate = new Intl.DateTimeFormat('en-US', mergedOptions).format(date);
    return <span className={className}>{formattedDate}</span>;
  } catch (error) {
    console.error('Error formatting date:', error);
    return <span className={className}>{date.toLocaleString()}</span>;
  }
};

export default FormatDateTime;
