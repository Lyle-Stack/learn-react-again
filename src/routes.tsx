import { RouteObject } from "react-router-dom";
import ErrorPage from "./pages/errorPage";
import Root from "./root";
import Home from "./pages/home";
import SimpleTodo from "./pages/simpleTodo";
import SimpleForm from "./pages/simpleForm";

export const RootPathes = {
  "/": "/",
  "/simple-todo": "/simple-todo",
  "/simple-form": "simple-form",
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
      { path: RootPathes["/simple-form"], element: <SimpleForm /> },
    ],
  },
] as const;
