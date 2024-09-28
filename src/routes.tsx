import { RouteObject } from "react-router-dom";
import ErrorPage from "./pages/errorPage";
import Root from "./root";
import Home from "./pages/home";
import SimpleTodo from "./pages/simpleTodo";
import SimpleForm from "./pages/simpleForm";
import LoginAndRegisterFrom from "./pages/loginAndRegister";
import ReactHookForm from "./pages/reactHookForm";
import ReactQuery from "./pages/reactQuery";

export const RootPathes = {
  "/": "/",
  "simple-todo": "simple-todo",
  "simple-form": "simple-form",
  "login-and-register-form": "login-and-register-form",
  "react-hook-form": "react-hook-form",
  "react-query": "react-query",
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
        path: RootPathes["simple-todo"],
        element: <SimpleTodo />,
      },
      { path: RootPathes["simple-form"], element: <SimpleForm /> },
      {
        path: RootPathes["login-and-register-form"],
        element: <LoginAndRegisterFrom />,
      },
      {
        path: RootPathes["react-hook-form"],
        element: <ReactHookForm />,
      },
      {
        path: RootPathes["react-query"],
        element: <ReactQuery />,
      },
    ],
  },
] as const;
