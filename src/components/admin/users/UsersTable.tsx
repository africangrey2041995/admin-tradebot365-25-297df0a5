
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { User } from '@/types/admin-types';
import { UserStatusBadge } from './UserStatusBadge';
import { UserRoleBadge } from './UserRoleBadge';
import { UserPlanBadge } from './UserPlanBadge';

export interface UsersTableProps {
  users: User[];
  selectedUsers: string[];
  selectAll: boolean;
  onSelectAll: () => void;
  onSelectUser: (userId: string) => void;
  onViewUserDetails: (userId: string) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  selectedUsers,
  selectAll,
  onSelectAll,
  onSelectUser,
  onViewUserDetails
}) => {
  return (
    <div className="rounded-md border border-zinc-700 bg-zinc-900">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-zinc-800">
            <TableHead className="w-[40px]">
              <Checkbox 
                checked={selectAll} 
                onCheckedChange={onSelectAll}
                className="border-zinc-600"
              />
            </TableHead>
            <TableHead>Người dùng</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Gói</TableHead>
            <TableHead>Ngày tham gia</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? users.map((user) => (
            <TableRow key={user.id} className="hover:bg-zinc-800">
              <TableCell>
                <Checkbox 
                  checked={selectedUsers.includes(user.id)} 
                  onCheckedChange={() => onSelectUser(user.id)}
                  className="border-zinc-600"
                />
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-zinc-400">{user.id}</div>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell><UserRoleBadge role={user.role} /></TableCell>
              <TableCell><UserStatusBadge status={user.status} /></TableCell>
              <TableCell><UserPlanBadge plan={user.plan} /></TableCell>
              <TableCell>{user.joinDate}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onViewUserDetails(user.id)}
                >
                  Xem
                </Button>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                Không tìm thấy người dùng nào.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
