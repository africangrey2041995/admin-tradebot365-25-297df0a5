
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollText, CheckCircle } from 'lucide-react';

interface ChallengeRulesCardProps {
  rules: string[];
}

const ChallengeRulesCard: React.FC<ChallengeRulesCardProps> = ({ rules }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center">
          <ScrollText className="h-4 w-4 mr-2 text-blue-500" />
          Luật Prop Challenge
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {rules.map((rule, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 shrink-0" />
              <span className="text-sm">{rule}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ChallengeRulesCard;
