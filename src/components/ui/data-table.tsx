
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, AlertOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Column {
  accessorKey: string;
  header: string;
  cell?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  onRowClick?: (row: any) => void;
  emptyMessage?: string;
}

export const DataTable = ({
  columns,
  data,
  isLoading = false,
  error = null,
  onRetry,
  onRowClick,
  emptyMessage = "Không có dữ liệu."
}: DataTableProps) => {
  // Track sorting state if needed in future
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Handle click on table row
  const handleRowClick = (row: any) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  // Xử lý trạng thái loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 border rounded-md">
        <div className="flex flex-col items-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
          <p className="text-muted-foreground">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  // Xử lý trạng thái lỗi
  if (error) {
    return (
      <div className="rounded-md border border-destructive/50 p-6 bg-destructive/10">
        <div className="flex flex-col items-center text-center">
          <AlertOctagon className="h-8 w-8 text-destructive mb-2" />
          <h3 className="font-medium text-destructive mb-1">Lỗi khi tải dữ liệu</h3>
          <p className="text-muted-foreground text-sm mb-4">{error.message}</p>
          {onRetry && (
            <Button
              variant="outline"
              onClick={() => {
                toast.info("Đang tải lại dữ liệu...");
                onRetry();
              }}
            >
              Thử lại
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.accessorKey}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow 
                key={rowIndex}
                onClick={() => handleRowClick(row)}
                className={onRowClick ? "cursor-pointer hover:bg-accent/50" : ""}
              >
                {columns.map((column) => (
                  <TableCell key={`${rowIndex}-${column.accessorKey}`}>
                    {column.cell
                      ? column.cell(row[column.accessorKey], row)
                      : row[column.accessorKey]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
