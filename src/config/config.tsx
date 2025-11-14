import PrivateRouter from "@/components/AppRoutes/PrivateRouter";
import AuthLayout from "@/layouts/AuthLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import SettingsLayout from "@/layouts/SettingLayout";
import AccountStatus from "@/pages/AccounStatus";
import Account from "@/pages/Account";
import ActivityPage from "@/pages/ActivityPage";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Help from "@/pages/Help";
import Home from "@/pages/Home";
import Liked from "@/pages/Liked";
import NotFound from "@/pages/NotFound";
import PostDetail from "@/pages/PostDetail";
import PrivacyPage from "@/pages/PrivacyPage";
import ProfilePage from "@/pages/Profile";
import Saved from "@/pages/Saved";
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
        path: "/detail",
        element: <PostDetail />,
      },
      {
        path: "/activity",
        element: (
          <PrivateRouter>
            <ActivityPage />
          </PrivateRouter>
        ),
      },
      {
        path: "/liked",
        element: <Liked />,
      },
      {
        path: "/saved",
        element: <Saved />,
      },
      {
        path: "/settings",
        element: <SettingsLayout />,
        children: [
          { path: "privacy", element: <PrivacyPage /> },
          { path: "help", element: <Help /> },
          { path: "account", element: <Account /> },
          { path: "account_status", element: <AccountStatus /> },
        ],
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
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const privateRoute = ["/profile", "/activity"];
