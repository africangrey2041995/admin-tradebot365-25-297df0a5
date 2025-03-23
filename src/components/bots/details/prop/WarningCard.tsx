
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

const WarningCard: React.FC = () => {
  return (
    <Card className="border-amber-200 dark:border-amber-800/30 bg-amber-50 dark:bg-amber-950/10">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-800 dark:text-amber-400 mb-1">Cảnh Báo</h4>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Việc không tuân thủ các quy tắc challenge có thể dẫn đến việc thất bại trong chương trình Prop Trading.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WarningCard;
