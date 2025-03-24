
import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BotStatusBadge } from "@/components/admin/premium-bots/BotStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropBot } from '@/types';

interface PropBotsTableProps {
  currentBots: PropBot[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

export const PropBotsTable: React.FC<PropBotsTableProps> = ({
  currentBots,
  currentPage,
  setCurrentPage,
  totalPages
}) => {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="pb-2 border-b border-zinc-800">
        <CardTitle className="text-lg text-white">Danh sách Prop Trading Bots</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table className="border-zinc-800">
          <TableHeader className="bg-zinc-950">
            <TableRow className="hover:bg-zinc-900/50 border-zinc-800">
              <TableHead className="text-zinc-400">ID</TableHead>
              <TableHead className="text-zinc-400">Tên Bot</TableHead>
              <TableHead className="text-zinc-400">Trạng thái</TableHead>
              <TableHead className="text-zinc-400">Tài khoản</TableHead>
              <TableHead className="text-zinc-400">Lợi nhuận</TableHead>
              <TableHead className="text-zinc-400">Ngày tạo</TableHead>
              <TableHead className="text-right text-zinc-400">Tác vụ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentBots.length > 0 ? (
              currentBots.map((bot) => (
                <TableRow key={bot.botId} className="hover:bg-zinc-800/50 border-zinc-800">
                  <TableCell className="font-medium text-zinc-300">
                    <Badge variant="outline" className="bg-zinc-800 border-zinc-700 text-zinc-300">{bot.botId}</Badge>
                  </TableCell>
                  <TableCell className="text-white">{bot.name}</TableCell>
                  <TableCell>
                    <BotStatusBadge status={bot.status} />
                  </TableCell>
                  <TableCell className="text-zinc-300">{bot.users}</TableCell>
                  <TableCell className={`${parseFloat(bot.profit) >= 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
                    {bot.profit}
                  </TableCell>
                  <TableCell className="text-zinc-300">{formatDate(bot.createdDate)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-white">
                        <DropdownMenuItem onClick={() => console.log('View details', bot.botId)} className="hover:bg-zinc-800 cursor-pointer">
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Edit', bot.botId)} className="hover:bg-zinc-800 cursor-pointer">
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Delete', bot.botId)} className="text-red-500 hover:bg-zinc-800 hover:text-red-400 cursor-pointer">
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="border-zinc-800">
                <TableCell colSpan={7} className="h-24 text-center text-zinc-400">
                  Không tìm thấy bot nào phù hợp với tìm kiếm
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <div className="mt-4 p-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                    className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : ''} text-zinc-400 hover:text-white`}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      isActive={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                      className={page === currentPage ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                    className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} text-zinc-400 hover:text-white`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
