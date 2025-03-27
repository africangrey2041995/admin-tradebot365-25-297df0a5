
import React from 'react';
import { Button } from "@/components/ui/button";
import { Copy, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InfoTooltipProps {
  content: string;
  children: React.ReactNode;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ content, children }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex items-center">
          {children}
          <Info className="h-3 w-3 ml-1 text-muted-foreground" />
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs">{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

interface CopyableFieldProps {
  label: string;
  value: string;
  tooltip: string;
  className?: string;
  onCopy: (text: string, label: string) => void;
}

const CopyableField: React.FC<CopyableFieldProps> = ({
  label,
  value,
  tooltip,
  className = "",
  onCopy
}) => (
  <div className={className}>
    <h4 className="text-xs text-muted-foreground">
      <InfoTooltip content={tooltip}>{label}</InfoTooltip>
    </h4>
    <div className="flex items-center mt-1">
      <p className="text-sm font-medium break-all mr-1">{value}</p>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0"
        onClick={() => onCopy(value, label)}
      >
        <Copy className="h-3 w-3" />
      </Button>
    </div>
  </div>
);

export default CopyableField;
