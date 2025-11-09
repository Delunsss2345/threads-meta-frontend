import { Outlet } from "react-router-dom";
import Content from "./Content";
import Navbar from "./Navbar";
import NavMobile from "./Navbar/NavMobile";

interface DefaultLayoutProps {
  requireAuth?: boolean;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = () => {
  return (
    <div className="bg-black min-h-screen">
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
  );
};
export default DefaultLayout;
