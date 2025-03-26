
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

interface BotDescriptionProps {
  description: string;
  pairs: string[];
}

const BotDescription: React.FC<BotDescriptionProps> = ({ 
  description, 
  pairs 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          Giới thiệu
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none dark:prose-invert">
          <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line">
            {description}
          </p>
        </div>
        <div className="mt-6">
          <h4 className="font-medium text-slate-800 dark:text-white mb-2">Các cặp tiền giao dịch</h4>
          <div className="flex flex-wrap gap-2">
            {pairs.map((pair, index) => (
              <Badge key={index} variant="outline">{pair}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(BotDescription);
