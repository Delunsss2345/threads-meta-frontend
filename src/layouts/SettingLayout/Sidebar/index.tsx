import AccountPrivacyIcon from "@/components/Icon/AccountPrivacyIcon";
import HelpPrivacyIcon from "@/components/Icon/HelpPrivacyIcon";
import PrivacyIcon from "@/components/Icon/PrivacyIcon";
import UserPrivacyIcon from "@/components/Icon/UserPrivacyIcon";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const items = [
  {
    title: "Quyền riêng tư",
    url: "/settings/privacy",
    icon: PrivacyIcon,
  },
  {
    title: "Trạng thái tài khoản",
    url: "/settings/account_status",
    icon: UserPrivacyIcon,
  },

  {
    title: "Tài khoản",
    url: "/settings/account",
    icon: AccountPrivacyIcon,
  },
  {
    title: "Trợ giúp",
    url: "/settings/help",
    icon: HelpPrivacyIcon,
  },
];

const SidebarSettings = () => {
  const location = useLocation();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <SidebarMenu className="space-y-1 w-[var(--sidebar-menu)] border-r-1 pr-4 pt-5">
      {items.map((item) => {
        const isActive = location.pathname === item.url;

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <NavLink
                to={item.url}
                className={`
              flex items-center gap-3 p-5 rounded-xl w-full transition-colors
              ${isActive ? "bg-muted text-foreground" : "text-foreground"}
            `}
              >
                <item.icon size={24} className="text-foreground" />
                <span className="text-[15px]">{item.title}</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};

export default SidebarSettings;
