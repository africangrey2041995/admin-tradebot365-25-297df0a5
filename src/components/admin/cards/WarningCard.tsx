
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from 'lucide-react';

const WarningCard: React.FC = () => {
  return (
    <Card className="bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30">
      <CardContent className="pt-4">
        <div className="flex items-start">
          <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 mr-2 shrink-0" />
          <div className="text-sm text-amber-800 dark:text-amber-400">
            <p className="font-medium mb-1">Lưu ý quan trọng</p>
            <p>Bot này đang trong giai đoạn thử thách. Hãy đảm bảo tuân thủ tất cả các quy tắc để tránh mất tư cách tham gia.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WarningCard;
