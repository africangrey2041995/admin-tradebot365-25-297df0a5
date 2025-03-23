
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Info } from 'lucide-react';

interface ChallengeRulesCardProps {
  rules: string[];
}

const ChallengeRulesCard: React.FC<ChallengeRulesCardProps> = ({ rules }) => {
  return (
    <Card className="border-gray-200 dark:border-gray-800">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-500" />
          Quy Tắc Challenge
        </CardTitle>
        <CardDescription>
          Các quy tắc bắt buộc để vượt qua thử thách Prop Trading
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ul className="space-y-2">
          {rules.map((rule, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 text-sm font-medium">
                {index + 1}
              </div>
              <span className="text-gray-700 dark:text-gray-300">{rule}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ChallengeRulesCard;
