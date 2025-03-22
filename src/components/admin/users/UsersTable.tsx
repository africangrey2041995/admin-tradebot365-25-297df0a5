
import React from 'react';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, MoreHorizontal, Check, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { UserStatusBadge } from './UserStatusBadge';
import { UserPlanBadge } from './UserPlanBadge';
import { User } from '@/types/admin-types';

export interface UsersTableProps {
  users: User[];
  selectedUsers: string[];
  selectAll: boolean;
  onSelectAll: () => void;
  onSelectUser: (userId: string) => void;
  onViewUserDetails: (userId: string) => void;
  loading?: boolean;
  selectedUser?: User | null;
  activeUsers?: number;
  inactiveUsers?: number;
  suspendedUsers?: number;
  newUsersThisMonth?: number;
  searchTerm?: string;
  filterStatus?: string | null;
  planFilter?: string | null;
  usersPerPage?: number;
  handleSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterClick?: (status: string | null) => void;
  handleUserCheckbox?: (userId: string, checked: boolean) => void;
  handleBulkAction?: (action: 'activate' | 'deactivate' | 'delete') => void;
  exportToCSV?: () => void;
  exportToExcel?: () => void;
  setPlanFilter?: (plan: string | null) => void;
  setCurrentPage?: (page: number) => void;
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
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800">
            <TableHead className="text-zinc-400 w-10">
              <Checkbox 
                className="border-zinc-600"
                checked={selectAll}
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            <TableHead className="text-zinc-400 w-28">ID</TableHead>
            <TableHead className="text-zinc-400">Tên</TableHead>
            <TableHead className="text-zinc-400">Email</TableHead>
            <TableHead className="text-zinc-400">Trạng thái</TableHead>
            <TableHead className="text-zinc-400">Gói</TableHead>
            <TableHead className="text-zinc-400 text-center">Bots</TableHead>
            <TableHead className="text-zinc-400">Ngày tham gia</TableHead>
            <TableHead className="text-zinc-400 text-right">Tác vụ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id} className="border-zinc-800">
                <TableCell>
                  <Checkbox
                    className="border-zinc-600"
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => onSelectUser(user.id)}
                  />
                </TableCell>
                <TableCell className="font-mono text-xs text-zinc-400">{user.id}</TableCell>
                <TableCell className="max-w-[150px] truncate font-medium">{user.name}</TableCell>
                <TableCell className="max-w-[180px] truncate">{user.email}</TableCell>
                <TableCell>
                  <UserStatusBadge status={user.status} />
                </TableCell>
                <TableCell>
                  <UserPlanBadge plan={user.plan} />
                </TableCell>
                <TableCell className="text-center">{user.bots}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-900 text-white">
                      <DropdownMenuLabel>Tác vụ</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-zinc-800" />
                      <DropdownMenuItem 
                        className="focus:bg-zinc-800 cursor-pointer"
                        onClick={() => onViewUserDetails(user.id)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Xem chi tiết</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="focus:bg-zinc-800 cursor-pointer">
                        {user.status === 'active' ? (
                          <>
                            <X className="mr-2 h-4 w-4" />
                            <span>Tạm khóa</span>
                          </>
                        ) : (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            <span>Kích hoạt</span>
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-zinc-800" />
                      <DropdownMenuItem className="focus:bg-zinc-800 text-red-500 focus:text-red-500 cursor-pointer">
                        <span>Xóa tài khoản</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                Không tìm thấy kết quả phù hợp.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
