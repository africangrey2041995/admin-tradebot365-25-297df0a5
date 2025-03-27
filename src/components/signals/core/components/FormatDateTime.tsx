
import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';

interface FormatDateTimeProps {
  timestamp: string;
  showRelative?: boolean;
  dateFormat?: string;
  className?: string;
  options?: Intl.DateTimeFormatOptions;
}

/**
 * FormatDateTime component for formatting and displaying timestamps
 * 
 * @param timestamp - ISO format timestamp string to format
 * @param showRelative - Whether to show relative time (e.g., "2 hours ago")
 * @param dateFormat - date-fns format string (only used when options not provided)
 * @param className - CSS class name for styling
 * @param options - Intl.DateTimeFormat options for localized formatting
 * 
 * @example
 * // Basic usage with relative time
 * <FormatDateTime timestamp="2023-06-20T14:45:00Z" />
 * 
 * // With Intl.DateTimeFormat options
 * <FormatDateTime 
 *   timestamp="2023-06-20T14:45:00Z" 
 *   options={{ 
 *     year: 'numeric', 
 *     month: 'long', 
 *     day: 'numeric',
 *     hour: '2-digit',
 *     minute: '2-digit'
 *   }} 
 * />
 */
const FormatDateTime: React.FC<FormatDateTimeProps> = ({
  timestamp,
  showRelative = true,
  dateFormat = 'MMM d, yyyy HH:mm:ss',
  className = "text-sm text-muted-foreground",
  options
}) => {
  if (!timestamp) return null;
  
  try {
    const date = new Date(timestamp);
    
    // If options are provided, use Intl.DateTimeFormat
    if (options) {
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const formattedDate = formatter.format(date);
      
      if (showRelative) {
        const relativeTime = formatDistanceToNow(date, { addSuffix: true });
        return (
          <span className={className} title={formattedDate}>
            {relativeTime}
          </span>
        );
      }
      
      return <span className={className}>{formattedDate}</span>;
    }
    
    // Otherwise, use date-fns format as before
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
