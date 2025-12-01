import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Outlet } from "react-router-dom";
import SidebarSettings from "./Sidebar";

const SettingsLayout = () => {
  const isMobile = useIsMobile();
  return (
    <SidebarProvider>
      {isMobile ? null : <SidebarSettings />}
      <SidebarGroup>
        <SidebarGroupContent>
          <div className="pt-5 pl-2">
            <Outlet />
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarProvider>
  );
};

export default SettingsLayout;
