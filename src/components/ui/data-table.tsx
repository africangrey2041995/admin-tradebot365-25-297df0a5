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
import { Checkbox } from "@/components/ui/checkbox";

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
  selectable?: boolean;
  selectedRows?: string[];
  onSelectedRowsChange?: (rows: string[]) => void;
  rowIdentifier?: string; // Field used to identify rows (e.g. 'id', 'botId')
}

export const DataTable = ({
  columns,
  data,
  isLoading = false,
  error = null,
  onRetry,
  onRowClick,
  emptyMessage = "Không có dữ liệu.",
  selectable = false,
  selectedRows = [],
  onSelectedRowsChange,
  rowIdentifier = 'id'
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

  // Handle row selection
  const handleSelectRow = (e: React.ChangeEvent<HTMLInputElement>, row: any) => {
    e.stopPropagation(); // Prevent row click
    
    if (!onSelectedRowsChange) return;
    
    const rowId = row[rowIdentifier];
    const isSelected = selectedRows.includes(rowId);
    
    if (isSelected) {
      onSelectedRowsChange(selectedRows.filter(id => id !== rowId));
    } else {
      onSelectedRowsChange([...selectedRows, rowId]);
    }
  };

  // Handle select all rows
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    
    if (!onSelectedRowsChange) return;
    
    if (selectedRows.length === data.length) {
      // If all rows are selected, unselect all
      onSelectedRowsChange([]);
    } else {
      // Otherwise, select all rows
      onSelectedRowsChange(data.map(row => row[rowIdentifier]));
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

  // Prepare columns with selection checkbox if selectable
  const tableColumns = selectable 
    ? [
        { 
          accessorKey: 'selection', 
          header: 'Selection',
          cell: (_: any, row: any) => (
            <Checkbox 
              checked={selectedRows.includes(row[rowIdentifier])}
              onCheckedChange={(checked) => {
                if (!onSelectedRowsChange) return;
                
                const rowId = row[rowIdentifier];
                if (checked) {
                  onSelectedRowsChange([...selectedRows, rowId]);
                } else {
                  onSelectedRowsChange(selectedRows.filter(id => id !== rowId));
                }
              }}
              onClick={(e) => e.stopPropagation()}
            />
          )
        },
        ...columns
      ]
    : columns;

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {tableColumns.map((column, index) => (
              <TableHead 
                key={column.accessorKey} 
                className="text-white"
                // Special case for selection column header
                {...(selectable && index === 0 
                  ? { 
                      onClick: (e) => e.stopPropagation(),
                      className: "w-[40px] text-white"
                    } 
                  : {}
                )}
              >
                {selectable && index === 0 ? (
                  <Checkbox 
                    checked={data.length > 0 && selectedRows.length === data.length}
                    onCheckedChange={(checked) => {
                      if (!onSelectedRowsChange) return;
                      if (checked) {
                        onSelectedRowsChange(data.map(row => row[rowIdentifier]));
                      } else {
                        onSelectedRowsChange([]);
                      }
                    }}
                  />
                ) : (
                  column.header
                )}
              </TableHead>
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
                {tableColumns.map((column, colIndex) => (
                  <TableCell 
                    key={`${rowIndex}-${column.accessorKey}`}
                    // Special styling for selection column
                    className={selectable && colIndex === 0 ? "w-[40px]" : ""}
                  >
                    {column.cell
                      ? column.cell(row[column.accessorKey], row)
                      : row[column.accessorKey]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={tableColumns.length} className="h-24 text-center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
