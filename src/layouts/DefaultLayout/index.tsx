import FixedNewPostButton from "@/components/FixedNewPostButton";
import AddColumnIcon from "@/components/Icon/AddColIcon";
import { Loading } from "@/components/Loading";
import MenuAddContent from "@/pages/Home/MenuAddContent";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Content from "./Content";
import Navbar from "./Navbar";
import NavMobile from "./Navbar/NavMobile";

interface DefaultLayoutProps {
  requireAuth?: boolean;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="bg-background main-container">
        <div className="hidden md:block">
          <Navbar />
        </div>

        <div className="block md:hidden">
          <NavMobile />
        </div>

        <Content>
          <Outlet />
        </Content>
        <FixedNewPostButton />
        
      </div>
    </Suspense>
  );
};
export default DefaultLayout;
