import { Link, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Building,
  Users,
  LogOut,
  Home,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY_CONFIG, DESIGN_CONFIG } from "@/config/app";

const AdminSidebar = () => {
  const { logout } = useAdminAuth();
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Proprietăți",
      path: "/admin/properties",
      icon: Building,
    },
    {
      title: "Echipa",
      path: "/admin/team",
      icon: Users,
    },
    {
      title: "Analytics & Loguri",
      path: "/admin/analytics",
      icon: BarChart3,
    },
    {
      title: "Setări Site",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {COMPANY_CONFIG.logoImage ? (
            <img
              src={COMPANY_CONFIG.logoImage}
              alt={`${COMPANY_CONFIG.name} Logo`}
              className="rounded-lg object-contain"
              style={{
                width: COMPANY_CONFIG.logoSize.width,
                height: COMPANY_CONFIG.logoSize.height,
              }}
            />
          ) : (
            <div
              className="flex items-center justify-center text-white text-lg font-medium rounded-lg"
              style={{
                backgroundColor: DESIGN_CONFIG.colors.primary,
                width: COMPANY_CONFIG.logoSize.width,
                height: COMPANY_CONFIG.logoSize.height,
              }}
            >
              {COMPANY_CONFIG.logoText}
            </div>
          )}
          <div>
            <h1 className="font-bold text-lg text-gray-900">Admin Panel</h1>
            <p className="text-sm text-gray-600">{COMPANY_CONFIG.name}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <Icon className="w-5 h-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <Separator />

      {/* Footer */}
      <div className="p-4 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <Home className="w-5 h-5" />
          Înapoi la site
        </Link>

        <Button
          variant="ghost"
          onClick={logout}
          className="w-full justify-start gap-3 text-gray-700 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="w-5 h-5" />
          Deconectează-te
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
