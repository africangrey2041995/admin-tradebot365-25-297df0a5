
import React from 'react';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Edit, 
  Trash2, 
  Eye,
  CheckCircle, 
  XCircle 
} from 'lucide-react';
import { Package } from '@/types';
import { formatCurrency } from '@/utils/formatUtils';

interface PackageTableProps {
  packages: Package[];
  isLoading: boolean;
  error: Error | null;
  onEdit: (pkg: Package) => void;
  onDelete: (packageId: string) => void;
  onRetry?: () => void;
}

export const PackageTable: React.FC<PackageTableProps> = ({
  packages,
  isLoading,
  error,
  onEdit,
  onDelete,
  onRetry
}) => {
  // Format pricing to display readable format
  const formatPrice = (price: number, currency: string) => {
    return formatCurrency(price, currency) || 'Miễn phí';
  };

  const columns = [
    {
      accessorKey: 'name',
      header: 'Tên gói',
      cell: (value: string, row: Package) => (
        <div className="font-medium">
          {value}
          {row.isPopular && (
            <Badge className="ml-2 bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border-0">
              Phổ biến
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'limits',
      header: 'Giới hạn',
      cell: (value: Package['limits'], row: Package) => (
        <div>
          <div>Bots: {value.bots === Infinity ? 'Không giới hạn' : value.bots}</div>
          <div>Accounts: {value.accounts === Infinity ? 'Không giới hạn' : value.accounts}</div>
        </div>
      ),
    },
    {
      accessorKey: 'pricing',
      header: 'Giá (Tháng)',
      cell: (value: Package['pricing']) => (
        <div>{formatPrice(value.monthly, value.currency)}</div>
      ),
    },
    {
      accessorKey: 'isActive',
      header: 'Trạng thái',
      cell: (value: boolean) => (
        <div className="flex items-center">
          {value ? (
            <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-0 flex items-center">
              <CheckCircle className="h-3.5 w-3.5 mr-1" />
              Đang hoạt động
            </Badge>
          ) : (
            <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30 border-0 flex items-center">
              <XCircle className="h-3.5 w-3.5 mr-1" />
              Ngừng hoạt động
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Thao tác',
      cell: (_: any, row: Package) => (
        <div className="flex items-center space-x-2">
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => onEdit(row)}
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">Chỉnh sửa</span>
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => onDelete(row.id)}
            className="h-8 w-8 p-0 text-destructive"
          >
            <span className="sr-only">Xóa</span>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={packages}
      isLoading={isLoading}
      error={error}
      onRetry={onRetry}
      emptyMessage="Không có gói dịch vụ nào."
    />
  );
};
