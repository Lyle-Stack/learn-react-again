import { RouteObject } from "react-router-dom";
import ErrorPage from "./pages/errorPage";
import Root from "./root";
import Home from "./pages/home";
import SimpleTodo from "./pages/simpleTodo";
import SimpleForm from "./pages/simpleForm";
import LoginAndRegisterFrom from "./pages/loginAndRegister";
import ReactHookForm from "./pages/reactHookForm";
import ReactQuery from "./pages/reactQuery";
import ShoppingCart from "./pages/shoppingCart";
import { ShoppingCartRouteObject } from "./pages/shoppingCart/routes";

export const RootPathes = {
  "/": "/",
  "simple-todo": "simple-todo",
  "simple-form": "simple-form",
  "login-and-register-form": "login-and-register-form",
  "react-hook-form": "react-hook-form",
  "react-query": "react-query",
  "shopping-cart": "shopping-cart",
} as const;

export const routeObject: RouteObject[] = [
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        id: RootPathes["/"],
        path: RootPathes["/"],
        element: <Home />,
      },
      {
        id: RootPathes["simple-todo"],
        path: RootPathes["simple-todo"],
        element: <SimpleTodo />,
      },
      {
        id: RootPathes["simple-form"],
        path: RootPathes["simple-form"],
        element: <SimpleForm />,
      },
      {
        id: RootPathes["login-and-register-form"],
        path: RootPathes["login-and-register-form"],
        element: <LoginAndRegisterFrom />,
      },
      {
        id: RootPathes["react-hook-form"],
        path: RootPathes["react-hook-form"],
        element: <ReactHookForm />,
      },
      {
        id: RootPathes["react-query"],
        path: RootPathes["react-query"],
        element: <ReactQuery />,
      },
      {
        id: RootPathes["shopping-cart"],
        path: RootPathes["shopping-cart"],
        element: <ShoppingCart />,
        children: ShoppingCartRouteObject,
      },
    ],
  },
] as const;
