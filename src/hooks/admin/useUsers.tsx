import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { User } from '@/types/admin-types';
import { exportToCSV as exportDataToCSV, exportToExcel as exportDataToExcel } from '@/utils/exportUtils';

const mockUsers: User[] = [
  { 
    id: 'USR-24051', 
    name: 'Nguyễn Văn A', 
    email: 'nguyenvana@example.com', 
    role: 'user', 
    status: 'active',
    plan: 'premium',
    bots: 3,
    botTypes: ['trading', 'crypto'],
    activity: 'high',
    joinDate: '15/08/2023'
  },
  { 
    id: 'USR-24052', 
    name: 'Trần Thị B', 
    email: 'tranthib@example.com', 
    role: 'user', 
    status: 'active',
    plan: 'basic',
    bots: 1,
    botTypes: ['forex'],
    activity: 'medium',
    joinDate: '03/10/2023'
  },
  { 
    id: 'USR-24053', 
    name: 'Lê Minh C', 
    email: 'leminhc@example.com', 
    role: 'user', 
    status: 'inactive',
    plan: 'basic',
    bots: 0,
    botTypes: [],
    activity: 'low',
    joinDate: '22/11/2023'
  },
  { 
    id: 'USR-24054', 
    name: 'Phạm Đức D', 
    email: 'phamducd@example.com', 
    role: 'user', 
    status: 'active',
    plan: 'premium',
    bots: 5,
    botTypes: ['trading', 'crypto', 'forex'],
    activity: 'high',
    joinDate: '05/01/2024'
  },
  { 
    id: 'USR-24055', 
    name: 'Vũ Văn F', 
    email: 'vuvanf@example.com', 
    role: 'user', 
    status: 'suspended',
    plan: 'basic',
    bots: 0,
    botTypes: [],
    activity: 'none',
    joinDate: '30/03/2024'
  },
  { 
    id: 'USR-24056', 
    name: 'Đỗ Thị G', 
    email: 'dothig@example.com', 
    role: 'user', 
    status: 'active',
    plan: 'trial',
    bots: 1,
    botTypes: ['crypto'],
    activity: 'medium',
    joinDate: '12/04/2024'
  }
];

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [planFilter, setPlanFilter] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const inactiveUsers = users.filter(user => user.status === 'inactive').length;
  const suspendedUsers = users.filter(user => user.status === 'suspended').length;
  
  const newUsersThisMonth = 2;

  useEffect(() => {
    const result = users
      .filter(user => 
        (searchTerm === '' || 
         user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
         user.id.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .filter(user => 
        (filterStatus === null || user.status === filterStatus)
      )
      .filter(user => 
        (planFilter === null || user.plan === planFilter)
      );
    
    setFilteredUsers(result);
    setSelectedUsers([]);
    setSelectAll(false);
  }, [searchTerm, filterStatus, planFilter, users]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterClick = (status: string | null) => {
    setFilterStatus(status === filterStatus ? null : status);
  };

  const handleUserCheckbox = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
    setSelectAll(!selectAll);
  };

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) {
      toast.error("Vui lòng chọn ít nhất một người dùng");
      return;
    }

    switch (action) {
      case 'activate':
        toast.success(`Đã kích hoạt ${selectedUsers.length} tài khoản người dùng`);
        break;
      case 'suspend':
        toast.success(`Đã tạm khóa ${selectedUsers.length} tài khoản người dùng`);
        break;
      case 'premium':
        toast.success(`Đã nâng cấp ${selectedUsers.length} tài khoản lên gói Premium`);
        break;
      case 'basic':
        toast.success(`Đã chuyển ${selectedUsers.length} tài khoản sang gói Basic`);
        break;
      default:
        break;
    }
    
    setSelectedUsers([]);
    setSelectAll(false);
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Tên', 'Email', 'Trạng thái', 'Gói dịch vụ', 'Số lượng bot', 'Ngày tham gia'];
    
    const userDataCSV = filteredUsers.map(user => [
      user.id,
      user.name,
      user.email,
      user.status === 'active' ? 'Hoạt động' : user.status === 'inactive' ? 'Không hoạt động' : 'Đã khóa',
      user.plan,
      user.bots.toString(),
      user.joinDate
    ]);
    
    exportDataToCSV(headers, userDataCSV, `user_data_${new Date().toISOString().slice(0, 10)}`);
    toast.success('Đã xuất dữ liệu người dùng thành công');
  };

  const exportToExcel = () => {
    const headers = ['ID', 'Tên', 'Email', 'Trạng thái', 'Gói dịch vụ', 'Số lượng bot', 'Ngày tham gia'];
    
    const userData = filteredUsers.map(user => [
      user.id,
      user.name,
      user.email,
      user.status === 'active' ? 'Hoạt động' : user.status === 'inactive' ? 'Không hoạt động' : 'Đã khóa',
      user.plan,
      user.bots.toString(),
      user.joinDate
    ]);
    
    exportDataToExcel(headers, userData, `user_data_${new Date().toISOString().slice(0, 10)}`, 'User Data');
    toast.success('Đã xuất dữ liệu người dùng thành công');
  };

  return {
    users: filteredUsers,
    totalUsers,
    activeUsers,
    inactiveUsers,
    suspendedUsers,
    newUsersThisMonth,
    searchTerm,
    filterStatus,
    planFilter,
    selectedUsers,
    selectAll,
    currentPage,
    usersPerPage,
    setSearchTerm,
    setPlanFilter,
    setCurrentPage,
    handleSearchChange,
    handleFilterClick,
    handleUserCheckbox,
    handleSelectAll,
    handleBulkAction,
    exportToCSV,
    exportToExcel
  };
};
