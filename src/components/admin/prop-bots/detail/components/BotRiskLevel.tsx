
import React from 'react';
import { BotRiskLevel as RiskLevelEnum } from '@/constants/botTypes';
import { PropBot } from '@/types/bot';
import EditableRiskLevel from '@/components/admin/shared/EditableRiskLevel';

interface BotRiskLevelProps {
  risk: string;
  onUpdate: (updatedData: Partial<PropBot>) => void;
}

const BotRiskLevel: React.FC<BotRiskLevelProps> = ({ 
  risk, 
  onUpdate 
}) => {
  // Handle risk update specific to PropBot
  const handleRiskUpdate = (newRisk: RiskLevelEnum) => {
    onUpdate({ risk: newRisk });
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      <span className="text-sm text-gray-300">Mức độ rủi ro:</span>
      <EditableRiskLevel 
        risk={risk} 
        onUpdate={handleRiskUpdate} 
        showIcon={false}
      />
    </div>
  );
};

export default BotRiskLevel;
