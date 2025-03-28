
import { Package } from '@/types';
import { UserPlan } from '@/constants/userConstants';

// Mock data for packages
const mockPackages: Package[] = [
  {
    id: 'pkg_free',
    planId: UserPlan.FREE,
    name: 'Free',
    description: 'Truy cập cơ bản vào Trade Bot 365',
    features: [
      'Số lượng bot giới hạn',
      'Số lượng tài khoản giới hạn',
      'Tính năng cơ bản',
    ],
    limits: {
      bots: 1,
      accounts: 1,
    },
    pricing: {
      monthly: 0,
      quarterly: 0,
      yearly: 0,
      currency: 'VND',
    },
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    trialDays: 0
  },
  {
    id: 'pkg_basic',
    planId: UserPlan.BASIC,
    name: 'Basic',
    description: 'Dành cho nhà giao dịch cá nhân',
    features: [
      'Tối đa 3 bot',
      'Tối đa 2 tài khoản',
      'Hỗ trợ email',
      'Phân tích cơ bản',
    ],
    limits: {
      bots: 3,
      accounts: 2,
    },
    pricing: {
      monthly: 299000,
      quarterly: 799000,
      yearly: 2990000,
      currency: 'VND',
    },
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    trialDays: 7
  },
  {
    id: 'pkg_premium',
    planId: UserPlan.PREMIUM,
    name: 'Premium',
    description: 'Dành cho nhà giao dịch chuyên nghiệp',
    features: [
      'Bot không giới hạn',
      'Tối đa 5 tài khoản',
      'Hỗ trợ ưu tiên',
      'Phân tích nâng cao',
      'Tín hiệu Premium',
    ],
    limits: {
      bots: 999, // Infinite
      accounts: 5,
    },
    pricing: {
      monthly: 799000,
      quarterly: 2190000,
      yearly: 7990000,
      currency: 'VND',
    },
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPopular: true,
    trialDays: 3
  },
  {
    id: 'pkg_enterprise',
    planId: UserPlan.ENTERPRISE,
    name: 'Enterprise',
    description: 'Dành cho tổ chức và công ty',
    features: [
      'Tùy chỉnh hoàn toàn',
      'Tài khoản không giới hạn',
      'Quản lý chuyên dụng',
      'API riêng',
      'SLA',
    ],
    limits: {
      bots: 999, // Infinite
      accounts: 999, // Infinite
    },
    pricing: {
      monthly: 0, // Custom pricing
      quarterly: 0, // Custom pricing
      yearly: 0, // Custom pricing
      currency: 'VND',
    },
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isEnterprise: true,
    trialDays: 0
  }
];

// Fetch all packages
export const fetchPackages = async (): Promise<Package[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockPackages];
};

// Fetch package by ID
export const getPackageById = async (packageId: string): Promise<Package> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const foundPackage = mockPackages.find(pkg => pkg.id === packageId);
  
  if (!foundPackage) {
    throw new Error(`Package with ID ${packageId} not found`);
  }
  
  return { ...foundPackage };
};

// Create new package
export const createPackage = async (packageData: Omit<Package, 'id' | 'createdAt' | 'updatedAt'>): Promise<Package> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newPackage: Package = {
    id: `pkg_${Math.random().toString(36).substring(2, 10)}`,
    ...packageData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // In a real app, this would be saved to a database
  return newPackage;
};

// Update existing package
export const updatePackage = async (packageId: string, updates: Partial<Package>): Promise<Package> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const packageIndex = mockPackages.findIndex(pkg => pkg.id === packageId);
  
  if (packageIndex === -1) {
    throw new Error(`Package with ID ${packageId} not found`);
  }
  
  // In a real app, this would update the database
  const updatedPackage: Package = {
    ...mockPackages[packageIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  return updatedPackage;
};

// Delete package
export const deletePackage = async (packageId: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const packageIndex = mockPackages.findIndex(pkg => pkg.id === packageId);
  
  if (packageIndex === -1) {
    throw new Error(`Package with ID ${packageId} not found`);
  }
  
  // In a real app, this would delete from the database
};

// Get user's package usage statistics
export const getPackageUsage = async (userId: string, packageId: string): Promise<{
  usedBots: number;
  usedAccounts: number;
  percentBots: number;
  percentAccounts: number;
}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const pkg = mockPackages.find(p => p.id === packageId);
  
  if (!pkg) {
    throw new Error(`Package with ID ${packageId} not found`);
  }
  
  // Mock data - in a real app this would be calculated from actual user data
  const usedBots = Math.floor(Math.random() * pkg.limits.bots);
  const usedAccounts = Math.floor(Math.random() * pkg.limits.accounts);
  
  const percentBots = pkg.limits.bots === 999 ? 50 : (usedBots / pkg.limits.bots) * 100;
  const percentAccounts = pkg.limits.accounts === 999 ? 30 : (usedAccounts / pkg.limits.accounts) * 100;
  
  return {
    usedBots,
    usedAccounts,
    percentBots,
    percentAccounts
  };
};
