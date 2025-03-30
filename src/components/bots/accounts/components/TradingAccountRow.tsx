
import React, { useState } from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash, Link, Link2Off, MoreHorizontal } from 'lucide-react';
import { Account } from '@/types';
import { getStatusColorClass } from '../utils/accountTransformUtils';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';

interface TradingAccountRowProps {
  accountNumber: string;
  accountType: string;
  isLive: boolean;
  balance: string;
  status: string;
  accountId: string;
  onEdit: (account: Account) => void;
  onDelete: (accountId: string) => void;
  onToggleStatus: (accountId: string) => void;
  originalAccount?: Account;
  isSelected?: boolean;
  onToggleSelect?: (accountId: string) => void;
}

const TradingAccountRow: React.FC<TradingAccountRowProps> = ({
  accountNumber,
  accountType,
  isLive,
  balance,
  status,
  accountId,
  onEdit,
  onDelete,
  onToggleStatus,
  originalAccount,
  isSelected = false,
  onToggleSelect
}) => {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isToggleConfirmOpen, setIsToggleConfirmOpen] = useState(false);
  const [isActionProcessing, setIsActionProcessing] = useState(false);
  
  const statusColorClass = getStatusColorClass(status);
  
  const handleEdit = () => {
    if (originalAccount) {
      onEdit(originalAccount);
    }
  };
  
  const confirmDelete = () => {
    setIsActionProcessing(true);
    
    // Giả lập thời gian xử lý mạng
    setTimeout(() => {
      onDelete(accountId);
      setIsActionProcessing(false);
      setIsDeleteConfirmOpen(false);
    }, 800);
  };
  
  const confirmToggleStatus = () => {
    setIsActionProcessing(true);
    
    // Giả lập thời gian xử lý mạng
    setTimeout(() => {
      onToggleStatus(accountId);
      setIsActionProcessing(false);
      setIsToggleConfirmOpen(false);
    }, 800);
  };
  
  return (
    <TableRow className={isSelected ? "bg-blue-50 dark:bg-blue-900/20" : ""}>
      {onToggleSelect && (
        <TableCell>
          <Checkbox 
            checked={isSelected}
            onCheckedChange={() => onToggleSelect(accountId)}
          />
        </TableCell>
      )}
      <TableCell>{accountNumber}</TableCell>
      <TableCell>
        {accountType} - {isLive ? 'Live' : 'Demo'}
      </TableCell>
      <TableCell>{balance}</TableCell>
      <TableCell>
        <Badge variant="outline" className={statusColorClass}>{status}</Badge>
      </TableCell>
      <TableCell className="text-right">
        {originalAccount && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Quản lý tài khoản</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" /> Chỉnh sửa
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsToggleConfirmOpen(true)}>
                {status === 'Connected' 
                  ? <><Link2Off className="h-4 w-4 mr-2" /> Ngắt kết nối</> 
                  : <><Link className="h-4 w-4 mr-2" /> Kết nối</>
                }
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => setIsDeleteConfirmOpen(true)}
                className="text-red-600 dark:text-red-400"
              >
                <Trash className="h-4 w-4 mr-2" /> Xóa tài khoản
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </TableCell>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
        title="Xóa tài khoản"
        description={`Bạn có chắc chắn muốn xóa tài khoản ${accountNumber}? Bot sẽ không thể thực hiện giao dịch với tài khoản này nữa.`}
        confirmText="Xóa tài khoản"
        onConfirm={confirmDelete}
        isProcessing={isActionProcessing}
        variant="danger"
      />

      {/* Toggle Status Confirmation Dialog */}
      <ConfirmationDialog
        open={isToggleConfirmOpen}
        onOpenChange={setIsToggleConfirmOpen}
        title={status === 'Connected' ? "Ngắt kết nối tài khoản" : "Kết nối tài khoản"}
        description={
          status === 'Connected' 
            ? `Bạn có chắc chắn muốn ngắt kết nối tài khoản ${accountNumber}? Bot sẽ tạm dừng giao dịch với tài khoản này.` 
            : `Bạn có chắc chắn muốn kết nối tài khoản ${accountNumber}? Bot sẽ bắt đầu giao dịch với tài khoản này.`
        }
        confirmText={status === 'Connected' ? "Ngắt kết nối" : "Kết nối"}
        onConfirm={confirmToggleStatus}
        isProcessing={isActionProcessing}
        variant={status === 'Connected' ? "warning" : "info"}
      />
    </TableRow>
  );
};

export default TradingAccountRow;
