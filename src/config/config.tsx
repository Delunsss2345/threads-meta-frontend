import PrivateRouter from "@/components/AppRoutes/PrivateRouter";
import AuthLayout from "@/layouts/AuthLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import ActivityPage from "@/pages/ActivityPage";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Home from "@/pages/Home";
import PostDetail from "@/pages/PostDetail";
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
];

export const privateRoute = ["/profile", "/activity"];
