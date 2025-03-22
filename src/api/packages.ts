
import { Package } from '@/types';
import { ADMIN_API } from '@/constants/apiEndpoints';

// Mock data
const mockPackages: Package[] = [
  {
    id: '1',
    planId: 'free',
    name: 'Miễn phí',
    description: 'Gói miễn phí với các tính năng cơ bản',
    features: ['1 Bot', '2 Tài khoản', 'Hỗ trợ cơ bản'],
    limits: {
      bots: 1,
      accounts: 2,
    },
    pricing: {
      monthly: 0,
      quarterly: 0,
      yearly: 0,
      currency: 'VND'
    },
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    planId: 'basic',
    name: 'Cơ bản',
    description: 'Gói cơ bản cho người mới bắt đầu',
    features: ['3 Bot', '5 Tài khoản', 'Hỗ trợ qua email'],
    limits: {
      bots: 3,
      accounts: 5,
    },
    pricing: {
      monthly: 200000,
      quarterly: 540000,
      yearly: 1920000,
      currency: 'VND'
    },
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '3',
    planId: 'premium',
    name: 'Cao cấp',
    description: 'Gói cao cấp cho trader chuyên nghiệp',
    features: ['10 Bot', '20 Tài khoản', 'Hỗ trợ ưu tiên 24/7', 'Chiến lược nâng cao'],
    limits: {
      bots: 10,
      accounts: 20,
    },
    pricing: {
      monthly: 500000,
      quarterly: 1350000,
      yearly: 4800000,
      currency: 'VND'
    },
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    isPopular: true
  },
  {
    id: '4',
    planId: 'enterprise',
    name: 'Doanh nghiệp',
    description: 'Gói doanh nghiệp với khả năng tùy chỉnh cao',
    features: ['Không giới hạn Bot', 'Không giới hạn tài khoản', 'Hỗ trợ riêng', 'API tùy chỉnh'],
    limits: {
      bots: 100,
      accounts: 200,
    },
    pricing: {
      monthly: 2000000,
      quarterly: 5400000,
      yearly: 19200000,
      currency: 'VND'
    },
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    isEnterprise: true
  },
  {
    id: '5',
    planId: 'trial',
    name: 'Dùng thử',
    description: 'Gói dùng thử 14 ngày',
    features: ['2 Bot', '3 Tài khoản', 'Hỗ trợ cơ bản'],
    limits: {
      bots: 2,
      accounts: 3,
    },
    pricing: {
      monthly: 0,
      quarterly: 0,
      yearly: 0,
      currency: 'VND'
    },
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  }
];

// API functions
export const fetchPackages = async (): Promise<Package[]> => {
  // In a real app, this would be: 
  // const response = await fetch(ADMIN_API.PACKAGES.LIST);
  // return response.json();
  
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
  return mockPackages;
};

export const getPackageById = async (packageId: string): Promise<Package> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const pkg = mockPackages.find(p => p.id === packageId);
  if (!pkg) {
    throw new Error('Package not found');
  }
  return pkg;
};

export const createPackage = async (newPackage: Omit<Package, 'id' | 'createdAt' | 'updatedAt'>): Promise<Package> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const now = new Date().toISOString();
  const createdPackage: Package = {
    ...newPackage,
    id: `pkg-${Math.random().toString(36).substring(2, 9)}`,
    createdAt: now,
    updatedAt: now
  };
  return createdPackage;
};

export const updatePackage = async (packageId: string, updates: Partial<Omit<Package, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Package> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const pkg = mockPackages.find(p => p.id === packageId);
  if (!pkg) {
    throw new Error('Package not found');
  }
  return {
    ...pkg,
    ...updates,
    updatedAt: new Date().toISOString()
  };
};

export const deletePackage = async (packageId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  // In a real app, this would be:
  // await fetch(`${ADMIN_API.PACKAGES.DELETE(packageId)}`, { method: 'DELETE' });
};
