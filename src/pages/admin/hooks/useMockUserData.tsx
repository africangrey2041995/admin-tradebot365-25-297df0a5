
interface UserInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'suspended';
}

export const useMockUserData = (): UserInfo => {
  const mockUserInfo = {
    id: 'USR-001',
    name: 'Nguyễn Văn A',
    email: 'dbtcompany17@gmail.com',
    phone: '+84 912 345 678',
    status: 'active' as const,
  };
  
  return mockUserInfo;
};
