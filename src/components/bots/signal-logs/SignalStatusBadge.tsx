
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { SignalStatus } from '@/types/signal';

interface SignalStatusBadgeProps {
  status: string | SignalStatus;
}

const SignalStatusBadge: React.FC<SignalStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'Processed':
      return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-200">{status}</Badge>;
    case 'Pending':
      return <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200">{status}</Badge>;
    case 'Failed':
      return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">{status}</Badge>;
    case 'Sent':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">{status}</Badge>;
    case 'Expired':
      return <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50 border-gray-200">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default SignalStatusBadge;
