
import React from 'react';

export const useToast = () => {
  const toast = (props: any) => {
    console.log('Toast:', props);
  };

  return { toast };
};
