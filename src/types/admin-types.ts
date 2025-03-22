
export interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  plan: 'free' | 'basic' | 'premium' | 'enterprise' | 'trial';
  role?: 'user' | 'admin' | 'support';
  bots: number;
  joinDate: string;
  botTypes?: string[];
  activity?: string;
}

export interface PremiumBot {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance';
  users: number;
  profit: string;
  createdDate: string;
}

export interface PropBot {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance';
  users: number;
  profit: string;
  createdDate: string;
  type?: string;
}

export interface UserBot {
  id: string;
  name: string;
  owner: string;
  ownerId: string;
  status: 'active' | 'inactive';
  accounts: number;
  createdDate: string;
}
