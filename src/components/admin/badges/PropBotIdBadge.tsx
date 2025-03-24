
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface PropBotIdBadgeProps {
  botId: string;
}

const PropBotIdBadge: React.FC<PropBotIdBadgeProps> = ({ botId }) => {
  return (
    <Badge variant="outline">
      <span>{botId}</span>
    </Badge>
  );
};

export default PropBotIdBadge;
