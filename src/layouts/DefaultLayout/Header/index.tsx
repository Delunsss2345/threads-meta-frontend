import { PAGE_TITLES_BY_PATH } from "@/constant/pageTitles";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const title = PAGE_TITLES_BY_PATH[pathname] || "Ứng dụng";

  return (
    <div className="hidden lg:block fixed top-0 left-0 right-0 bg-background z-10">
      <h1 className="text-center py-4 font-semibold text-lg">{title}</h1>
    </div>
  );
};

export default Header;
