
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

type StatusBadgeProps = {
  status: string;
};

export const UserStatusBadge = ({ status }: StatusBadgeProps) => {
  switch(status) {
    case 'active':
      return (
        <Badge variant="success" className="gap-1 font-normal py-1">
          <CheckCircle className="h-3.5 w-3.5" />
          Hoạt động
        </Badge>
      );
    case 'inactive':
      return (
        <Badge variant="warning" className="gap-1 font-normal py-1">
          <AlertCircle className="h-3.5 w-3.5" />
          Không hoạt động
        </Badge>
      );
    case 'suspended':
      return (
        <Badge variant="destructive" className="gap-1 font-normal py-1">
          <XCircle className="h-3.5 w-3.5" />
          Tạm khóa
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="gap-1 font-normal py-1">
          <AlertCircle className="h-3.5 w-3.5" />
          Không xác định
        </Badge>
      );
  }
};
