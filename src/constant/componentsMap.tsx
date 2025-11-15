import ActivityPage from "@/pages/ActivityPage";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import SearchPage from "@/pages/Search";

export const COMPONENTS_MAP: Record<string, React.ReactNode> = {
  "/search": <SearchPage />,
  "/": <Home />,
  "/activity": <ActivityPage />,
  "/profile": <Profile />,
};
