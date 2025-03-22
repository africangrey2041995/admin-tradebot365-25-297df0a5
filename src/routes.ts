
import { NavItem } from "@/types/nav";
import { LayoutDashboard, Users, Settings, Bot, Plus, AlertTriangle, Package } from "lucide-react";

export const routes: Record<string, NavItem[]> = {
  admin: [
    {
      title: "Tổng quan",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Người dùng",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Quản lý Bot",
      href: "/admin/bots",
      icon: Bot,
    },
    {
      title: "Premium Bots",
      href: "/admin/premium-bots",
      icon: Plus,
    },
    {
      title: "Prop Trading Bots",
      href: "/admin/prop-bots",
      icon: AlertTriangle,
    },
    {
      title: "Quản lý gói",
      href: "/admin/packages",
      icon: Package,
    },
    {
      title: "Cài đặt",
      href: "/admin/settings",
      icon: Settings,
    },
  ],
  main: [
    {
      title: "Trang chủ",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Cài đặt",
      href: "/settings",
      icon: Settings,
    },
  ],
};
