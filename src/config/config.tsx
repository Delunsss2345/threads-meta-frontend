import DefaultLayout from "@/layouts/DefaultLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
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
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];
