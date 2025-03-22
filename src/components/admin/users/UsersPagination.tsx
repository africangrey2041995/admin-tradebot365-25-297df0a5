
import React from 'react';
import { Button } from "@/components/ui/button";

type UsersPaginationProps = {
  currentPage: number;
  totalUsers: number;
  usersPerPage: number;
  onPageChange: (page: number) => void;
};

export const UsersPagination = ({
  currentPage,
  totalUsers,
  usersPerPage,
  onPageChange
}: UsersPaginationProps) => {
  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-zinc-400">
        Hiển thị <span className="font-medium text-white">{Math.min(currentPage * usersPerPage, totalUsers) - usersPerPage + 1}-{Math.min(currentPage * usersPerPage, totalUsers)}</span> trong <span className="font-medium text-white">{totalUsers}</span> người dùng
      </div>
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="border-zinc-700 text-zinc-400"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Trước
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-zinc-700 bg-zinc-800 text-white"
        >
          {currentPage}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-zinc-700 text-zinc-400"
          disabled={currentPage * usersPerPage >= totalUsers}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Sau
        </Button>
      </div>
    </div>
  );
};
