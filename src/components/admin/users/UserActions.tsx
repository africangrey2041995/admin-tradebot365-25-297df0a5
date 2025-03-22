
import React from 'react';
import { Button } from "@/components/ui/button";
import { UserCog, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Check, X, Package } from "lucide-react";

type UserActionsProps = {
  selectedUsers: string[];
  onBulkAction: (action: string) => void;
  onExportCSV: () => void;
};

export const UserActions = ({
  selectedUsers,
  onBulkAction,
  onExportCSV
}: UserActionsProps) => {
  return (
    <div className="flex gap-2 w-full sm:w-auto justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="border-zinc-700 text-zinc-400"
            disabled={selectedUsers.length === 0}
          >
            <UserCog className="h-4 w-4 mr-2" />
            Thao tác ({selectedUsers.length})
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-900 text-white">
          <DropdownMenuLabel>Hành động hàng loạt</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-zinc-800" />
          <DropdownMenuItem 
            className="focus:bg-zinc-800 cursor-pointer"
            onClick={() => onBulkAction('activate')}
          >
            <Check className="mr-2 h-4 w-4 text-green-500" />
            <span>Kích hoạt tài khoản</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="focus:bg-zinc-800 cursor-pointer"
            onClick={() => onBulkAction('suspend')}
          >
            <X className="mr-2 h-4 w-4 text-red-500" />
            <span>Tạm khóa tài khoản</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-zinc-800" />
          <DropdownMenuItem 
            className="focus:bg-zinc-800 cursor-pointer"
            onClick={() => onBulkAction('premium')}
          >
            <Package className="mr-2 h-4 w-4 text-amber-500" />
            <span>Nâng cấp lên Premium</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="focus:bg-zinc-800 cursor-pointer"
            onClick={() => onBulkAction('basic')}
          >
            <Package className="mr-2 h-4 w-4 text-blue-500" />
            <span>Chuyển sang Basic</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button 
        variant="outline" 
        className="border-zinc-700 text-zinc-400"
        onClick={onExportCSV}
      >
        <Download className="h-4 w-4 mr-2" />
        Xuất CSV
      </Button>
    </div>
  );
};
