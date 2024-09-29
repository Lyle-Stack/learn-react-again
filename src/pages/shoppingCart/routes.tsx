import { RouteObject } from "react-router-dom";
import ProductListPage from "./productList";
import ProductDetailPage from "./productDetail";
import CartListPage from "./cartList";

export const ShoppingCartPathes = {
  products: (id: string | number) => `${id}`,
  cart: "cart",
} as const;

export const ShoppingCartRouteObject: RouteObject[] = [
  {
    index: true,
    element: <ProductListPage />,
  },
  {
    path: ShoppingCartPathes["products"](":id"),
    element: <ProductDetailPage />,
  },
  {
    path: ShoppingCartPathes["cart"],
    element: <CartListPage />,
  },
] as const;
