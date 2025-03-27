
import React from 'react';
import { Badge } from '@/components/ui/badge';

/**
 * UserStatusBadge component for displaying user account statuses
 * 
 * Supported statuses:
 * - active: Green badge for active accounts
 * - inactive: Gray badge for inactive accounts
 * - pending: Orange badge for accounts pending activation
 * - disabled: Red badge for disabled accounts
 * 
 * @param status - The user status to display (active, inactive, pending, disabled)
 */
interface UserStatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'disabled';
}

const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'active':
      return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-200">{status}</Badge>;
    case 'inactive':
      return <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50 border-gray-200">{status}</Badge>;
    case 'pending':
      return <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200">{status}</Badge>;
    case 'disabled':
      return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default UserStatusBadge;
