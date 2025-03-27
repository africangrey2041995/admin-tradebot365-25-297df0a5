
import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Eye, MoreHorizontal, Trash2, Lock, Unlock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserPlanBadge } from "../users/UserPlanBadge";
import { UserStatusBadge } from "../users/UserStatusBadge";
import { EditUserDialog } from "./EditUserDialog";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { LockAccountDialog } from "./LockAccountDialog";
import { UnlockAccountDialog } from "./UnlockAccountDialog";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  status: string;
  plan: string;
  joinDate: string;
  [key: string]: any;
}

interface UsersTableProps {
  users: User[];
  onViewUserDetail: (userId: string) => void;
  selectedUsers: string[];
  onSelectUser: (userId: string, isSelected: boolean) => void;
  onSelectAllUsers: (isSelected: boolean) => void;
  onUserUpdated?: (userData: User) => void;
  onUserDeleted?: (userId: string) => void;
  onUserStatusChange?: (userId: string, status: 'active' | 'inactive' | 'suspended') => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({ 
  users, 
  onViewUserDetail, 
  selectedUsers,
  onSelectUser,
  onSelectAllUsers,
  onUserUpdated,
  onUserDeleted,
  onUserStatusChange
}) => {
  const allSelected = users.length > 0 && selectedUsers.length === users.length;
  const someSelected = selectedUsers.length > 0 && selectedUsers.length < users.length;
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [lockingUser, setLockingUser] = useState<User | null>(null);
  const [unlockingUser, setUnlockingUser] = useState<User | null>(null);

  const handleSelectAll = (checked: boolean) => {
    onSelectAllUsers(checked);
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    onSelectUser(userId, checked);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleDeleteUser = (user: User) => {
    setDeletingUser(user);
  };

  const handleLockAccount = (user: User) => {
    setLockingUser(user);
  };

  const handleUnlockAccount = (user: User) => {
    setUnlockingUser(user);
  };

  const handleUserUpdated = (userData: User) => {
    if (onUserUpdated) {
      onUserUpdated(userData);
    }
  };

  const handleUserDeleted = () => {
    if (deletingUser && onUserDeleted) {
      onUserDeleted(deletingUser.id);
    }
  };

  const handleUserStatusChange = (status: 'active' | 'inactive' | 'suspended') => {
    if ((lockingUser || unlockingUser) && onUserStatusChange) {
      onUserStatusChange(lockingUser?.id || unlockingUser?.id || '', status);
    }
  };

  return (
    <div className="mt-6 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox 
                checked={allSelected}
                className="bg-zinc-800 border-zinc-700 data-[state=checked]:bg-amber-500"
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Gói</TableHead>
            <TableHead>Ngày tham gia</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Checkbox 
                  checked={selectedUsers.includes(user.id)}
                  className="bg-zinc-800 border-zinc-700 data-[state=checked]:bg-amber-500"
                  onCheckedChange={(checked) => handleSelectUser(user.id, checked as boolean)}
                />
              </TableCell>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <UserStatusBadge status={user.status} />
              </TableCell>
              <TableCell>
                <UserPlanBadge plan={user.plan} />
              </TableCell>
              <TableCell>{user.joinDate}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-900 text-white">
                    <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                    <DropdownMenuItem 
                      onClick={() => onViewUserDetail(user.id)}
                      className="flex items-center gap-2 focus:bg-zinc-800 cursor-pointer"
                    >
                      <Eye className="h-4 w-4 text-blue-500" />
                      Xem chi tiết
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-zinc-800" />
                    <DropdownMenuItem 
                      onClick={() => handleEditUser(user)}
                      className="flex items-center gap-2 focus:bg-zinc-800 cursor-pointer"
                    >
                      <Edit className="h-4 w-4 text-amber-500" />
                      Chỉnh sửa
                    </DropdownMenuItem>
                    {user.status === 'suspended' ? (
                      <DropdownMenuItem 
                        onClick={() => handleUnlockAccount(user)}
                        className="flex items-center gap-2 focus:bg-zinc-800 cursor-pointer"
                      >
                        <Unlock className="h-4 w-4 text-green-500" />
                        Mở khóa tài khoản
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem 
                        onClick={() => handleLockAccount(user)}
                        className="flex items-center gap-2 focus:bg-zinc-800 cursor-pointer"
                      >
                        <Lock className="h-4 w-4 text-red-500" />
                        Khóa tài khoản
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator className="bg-zinc-800" />
                    <DropdownMenuItem 
                      onClick={() => handleDeleteUser(user)}
                      className="flex items-center gap-2 focus:bg-zinc-800 cursor-pointer text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                      Xóa
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialogs */}
      {editingUser && (
        <EditUserDialog
          open={!!editingUser}
          onOpenChange={(open) => !open && setEditingUser(null)}
          user={editingUser}
          onUserUpdated={handleUserUpdated}
        />
      )}

      {deletingUser && (
        <DeleteUserDialog
          open={!!deletingUser}
          onOpenChange={(open) => !open && setDeletingUser(null)}
          user={deletingUser}
          onUserDeleted={handleUserDeleted}
        />
      )}

      {lockingUser && (
        <LockAccountDialog
          open={!!lockingUser}
          onOpenChange={(open) => !open && setLockingUser(null)}
          user={lockingUser}
          onStatusChange={handleUserStatusChange}
        />
      )}

      {unlockingUser && (
        <UnlockAccountDialog
          open={!!unlockingUser}
          onOpenChange={(open) => !open && setUnlockingUser(null)}
          user={unlockingUser}
          onStatusChange={handleUserStatusChange}
        />
      )}
    </div>
  );
};
