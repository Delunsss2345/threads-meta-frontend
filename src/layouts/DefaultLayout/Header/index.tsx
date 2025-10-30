import { PAGE_TITLES_BY_PATH } from "@/constant/pageTitles";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const title = PAGE_TITLES_BY_PATH[pathname] || "Ứng dụng";

  return (
    <div className="sticky top-0 bg-black/80">
      <h1 className="text-center py-4 font-semibold text-lg">{title}</h1>
    </div>
  );
};

export default Header;
