
import * as React from "react";
import { useToast as useToastOriginal } from "@/components/ui/use-toast";

export const useToast = () => {
  return useToastOriginal();
};
