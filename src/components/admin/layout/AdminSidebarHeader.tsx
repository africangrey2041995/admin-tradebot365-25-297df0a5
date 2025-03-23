
import React from 'react';
import { cn } from '@/lib/utils';
import TradeBotLogo from '@/components/common/TradeBotLogo';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAdminNavigation } from '@/hooks/useAdminNavigation';

const AdminSidebarHeader: React.FC = () => {
  const isMobile = useIsMobile();
  const { exitAdminMode } = useAdminNavigation();

  const handleReturnToApp = () => {
    exitAdminMode();
  };

  return (
    <>
      <div className={cn("flex justify-center items-center py-4")}>
        <div className="flex flex-col items-center">
          <TradeBotLogo size={isMobile ? "medium" : "large"} className="mx-auto" />
          <span className="text-xs font-medium text-amber-500 mt-1">Admin Panel</span>
        </div>
      </div>
      
      <div className="mt-6 px-4 mb-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleReturnToApp}
          className="w-full text-xs border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700 text-white"
        >
          <ArrowLeft className="mr-1 h-3 w-3" />
          Quay lại ứng dụng
        </Button>
      </div>
    </>
  );
};

export default AdminSidebarHeader;
