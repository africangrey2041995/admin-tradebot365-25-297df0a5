
import { z } from 'zod';
import { UserPlan } from '@/constants/userConstants';
import { Package } from '@/types';

// Helper function to transform limit values for storage
export const transformLimitValue = (value: number): number => {
  // If value is 0 or greater than 999, treat as unlimited (Infinity)
  return value === 0 || value > 999 ? Infinity : value;
};

// Helper function to display limit values in UI
export const displayLimitValue = (value: number): string => {
  // If value is Infinity, display "0"
  return value === Infinity ? "0" : value.toString();
};

// Define form schema using Zod
export const packageSchema = z.object({
  planId: z.nativeEnum(UserPlan),
  name: z.string().min(2, 'Tên gói phải có ít nhất 2 ký tự'),
  description: z.string().min(10, 'Mô tả phải có ít nhất 10 ký tự'),
  features: z.array(z.string().min(1, 'Tính năng không được để trống')),
  limits: z.object({
    bots: z.number()
      .min(0, 'Giá trị phải lớn hơn hoặc bằng 0')
      .transform(transformLimitValue),
    accounts: z.number()
      .min(0, 'Giá trị phải lớn hơn hoặc bằng 0')
      .transform(transformLimitValue),
  }),
  pricing: z.object({
    monthly: z.union([
      z.number().min(0),
      z.string().regex(/^\d+$/).transform(val => Number(val))
    ]),
    quarterly: z.union([
      z.number().min(0),
      z.string().regex(/^\d+$/).transform(val => Number(val))
    ]),
    yearly: z.union([
      z.number().min(0),
      z.string().regex(/^\d+$/).transform(val => Number(val))
    ]),
    currency: z.string().default('VND'),
  }),
  isActive: z.boolean().default(true),
  isPopular: z.boolean().default(false),
  isEnterprise: z.boolean().default(false),
});

export type FormValues = z.infer<typeof packageSchema>;

// Helper function to create default values
export const getDefaultValues = (pkg: Package | null): FormValues => {
  if (pkg) {
    // For editing an existing package
    return {
      ...pkg,
      limits: {
        bots: pkg.limits.bots === Infinity ? 0 : pkg.limits.bots,
        accounts: pkg.limits.accounts === Infinity ? 0 : pkg.limits.accounts,
      },
      pricing: {
        monthly: pkg.pricing.monthly,
        quarterly: pkg.pricing.quarterly,
        yearly: pkg.pricing.yearly,
        currency: pkg.pricing.currency,
      },
      isActive: pkg.isActive,
      isPopular: pkg.isPopular || false,
      isEnterprise: pkg.isEnterprise || false,
    };
  }

  // For creating a new package
  return {
    planId: UserPlan.BASIC,
    name: '',
    description: '',
    features: [''],  // Initialize with an empty string element
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
    isPopular: false,
    isEnterprise: false,
  };
};
