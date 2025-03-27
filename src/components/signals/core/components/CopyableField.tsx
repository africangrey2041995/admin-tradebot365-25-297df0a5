
import React from 'react';
import { Copy, InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface CopyableFieldProps {
  label: string;
  value: string | number | undefined;
  tooltip?: string;
  className?: string;
  onCopy?: (text: string, label: string) => void;
}

export const InfoTooltip: React.FC<{ content: string; children: React.ReactNode }> = ({ content, children }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center cursor-help">
            {children}
            <InfoIcon className="h-3 w-3 ml-1 text-muted-foreground" />
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs max-w-[200px]">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const CopyableField: React.FC<CopyableFieldProps> = ({
  label,
  value,
  tooltip,
  className = "",
  onCopy
}) => {
  const handleCopy = () => {
    const textToCopy = value?.toString() || '';
    
    // Use the provided onCopy handler if available
    if (onCopy) {
      onCopy(textToCopy, label);
    } else {
      // Fallback to navigator.clipboard
      navigator.clipboard.writeText(textToCopy);
    }
  };

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="text-xs text-muted-foreground">
        {tooltip ? (
          <InfoTooltip content={tooltip}>
            {label}
          </InfoTooltip>
        ) : (
          label
        )}
      </div>
      <div className="flex items-center">
        <span className="text-sm font-medium truncate flex-1">
          {value !== undefined ? value : '-'}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 p-0 px-1"
          onClick={handleCopy}
          aria-label={`Copy ${label}`}
        >
          <Copy className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default CopyableField;
