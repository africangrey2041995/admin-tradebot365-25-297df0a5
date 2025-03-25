
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileText, Table } from "lucide-react";
import { exportToCSV, exportToExcel, exportToJSON } from "@/utils/exportUtils";
import { toast } from "sonner";

interface ExportDataDropdownProps {
  data: any[];
  headers: string[];
  fileName: string;
  disabled?: boolean;
}

const ExportDataDropdown: React.FC<ExportDataDropdownProps> = ({
  data,
  headers,
  fileName,
  disabled = false,
}) => {
  // Transform data for export (array of objects to array of arrays)
  const prepareExportData = (): (string | number)[][] => {
    return data.map(item => headers.map(header => {
      const value = typeof item[header] === 'object' ? JSON.stringify(item[header]) : item[header];
      return value !== undefined && value !== null ? value : '';
    }));
  };

  const handleExportCSV = () => {
    try {
      exportToCSV(headers, prepareExportData(), fileName);
      toast.success("Đã xuất dữ liệu CSV thành công");
    } catch (error) {
      toast.error("Không thể xuất dữ liệu CSV");
      console.error("Error exporting to CSV:", error);
    }
  };

  const handleExportExcel = () => {
    try {
      exportToExcel(headers, prepareExportData(), fileName);
      toast.success("Đã xuất dữ liệu Excel thành công");
    } catch (error) {
      toast.error("Không thể xuất dữ liệu Excel");
      console.error("Error exporting to Excel:", error);
    }
  };

  const handleExportJSON = () => {
    try {
      exportToJSON(data, fileName);
      toast.success("Đã xuất dữ liệu JSON thành công");
    } catch (error) {
      toast.error("Không thể xuất dữ liệu JSON");
      console.error("Error exporting to JSON:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={disabled} className="flex gap-1">
          <Download className="h-4 w-4 mr-1" />
          Xuất dữ liệu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Định dạng xuất dữ liệu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleExportCSV}>
          <FileText className="h-4 w-4 mr-2" />
          <span>Xuất sang CSV</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportExcel}>
          <Table className="h-4 w-4 mr-2" />
          <span>Xuất sang Excel</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportJSON}>
          <FileText className="h-4 w-4 mr-2" />
          <span>Xuất sang JSON</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportDataDropdown;
