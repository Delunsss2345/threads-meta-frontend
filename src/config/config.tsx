import PrivateRouter from "@/components/AppRoutes/PrivateRouter";
import AuthLayout from "@/layouts/AuthLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import SettingsLayout from "@/layouts/SettingLayout";
import ActivityPage from "@/pages/ActivityPage";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import PostDetail from "@/pages/PostDetail";
import PrivacyPage from "@/pages/PrivacyPage";
import ProfilePage from "@/pages/Profile";
import SearchPage from "@/pages/Search";
import SettingsPage from "@/pages/Settings";
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
        path: "/settings",
        element: <SettingsPage />,
      },
      {
        path: "/settings",
        element: <SettingsLayout />,
        children: [
          { path: "privacy", element: <PrivacyPage /> },
          { path: "security" },
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
