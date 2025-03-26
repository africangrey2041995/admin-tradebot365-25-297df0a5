
import { useState } from 'react';
import { mockUsers } from '@/mocks/usersMock';
import { toast } from "sonner";
import { exportToCSV, exportToExcel } from '@/utils/exportUtils';

export const useUsersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [planFilter, setPlanFilter] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<'activate' | 'deactivate' | 'delete' | null>(null);
  const [bulkActionDialogOpen, setBulkActionDialogOpen] = useState(false);

  // Filter users based on search term and filters
  const filteredUsers = mockUsers.filter(user => {
    const searchRegex = new RegExp(searchTerm, 'i');
    const matchesSearch = searchRegex.test(user.name) || searchRegex.test(user.email);

    const matchesStatus = !filterStatus || user.status === filterStatus;
    const matchesPlan = !planFilter || planFilter === 'all' || user.plan === planFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterClick = (status: string | null) => {
    setFilterStatus(status === filterStatus ? null : status);
  };
  
  const handlePlanFilterChange = (value: string | null) => {
    setPlanFilter(value);
  };

  const handleSelectUser = (userId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleSelectAllUsers = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedUsers(filteredUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action ${action} for users:`, selectedUsers);
    
    switch (action) {
      case 'activate':
        setBulkAction('activate');
        break;
      case 'suspend':
        setBulkAction('deactivate');
        break;
      case 'delete':
        setBulkAction('delete');
        break;
      default:
        toast.info(`Đã thực hiện hành động "${action}" cho ${selectedUsers.length} người dùng`);
        return;
    }
    
    setBulkActionDialogOpen(true);
  };

  const handleConfirmBulkAction = () => {
    console.log(`Confirmed bulk action ${bulkAction} for users:`, selectedUsers);
    
    setSelectedUsers([]);
    setBulkAction(null);
    toast.success("Thao tác hàng loạt thành công!");
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Tên', 'Email', 'Trạng thái', 'Gói', 'Ngày tham gia'];
    const data = filteredUsers.map(user => [
      user.id,
      user.name,
      user.email,
      user.status,
      user.plan,
      user.joinDate
    ]);
    
    exportToCSV(headers, data, 'danh-sach-nguoi-dung');
    toast.success("Đã xuất dữ liệu ra file CSV");
  };

  const handleExportExcel = () => {
    const headers = ['ID', 'Tên', 'Email', 'Trạng thái', 'Gói', 'Ngày tham gia'];
    const data = filteredUsers.map(user => [
      user.id,
      user.name,
      user.email,
      user.status,
      user.plan,
      user.joinDate
    ]);
    
    exportToExcel(headers, data, 'danh-sach-nguoi-dung', 'Người dùng');
    toast.success("Đã xuất dữ liệu ra file Excel");
  };

  return {
    searchTerm,
    filterStatus,
    planFilter,
    selectedUsers,
    bulkAction,
    bulkActionDialogOpen,
    filteredUsers,
    handleSearch,
    handleFilterClick,
    handlePlanFilterChange,
    handleSelectUser,
    handleSelectAllUsers,
    handleBulkAction,
    handleConfirmBulkAction,
    setBulkActionDialogOpen,
    handleExportCSV,
    handleExportExcel
  };
};
