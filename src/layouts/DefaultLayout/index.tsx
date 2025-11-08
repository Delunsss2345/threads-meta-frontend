import { Outlet } from "react-router-dom";
import Content from "./Content";
import Navbar from "./Navbar";

interface DefaultLayoutProps {
  requireAuth?: boolean;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Content>
        <Outlet />
      </Content>
    </div>
  );
};
export default DefaultLayout;
