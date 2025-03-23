
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { SignalAction } from '@/types';

interface ActionBadgeProps {
  action: SignalAction | string;
}

const ActionBadge: React.FC<ActionBadgeProps> = ({ action }) => {
  switch (action) {
    case 'ENTER_LONG':
      return <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 border-green-200 dark:border-green-800/50">{action}</Badge>;
    case 'EXIT_LONG':
      return <Badge variant="outline" className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 border-red-200 dark:border-red-800/50">{action}</Badge>;
    case 'ENTER_SHORT':
      return <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-800/50">{action}</Badge>;
    case 'EXIT_SHORT':
      return <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 border-purple-200 dark:border-purple-800/50">{action}</Badge>;
    default:
      return <Badge variant="outline" className="bg-background dark:bg-zinc-800">{action}</Badge>;
  }
};

export default ActionBadge;
