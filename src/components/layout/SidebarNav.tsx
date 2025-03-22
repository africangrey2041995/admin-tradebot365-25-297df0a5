
import React from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  Bot,
  Plus,
  Package,
  AlertTriangle,
  HelpCircle,
  LogOut, // Changed from Logout to LogOut
} from "lucide-react";
import { NavItem } from "@/types/nav";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  className?: string;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const adminMenuItems: NavItem[] = [
    {
      title: "Tổng quan",
      href: "/admin",
      icon: LayoutDashboard,
      roles: ["admin"],
    },
    {
      title: "Người dùng",
      href: "/admin/users",
      icon: Users,
      roles: ["admin"],
    },
    {
      title: "Quản lý Bot",
      href: "/admin/bots",
      icon: Bot,
      roles: ["admin"],
    },
    {
      title: "Premium Bots",
      href: "/admin/premium-bots",
      icon: Plus,
      roles: ["admin"],
    },
    {
      title: "Prop Trading Bots",
      href: "/admin/prop-bots",
      icon: AlertTriangle,
      roles: ["admin"],
    },
    {
      title: "Quản lý gói",
      href: "/admin/packages",
      icon: Package,
      roles: ["admin"],
    },
    {
      title: "Cài đặt",
      href: "/admin/settings",
      icon: Settings,
      roles: ["admin"],
    },
  ];

  const supportMenuItems: NavItem[] = [
    {
      title: "Tổng quan",
      href: "/support",
      icon: LayoutDashboard,
      roles: ["support"],
    },
    {
      title: "Người dùng",
      href: "/support/users",
      icon: Users,
      roles: ["support"],
    },
    {
      title: "Câu hỏi thường gặp",
      href: "/support/faq",
      icon: HelpCircle,
      roles: ["support"],
    },
  ];

  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => (
      <li key={item.href}>
        <Link
          to={item.href}
          className={cn(
            "group flex h-9 w-full items-center justify-start space-x-2 rounded-md p-2 text-sm font-medium hover:bg-secondary hover:text-accent focus:bg-secondary focus:text-accent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            location.pathname === item.href ? "text-accent" : "text-muted-foreground"
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </Link>
      </li>
    ));
  };

  return (
    <div className={cn("flex-col space-y-4 py-4", className)}>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          {user?.role === "admin" ? "Admin" : "Support"}
        </h2>
        <ul className="space-y-1">
          {user?.role === "admin" && renderNavItems(adminMenuItems)}
          {user?.role === "support" && renderNavItems(supportMenuItems)}
        </ul>
      </div>
      <Accordion type="single" collapsible className="w-full border-b border-zinc-800">
        <AccordionItem value="account">
          <AccordionTrigger>
            <div className="flex items-center space-x-2 px-4">
              <img
                src={user?.image || "/logo.png"}
                alt="Avatar"
                className="h-8 w-8 rounded-full"
              />
              <span className="text-sm font-medium">{user?.name}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-2 p-4">
              <Link
                to="/profile"
                className="flex items-center space-x-2 rounded-md p-2 text-sm font-medium hover:bg-secondary hover:text-accent focus:outline-none"
              >
                <Settings className="h-4 w-4" />
                <span>Cài đặt tài khoản</span>
              </Link>
              <button
                onClick={() => signOut()}
                className="flex items-center space-x-2 rounded-md p-2 text-sm font-medium hover:bg-secondary hover:text-accent focus:outline-none"
              >
                <LogOut className="h-4 w-4" />
                <span>Đăng xuất</span>
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
