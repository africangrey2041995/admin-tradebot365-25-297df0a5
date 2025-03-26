
import React from 'react';

interface FormatDateTimeProps {
  timestamp: string;
  showSeconds?: boolean;
  options?: Intl.DateTimeFormatOptions;
}

const FormatDateTime: React.FC<FormatDateTimeProps> = ({ 
  timestamp, 
  showSeconds = false,
  options: customOptions
}) => {
  // Safely parse the date
  const date = new Date(timestamp);
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return <span className="text-gray-400">Invalid date</span>;
  }
  
  // Format the date
  let options: Intl.DateTimeFormatOptions;
  
  if (customOptions) {
    // Use the custom options if provided
    options = customOptions;
  } else {
    // Use default options
    options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    
    if (showSeconds) {
      options.second = '2-digit';
    }
  }
  
  try {
    const formattedDate = new Intl.DateTimeFormat('default', options).format(date);
    return <span>{formattedDate}</span>;
  } catch (error) {
    console.error('Error formatting date:', error);
    return <span className="text-gray-400">Format error</span>;
  }
};

export default FormatDateTime;
