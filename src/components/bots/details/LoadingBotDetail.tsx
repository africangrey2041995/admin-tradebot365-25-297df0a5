
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { RefreshCw } from 'lucide-react';

interface LoadingBotDetailProps {
  message?: string;
}

const LoadingBotDetail: React.FC<LoadingBotDetailProps> = ({
  message = "Đang tải thông tin bot...",
}) => {
  return (
    <MainLayout title="Chi tiết Bot tích hợp">
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-lg font-medium">{message}</p>
      </div>
    </MainLayout>
  );
};

export default LoadingBotDetail;
