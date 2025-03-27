
import React from 'react';
import { Badge } from '@/components/ui/badge';

/**
 * StatusBadge component for displaying signal processing status
 * 
 * Supported statuses:
 * - Processed: Green badge for successfully processed signals
 * - Pending: Orange badge for signals awaiting processing
 * - Failed: Red badge for signals that failed to process
 * - Sent: Blue badge for signals that have been sent but not confirmed
 * - Expired: Gray badge for signals that have expired
 * 
 * @param status - The status to display (Processed, Pending, Failed, etc.)
 */
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
    case 'Sent':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">{status}</Badge>;
    case 'Expired':
      return <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50 border-gray-200">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default StatusBadge;
