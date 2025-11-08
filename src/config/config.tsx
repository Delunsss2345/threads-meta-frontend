import PrivateRouter from "@/components/AppRoutes/PrivateRouter";
import AuthLayout from "@/layouts/AuthLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import ActivityPage from "@/pages/ActivityPage";
import Login from "@/pages/Auth/Login";
import Home from "@/pages/Home";
import ProfilePage from "@/pages/Profile";
import SearchPage from "@/pages/Search";
import { type RouteObject } from "react-router-dom";

export const config: RouteObject[] = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRouter>
            <ProfilePage />
          </PrivateRouter>
        ),
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/activity",
        element: (
          <PrivateRouter>
            <ActivityPage />
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
];

export const privateRoute = ["/profile", "/activity"];
