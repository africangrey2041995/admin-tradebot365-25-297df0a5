
import { useState } from 'react';
import { mockUsers } from '@/mocks/usersMock';
import { toast } from "sonner";
import { exportToCSV, exportToExcel } from '@/utils/exportUtils';
import { UserStatus, UserPlan } from '@/constants/userConstants';

export const useUsersManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [planFilter, setPlanFilter] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<'activate' | 'deactivate' | 'delete' | 'premium' | 'basic' | null>(null);
  const [bulkActionDialogOpen, setBulkActionDialogOpen] = useState(false);

  // Filter users based on search term and filters
  const filteredUsers = users.filter(user => {
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
      case 'premium':
        setBulkAction('premium');
        break;
      case 'basic':
        setBulkAction('basic');
        break;
      default:
        toast.info(`Đã thực hiện hành động "${action}" cho ${selectedUsers.length} người dùng`);
        return;
    }
    
    setBulkActionDialogOpen(true);
  };

  const handleConfirmBulkAction = () => {
    if (!bulkAction) return;
    
    const updatedUsers = [...users];
    
    // Apply the bulk action to the selected users
    switch (bulkAction) {
      case 'activate':
        // Update status to active for selected users
        updatedUsers.forEach(user => {
          if (selectedUsers.includes(user.id)) {
            user.status = UserStatus.ACTIVE;
          }
        });
        toast.success(`Đã kích hoạt ${selectedUsers.length} tài khoản người dùng`);
        break;
        
      case 'deactivate':
        // Update status to suspended for selected users
        updatedUsers.forEach(user => {
          if (selectedUsers.includes(user.id)) {
            user.status = UserStatus.SUSPENDED;
          }
        });
        toast.success(`Đã khóa ${selectedUsers.length} tài khoản người dùng`);
        break;
        
      case 'delete':
        // Remove selected users from the array
        const remainingUsers = updatedUsers.filter(user => !selectedUsers.includes(user.id));
        setUsers(remainingUsers);
        toast.success(`Đã xóa ${selectedUsers.length} người dùng`);
        setSelectedUsers([]);
        setBulkAction(null);
        setBulkActionDialogOpen(false);
        return;
        
      case 'premium':
        // Update plan to premium for selected users
        updatedUsers.forEach(user => {
          if (selectedUsers.includes(user.id)) {
            user.plan = UserPlan.PREMIUM;
          }
        });
        toast.success(`Đã nâng cấp ${selectedUsers.length} người dùng lên gói Premium`);
        break;
        
      case 'basic':
        // Update plan to basic for selected users
        updatedUsers.forEach(user => {
          if (selectedUsers.includes(user.id)) {
            user.plan = UserPlan.BASIC;
          }
        });
        toast.success(`Đã chuyển ${selectedUsers.length} người dùng sang gói Basic`);
        break;
    }
    
    setUsers(updatedUsers);
    setSelectedUsers([]);
    setBulkAction(null);
    setBulkActionDialogOpen(false);
  };

  const handleUserUpdated = (userData: any) => {
    // Update the user in the users array
    const updatedUsers = users.map(user => 
      user.id === userData.id ? { ...user, ...userData } : user
    );
    
    setUsers(updatedUsers);
  };

  const handleUserDeleted = (userId: string) => {
    // Remove the user from the users array
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
  };

  const handleUserStatusChange = (userId: string, status: 'active' | 'inactive' | 'suspended') => {
    // Update the user status in the users array
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, status } : user
    );
    
    setUsers(updatedUsers);
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
    users,
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
    handleUserUpdated,
    handleUserDeleted,
    handleUserStatusChange,
    setBulkActionDialogOpen,
    handleExportCSV,
    handleExportExcel
  };
};
