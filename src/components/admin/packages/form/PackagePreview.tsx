
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormValues } from './types';
import PlanCard from '@/components/shared/PlanCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { USER_PLAN_DISPLAY } from '@/constants/userConstants';

export function PackagePreview() {
  const { control } = useFormContext<FormValues>();
  
  // Watch form fields for live preview
  const name = useWatch({ control, name: 'name' });
  const description = useWatch({ control, name: 'description' });
  const features = useWatch({ control, name: 'features' });
  const pricing = useWatch({ control, name: 'pricing' });
  const isPopular = useWatch({ control, name: 'isPopular' });
  const isEnterprise = useWatch({ control, name: 'isEnterprise' });
  const planId = useWatch({ control, name: 'planId' });
  
  // Prepare plan data for preview
  const previewData = {
    name: name || USER_PLAN_DISPLAY[planId] || 'Tên gói',
    description: description || 'Mô tả gói dịch vụ',
    price: pricing?.monthly || 0,
    currency: pricing?.currency || 'VND',
    features: features?.map(f => f.value).filter(Boolean) || ['Tính năng mẫu'],
    isPopular: isPopular,
    isEnterprise: isEnterprise,
  };

  return (
    <Card className="border-zinc-700 bg-zinc-800 sticky top-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Xem trước gói dịch vụ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mx-auto max-w-[240px]">
          <PlanCard
            {...previewData}
            showAction={true}
            actionLabel="Chọn gói"
            variant="admin"
          />
        </div>
      </CardContent>
    </Card>
  );
}
