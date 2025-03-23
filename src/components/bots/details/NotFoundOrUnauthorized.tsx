
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface NotFoundOrUnauthorizedProps {
  message?: string;
  backPath: string;
  onBack: () => void;
}

const NotFoundOrUnauthorized: React.FC<NotFoundOrUnauthorizedProps> = ({
  message = "Bạn không có quyền truy cập bot này hoặc bot không tồn tại.",
  backPath,
  onBack,
}) => {
  return (
    <MainLayout title="Bot không tồn tại hoặc không có quyền truy cập">
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Info className="h-12 w-12 text-orange-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">Không Có Quyền Truy Cập</h2>
        <p className="text-muted-foreground mb-6">{message}</p>
        <Button onClick={onBack}>Quay Lại Danh Sách Bot</Button>
      </div>
    </MainLayout>
  );
};

export default NotFoundOrUnauthorized;
