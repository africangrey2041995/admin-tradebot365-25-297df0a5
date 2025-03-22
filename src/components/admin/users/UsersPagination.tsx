
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface UsersPaginationProps {
  totalUsers: number;
  visibleUsers: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function UsersPagination({
  totalUsers,
  visibleUsers,
  currentPage,
  pageSize,
  onPageChange
}: UsersPaginationProps) {
  const totalPages = Math.ceil(totalUsers / pageSize);
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-zinc-400">
        Hiển thị <span className="font-medium">{visibleUsers}</span> trong tổng số{" "}
        <span className="font-medium">{totalUsers}</span> người dùng
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="border-zinc-700 text-white hover:bg-zinc-800 hover:text-white"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Trang trước
        </Button>
        <div className="text-sm font-medium text-white">
          Trang {currentPage} / {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="border-zinc-700 text-white hover:bg-zinc-800 hover:text-white"
        >
          Trang sau
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
