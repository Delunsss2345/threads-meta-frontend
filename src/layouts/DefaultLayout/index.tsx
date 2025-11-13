import { Loading } from "@/components/Loading";
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
        <div className="hidden lg:block">
          <Navbar />
        </div>

        <div className="block lg:hidden">
          <NavMobile />
        </div>

        <Content>
          <Outlet />
        </Content>
      </div>
    </Suspense>
  );
};
export default DefaultLayout;
