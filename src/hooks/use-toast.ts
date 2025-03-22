
import * as React from "react";
import { useToast as useToastOriginal } from "@/components/ui/use-toast";

type ToastActionElement = React.ReactElement<unknown>
type ToastProps = React.ComponentPropsWithoutRef<typeof useToastOriginal>

export const useToast = () => {
  return useToastOriginal();
};
