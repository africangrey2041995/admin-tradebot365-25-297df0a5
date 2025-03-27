
import React from 'react';
import { Badge } from '@/components/ui/badge';

/**
 * ActionBadge component for displaying signal action types
 * 
 * Supported actions:
 * - ENTER_LONG: Green badge for opening buy positions
 * - EXIT_LONG: Red badge for closing buy positions
 * - ENTER_SHORT: Blue badge for opening sell positions
 * - EXIT_SHORT: Purple badge for closing sell positions
 * 
 * @param action - The signal action to display (ENTER_LONG, EXIT_LONG, etc.)
 */
interface ActionBadgeProps {
  action: string;
}

const ActionBadge: React.FC<ActionBadgeProps> = ({ action }) => {
  switch (action) {
    case 'ENTER_LONG':
      return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">{action}</Badge>;
    case 'EXIT_LONG':
      return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">{action}</Badge>;
    case 'ENTER_SHORT':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">{action}</Badge>;
    case 'EXIT_SHORT':
      return <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50 border-purple-200">{action}</Badge>;
    default:
      return <Badge variant="outline">{action}</Badge>;
  }
};

export default ActionBadge;
