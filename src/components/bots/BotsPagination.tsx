
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const BotsPagination = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button variant="outline" size={isMobile ? "sm" : "default"} className={`${isMobile ? 'w-8 h-8 p-0' : ''}`}>
        <ChevronLeft className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
        {!isMobile && <span className="ml-1">Previous</span>}
      </Button>
      
      <div className={`flex space-x-1 ${isMobile ? 'mx-1' : 'mx-2'}`}>
        {[1, 2, 3, 4, 5].map((page) => (
          <Button
            key={page}
            variant={page === 1 ? "default" : "outline"}
            size={isMobile ? "sm" : "default"}
            className={`${page === 1 ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''} ${isMobile ? 'w-8 h-8 p-0' : 'min-w-[40px]'}`}
          >
            {page}
          </Button>
        ))}
      </div>
      
      <Button variant="outline" size={isMobile ? "sm" : "default"} className={`${isMobile ? 'w-8 h-8 p-0' : ''}`}>
        {!isMobile && <span className="mr-1">Next</span>}
        <ChevronRight className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
      </Button>
    </div>
  );
};

export default BotsPagination;
