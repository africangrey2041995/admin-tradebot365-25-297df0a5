
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";

type RoleBadgeProps = {
  role: string;
};

export const UserRoleBadge = ({ role }: RoleBadgeProps) => {
  switch(role) {
    case 'superadmin':
      return (
        <Badge className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border-0">
          <ShieldCheck className="h-3 w-3 mr-1" />
          Super Admin
        </Badge>
      );
    case 'admin':
      return (
        <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border-0">
          <ShieldCheck className="h-3 w-3 mr-1" />
          Admin
        </Badge>
      );
    default:
      return (
        <Badge className="bg-zinc-800 text-zinc-400 hover:bg-zinc-700 border-0">
          Người dùng
        </Badge>
      );
  }
};
