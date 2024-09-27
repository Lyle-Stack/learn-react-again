import { RouteObject } from "react-router-dom";
import ErrorPage from "./pages/errorPage";
import Root from "./root";
import Home from "./pages/home";
import SimpleTodo from "./pages/simpleTodo";

export const RootPathes = {
  "/": "/",
  "/simple-todo": "/simple-todo",
} as const;

export const routeObject: RouteObject[] = [
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: RootPathes["/"],
        element: <Home />,
      },
      {
        path: RootPathes["/simple-todo"],
        element: <SimpleTodo />,
      },
    ],
  },
] as const;
