
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  isProcessing?: boolean;
  variant?: 'danger' | 'warning' | 'info';
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText,
  cancelText = 'Hủy',
  onConfirm,
  isProcessing = false,
  variant = 'warning'
}) => {
  const variantStyles = {
    danger: {
      icon: <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />,
      button: 'bg-red-600 hover:bg-red-700 text-white'
    },
    warning: {
      icon: <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />,
      button: 'bg-amber-600 hover:bg-amber-700 text-white'
    },
    info: {
      icon: <AlertTriangle className="h-12 w-12 text-blue-500 mb-4" />,
      button: 'bg-blue-600 hover:bg-blue-700 text-white'
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center text-center">
          {variantStyles[variant].icon}
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription className="text-center max-w-sm mx-auto mt-2">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex flex-row justify-center gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            className={`flex-1 ${variantStyles[variant].button}`}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : null}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
