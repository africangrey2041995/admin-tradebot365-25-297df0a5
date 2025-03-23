
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { UserPlan } from '@/constants/userConstants';

type PlanBadgeProps = {
  plan: string;
};

export const UserPlanBadge = ({ plan }: PlanBadgeProps) => {
  switch(plan) {
    case UserPlan.PREMIUM:
      return (
        <Badge className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border-0">
          Premium
        </Badge>
      );
    case UserPlan.BASIC:
      return (
        <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border-0">
          Basic
        </Badge>
      );
    case UserPlan.TRIAL:
      return (
        <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-0">
          Trial
        </Badge>
      );
    default:
      return (
        <Badge className="bg-zinc-800 text-zinc-400 hover:bg-zinc-700 border-0">
          Không xác định
        </Badge>
      );
  }
};
