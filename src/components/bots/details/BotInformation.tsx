
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, CircuitBoard, Wallet, Users } from 'lucide-react';

interface BotInfoItem {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface BotInformationProps {
  botType: string;
  exchange: string;
  minCapital: string;
  integrationDate: string;
}

const BotInformation: React.FC<BotInformationProps> = ({
  botType,
  exchange,
  minCapital,
  integrationDate,
}) => {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'momentum': return 'Momentum';
      case 'scalping': return 'Scalping';
      case 'swing': return 'Swing';
      case 'grid': return 'Grid';
      case 'trend': return 'Trend';
      default: return type;
    }
  };

  const infoItems: BotInfoItem[] = [
    {
      label: 'Loại Bot',
      value: getTypeLabel(botType),
      icon: <Bot className="h-4 w-4 text-slate-500" />
    },
    {
      label: 'Sàn giao dịch',
      value: exchange,
      icon: <CircuitBoard className="h-4 w-4 text-slate-500" />
    },
    {
      label: 'Vốn tối thiểu',
      value: minCapital,
      icon: <Wallet className="h-4 w-4 text-slate-500" />
    },
    {
      label: 'Ngày tích hợp',
      value: integrationDate,
      icon: <Users className="h-4 w-4 text-slate-500" />
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Thông tin Bot</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {infoItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2">
              {item.icon}
              <span className="text-slate-600 dark:text-slate-300">{item.label}</span>
            </div>
            <span className="font-medium text-slate-800 dark:text-white">{item.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default BotInformation;
