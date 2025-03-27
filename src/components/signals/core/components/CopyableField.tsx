
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CopyableFieldProps {
  value: string;
  label?: string;
  displayValue?: string;
  className?: string;
  buttonClassName?: string;
  showLabel?: boolean;
  showCopyButton?: boolean;
}

export const InfoTooltip: React.FC<{ content: string; children: React.ReactNode }> = ({ content, children }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center cursor-help">
            {children}
            <Info className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const CopyableField: React.FC<CopyableFieldProps> = ({
  value,
  label,
  displayValue,
  className = "",
  buttonClassName = "",
  showLabel = true,
  showCopyButton = true
}) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const displayText = displayValue || value;
  
  return (
    <div className={`flex items-center ${className}`}>
      {showLabel && label && (
        <span className="text-muted-foreground mr-2">{label}:</span>
      )}
      <span className="font-medium">{displayText}</span>
      {showCopyButton && (
        <Button
          variant="ghost"
          size="sm"
          className={`p-0 h-6 w-6 ml-1 ${buttonClassName}`}
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <Copy className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </Button>
      )}
    </div>
  );
};

export default CopyableField;
