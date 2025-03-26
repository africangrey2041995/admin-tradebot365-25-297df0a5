
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface FeaturesListProps {
  features: string[];
}

const FeaturesList: React.FC<FeaturesListProps> = ({ features }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tính năng</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="text-slate-700 dark:text-slate-300">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(FeaturesList);
