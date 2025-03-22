
export interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  plan: 'free' | 'basic' | 'premium' | 'enterprise';
  role?: 'user' | 'admin' | 'support';
  bots: number;
  joinDate: string;
}

export interface PremiumBot {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance';
  users: number;
  profit: string;
  createdDate: string;
}
