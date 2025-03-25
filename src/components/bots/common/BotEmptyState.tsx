
import React from 'react';
import { Star, BarChart3, User, AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BotEmptyStateProps {
  /**
   * Type of bot this empty state is for
   */
  botType?: 'premium' | 'prop' | 'user';
  
  /**
   * Type of data that's empty
   */
  dataType?: 'accounts' | 'signals' | 'logs' | 'general';
  
  /**
   * Optional refresh callback
   */
  onRefresh?: () => void;
  
  /**
   * Optional title override
   */
  title?: string;
  
  /**
   * Optional message override
   */
  message?: string;

  /**
   * Optional action button label
   */
  actionLabel?: string;
  
  /**
   * Optional action callback
   */
  onAction?: () => void;
}

const BotEmptyState: React.FC<BotEmptyStateProps> = ({
  botType = 'user',
  dataType = 'general',
  onRefresh,
  title,
  message,
  actionLabel,
  onAction
}) => {
  // Get icon based on bot type
  const getIcon = () => {
    switch (botType) {
      case 'premium':
        return <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />;
      case 'prop':
        return <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-4" />;
      case 'user':
      default:
        return <User className="h-12 w-12 text-slate-500 mx-auto mb-4" />;
    }
  };
  
  // Get default title based on type
  const getDefaultTitle = () => {
    switch (dataType) {
      case 'accounts':
        return botType === 'premium' 
          ? 'Chưa có tài khoản kết nối với Premium Bot'
          : botType === 'prop'
            ? 'Chưa có tài khoản kết nối với Prop Trading Bot'
            : 'Chưa có tài khoản kết nối';
      case 'signals':
      case 'logs':
        return botType === 'premium'
          ? 'Chưa có tín hiệu nào từ Premium Bot'
          : botType === 'prop'
            ? 'Chưa có tín hiệu nào từ Prop Trading Bot'
            : 'Chưa có tín hiệu';
      case 'general':
      default:
        return botType === 'premium'
          ? 'Không có dữ liệu cho Premium Bot'
          : botType === 'prop'
            ? 'Không có dữ liệu cho Prop Trading Bot'
            : 'Không có dữ liệu';
    }
  };
  
  // Get default message based on type
  const getDefaultMessage = () => {
    switch (dataType) {
      case 'accounts':
        return 'Kết nối tài khoản giao dịch của bạn để bắt đầu sử dụng các tính năng tự động';
      case 'signals':
      case 'logs':
        return 'Bạn sẽ thấy lịch sử tín hiệu ở đây sau khi bot bắt đầu xử lý các giao dịch';
      case 'general':
      default:
        return 'Không tìm thấy dữ liệu phù hợp với bộ lọc hiện tại';
    }
  };
  
  // Get background and border colors based on bot type
  const getColorClasses = () => {
    switch (botType) {
      case 'premium':
        return 'bg-yellow-50/50 border-yellow-200 dark:bg-yellow-900/10 dark:border-yellow-800/30';
      case 'prop':
        return 'bg-blue-50/50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800/30';
      case 'user':
      default:
        return 'bg-slate-50 border-slate-200 dark:bg-slate-800/30 dark:border-slate-700/30';
    }
  };
  
  // Get button color based on bot type
  const getButtonClasses = () => {
    switch (botType) {
      case 'premium':
        return 'border-yellow-300 hover:bg-yellow-50 dark:border-yellow-800 dark:hover:bg-yellow-900/20';
      case 'prop':
        return 'border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/20';
      case 'user':
      default:
        return '';
    }
  };
  
  const displayTitle = title || getDefaultTitle();
  const displayMessage = message || getDefaultMessage();
  const colorClasses = getColorClasses();
  const buttonClasses = getButtonClasses();
  
  return (
    <div className={`py-12 text-center border rounded-lg ${colorClasses}`}>
      {getIcon()}
      <h3 className="text-lg font-medium mb-2">{displayTitle}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">{displayMessage}</p>
      
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        {onAction && actionLabel && (
          <Button 
            variant="outline" 
            onClick={onAction}
            className={`mt-2 ${buttonClasses}`}
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            {actionLabel}
          </Button>
        )}
        
        {onRefresh && (
          <Button 
            variant="outline" 
            onClick={onRefresh}
            className={`mt-2 ${buttonClasses}`}
          >
            <Info className="h-4 w-4 mr-2" />
            Làm mới dữ liệu
          </Button>
        )}
      </div>
    </div>
  );
};

export default BotEmptyState;
