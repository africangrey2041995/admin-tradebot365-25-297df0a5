
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExtendedSignal } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, ClipboardCopy, X } from 'lucide-react';
import { mockErrorSignals } from '@/components/bots/error-signals/mockData';
import { useNavigation } from '@/hooks/useNavigation';
import { toast } from 'sonner';
import BotErrorView from '@/components/bots/error-signals/BotErrorView';

interface ErrorDetailsModalProps {
  errorId: string | null;
  open: boolean;
  onClose: () => void;
  onResolve: (errorId: string) => void;
}

const ErrorDetailsModal: React.FC<ErrorDetailsModalProps> = ({
  errorId,
  open,
  onClose,
  onResolve
}) => {
  const { toast: hookToast } = useToast();
  const { navigateToBotDetail } = useNavigation();
  const [loading, setLoading] = useState(false);
  const [resolving, setResolving] = useState(false);
  const [error, setError] = useState<ExtendedSignal | null>(null);
  const [relatedErrors, setRelatedErrors] = useState<ExtendedSignal[]>([]);

  // Fetch error details when errorId changes
  useEffect(() => {
    if (!errorId || !open) return;
    
    const fetchErrorDetails = async () => {
      setLoading(true);
      try {
        // Mock API call - in a real app, this would be an API call
        setTimeout(() => {
          const foundError = mockErrorSignals.find(e => e.id === errorId);
          if (foundError) {
            setError(foundError);
            // Find related errors with similar error code or from same bot
            const related = mockErrorSignals
              .filter(e => e.id !== errorId && 
                (e.errorCode === foundError.errorCode || 
                 e.botId === foundError.botId))
              .slice(0, 3);
            setRelatedErrors(related);
          }
          setLoading(false);
        }, 800);
      } catch (e) {
        console.error("Error fetching error details:", e);
        hookToast({
          title: "Lỗi",
          description: "Không thể tải chi tiết lỗi",
          variant: "destructive",
        });
        setLoading(false);
      }
    };
    
    fetchErrorDetails();
  }, [errorId, open, hookToast]);

  // Handle resolving error
  const handleResolve = async () => {
    if (!errorId) return;
    
    setResolving(true);
    try {
      // Mock API call
      setTimeout(() => {
        onResolve(errorId);
        hookToast({
          title: "Thành công",
          description: "Lỗi đã được đánh dấu là đã xử lý",
          variant: "default",
        });
        setResolving(false);
        onClose();
      }, 800);
    } catch (e) {
      console.error("Error resolving error:", e);
      hookToast({
        title: "Lỗi",
        description: "Không thể đánh dấu lỗi là đã xử lý",
        variant: "destructive",
      });
      setResolving(false);
    }
  };

  const handleNavigateToBotDetails = () => {
    if (!error?.botId) return;
    
    try {
      navigateToBotDetail(error.botId);
    } catch (e) {
      console.error("Error navigating to bot details:", e);
      toast.error("Không thể điều hướng đến trang chi tiết bot");
    }
  };

  const handleCopyErrorId = () => {
    if (!errorId) return;
    
    navigator.clipboard.writeText(errorId);
    toast.success("Đã sao chép mã lỗi vào clipboard");
  };

  const handleViewDetails = (errorId: string) => {
    // In a real app, this would navigate to the error details page
    console.log("Viewing related error details for:", errorId);
    
    // Close current modal
    onClose();
    
    // Re-open with new error ID
    setTimeout(() => {
      setError(null);
      setRelatedErrors([]);
      // In a real app, you would set state to open modal with new error ID
      // Here we just log for demo purposes
      console.log("Would show details for error ID:", errorId);
      toast.info(`Đang chuyển đến chi tiết lỗi ${errorId.substring(0, 8)}...`);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={() => !loading && !resolving && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {loading ? (
          <div className="py-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Đang tải chi tiết lỗi...</p>
          </div>
        ) : error ? (
          <>
            <DialogHeader>
              <DialogTitle>Chi tiết lỗi</DialogTitle>
              <DialogDescription>
                Thông tin chi tiết về lỗi và hướng giải quyết
              </DialogDescription>
            </DialogHeader>
            
            <BotErrorView 
              signal={error}
              relatedSignals={relatedErrors}
              onViewDetails={handleViewDetails}
            />
            
            <div className="mt-4 flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleNavigateToBotDetails}
                className="text-blue-600"
              >
                Xem chi tiết Bot
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopyErrorId}
              >
                <ClipboardCopy className="h-4 w-4 mr-1" />
                Sao chép mã lỗi
              </Button>
            </div>
            
            <DialogFooter className="flex items-center justify-between space-x-2 mt-6">
              <div className="text-sm text-muted-foreground">
                ID: {error.id}
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  disabled={resolving}
                >
                  <X className="h-4 w-4 mr-2" />
                  Đóng
                </Button>
                <Button
                  onClick={handleResolve}
                  disabled={resolving}
                >
                  {resolving ? (
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  Đánh dấu đã giải quyết
                </Button>
              </div>
            </DialogFooter>
          </>
        ) : (
          <div className="py-12 text-center">
            <X className="w-12 h-12 text-destructive mx-auto" />
            <p className="mt-4 text-lg font-medium">Không tìm thấy thông tin lỗi</p>
            <p className="text-muted-foreground">Lỗi có thể đã được xóa hoặc không tồn tại</p>
            <Button className="mt-4" onClick={onClose}>Đóng</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ErrorDetailsModal;
