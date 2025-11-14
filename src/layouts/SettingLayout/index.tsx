import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import SidebarSettings from "./Sidebar";

const SettingsLayout = () => {
  return (
    <SidebarProvider>
      <SidebarSettings />
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
