
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'Processed':
      return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-200">{status}</Badge>;
    case 'Pending':
      return <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200">{status}</Badge>;
    case 'Failed':
      return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default StatusBadge;
