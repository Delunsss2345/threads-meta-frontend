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
import ResetPassword from "@/pages/Auth/ResetPassword";
import VerifyEmail from "@/pages/Auth/VerifyEmail";
import Following from "@/pages/Following";
import Help from "@/pages/Help";
import Home from "@/pages/Home";
import Liked from "@/pages/Liked";
import NotFound from "@/pages/NotFound";
import PostDetail from "@/pages/PostDetail";
import PrivacyPage from "@/pages/PrivacyPage";
import ProfilePage from "@/pages/Profile";
import ProfileDetail from "@/pages/ProfileDetail";
import Saved from "@/pages/Saved";
import SearchPage from "@/pages/Search";
import SettingsPage from "@/pages/Settings";
import type { RouteObject } from "react-router-dom";

export const config: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password", element: <ResetPassword /> },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
    ],
  },

  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "@:username",
        element: <ProfileDetail />,
      },
      {
        path: "profile",
        element: (
          <PrivateRouter>
            <ProfilePage />
          </PrivateRouter>
        ),
      },
      {
        path: "profile/replies",
        element: (
          <PrivateRouter>
            <ProfilePage />
          </PrivateRouter>
        ),
      },
      {
        path: "profile/media",
        element: (
          <PrivateRouter>
            <ProfilePage />
          </PrivateRouter>
        ),
      },
      {
        path: "profile/reposts",
        element: (
          <PrivateRouter>
            <ProfilePage />
          </PrivateRouter>
        ),
      },

      { path: "search", element: <SearchPage /> },

      { path: "@:username/post/:id", element: <PostDetail /> },
      { path: "post/:id", element: <PostDetail /> },

      {
        path: "activity",
        element: (
          <PrivateRouter>
            <ActivityPage />
          </PrivateRouter>
        ),
      },

      { path: "liked", element: <Liked /> },
      { path: "saved", element: <Saved /> },
      { path: "following", element: <Following /> },
      { path: "settings", element: <SettingsPage /> },

      {
        path: "settings",
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
    path: "*",
    element: <NotFound />,
  },
];

export const privateRoute = ["/profile", "/activity"];
