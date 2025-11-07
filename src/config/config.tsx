import DefaultLayout from "@/layouts/DefaultLayout";
import ActivityPage from "@/pages/ActivityPage";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
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
        element: <ProfilePage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/activity",
        element: <ActivityPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];
