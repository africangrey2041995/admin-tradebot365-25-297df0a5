
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Package } from '@/types';
import { FormStructure } from './form/FormStructure';
import { BasicInfo } from './form/BasicInfo';
import { FeaturesSection } from './form/FeaturesSection';
import { LimitsSection } from './form/LimitsSection';
import { PricingSection } from './form/PricingSection';
import { SettingsSection } from './form/SettingsSection';
import { PackagePreview } from './form/PackagePreview';
import { packageSchema, getDefaultValues, FormValues } from './form/types';

interface PackageFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<Package>) => void;
  package?: Package | null;
  isSubmitting: boolean;
}

export const PackageForm: React.FC<PackageFormProps> = ({
  open,
  onOpenChange,
  onSubmit,
  package: pkg,
  isSubmitting
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: getDefaultValues(pkg || null)
  });
  
  const isEdit = !!pkg;

  // Handle form submission
  const handleFormSubmit = (data: FormValues) => {
    // Process data before submitting
    const submittedData: Partial<Package> = {
      planId: data.planId,
      name: data.name,
      description: data.description,
      // Extract feature values from objects
      features: data.features.map(feature => feature.value),
      limits: {
        bots: data.limits.bots,
        accounts: data.limits.accounts,
      },
      pricing: {
        monthly: Number(data.pricing.monthly),
        quarterly: Number(data.pricing.quarterly),
        yearly: Number(data.pricing.yearly),
        currency: data.pricing.currency,
      },
      isActive: data.isActive,
      isPopular: data.isPopular,
      isEnterprise: data.isEnterprise
    };
    
    onSubmit(submittedData);
  };

  return (
    <FormStructure
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={handleFormSubmit}
      form={form}
      isEdit={isEdit}
      isSubmitting={isSubmitting}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <BasicInfo isEdit={isEdit} />
          <FeaturesSection />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LimitsSection />
            <PricingSection />
          </div>
          
          <SettingsSection />
        </div>
        
        <div className="md:col-span-1">
          <PackagePreview />
        </div>
      </div>
    </FormStructure>
  );
};
