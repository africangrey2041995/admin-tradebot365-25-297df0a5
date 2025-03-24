
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface IntegratedBotsHeaderProps {
  onRefresh: () => void;
}

const IntegratedBotsHeader: React.FC<IntegratedBotsHeaderProps> = ({ onRefresh }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => navigate('/premium-bots')}
          className="shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Premium Bots Đã Tích Hợp</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Các Premium Bot bạn đã tích hợp với tài khoản của mình
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={() => navigate('/premium-bots')}
          className="inline-flex items-center whitespace-nowrap"
        >
          <Plus className="mr-2 h-4 w-4" />
          <span>Thêm Premium Bot Mới</span>
        </Button>
        <Button 
          variant="outline" 
          onClick={onRefresh} 
          className="inline-flex items-center"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          <span>Làm mới</span>
        </Button>
      </div>
    </div>
  );
};

export default IntegratedBotsHeader;
