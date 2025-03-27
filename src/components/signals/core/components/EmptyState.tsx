
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertTriangle, Info, FileSearch, FileWarning } from "lucide-react";

/**
 * EmptyState component for displaying when no data is available
 * 
 * @param message - Main message to display
 * @param subMessage - Additional details or instructions
 * @param onRefresh - Optional callback for refresh button
 * @param refreshButtonText - Text to display on refresh button
 * @param botType - Bot type for styling differences
 * @param icon - Icon type to display (warning, info, search, error)
 * @param className - Additional CSS classes
 */
interface EmptyStateProps {
  message?: string;
  subMessage?: string;
  onRefresh?: () => void;
  refreshButtonText?: string;
  botType?: 'premium' | 'prop' | 'user';
  icon?: 'warning' | 'info' | 'search' | 'error';
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message = "No data found",
  subMessage = "There are no records available to display.",
  onRefresh,
  refreshButtonText = "Refresh",
  botType = 'user',
  icon = 'warning',
  className = ""
}) => {
  // Get the appropriate icon component
  const IconComponent = () => {
    switch (icon) {
      case 'warning':
        return <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto mb-3" aria-label={message} />;
      case 'info':
        return <Info className="h-10 w-10 text-blue-500 mx-auto mb-3" aria-label={message} />;
      case 'search':
        return <FileSearch className="h-10 w-10 text-slate-500 mx-auto mb-3" aria-label={message} />;
      case 'error':
        return <FileWarning className="h-10 w-10 text-red-500 mx-auto mb-3" aria-label={message} />;
      default:
        return <AlertTriangle className="h-10 w-10 text-muted-foreground mx-auto mb-3" aria-label={message} />;
    }
  };

  // Get appropriate background color based on bot type
  const getBgColor = () => {
    switch (botType) {
      case 'premium':
        return 'bg-amber-50/50 dark:bg-amber-950/20';
      case 'prop':
        return 'bg-blue-50/50 dark:bg-blue-950/20';
      case 'user':
      default:
        return 'bg-muted/50';
    }
  };

  return (
    <div className={`${getBgColor()} p-6 rounded-lg text-center ${className}`}>
      <IconComponent />
      <h3 className="text-lg font-medium mb-1">{message}</h3>
      <p className="text-sm text-muted-foreground mb-4">{subMessage}</p>
      {onRefresh && (
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          {refreshButtonText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
