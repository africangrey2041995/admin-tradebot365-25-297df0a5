
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  roles?: Array<string>;
  label?: string;
  disabled?: boolean;
  external?: boolean;
  submenu?: NavItem[];
}
