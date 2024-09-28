import { RouteObject } from "react-router-dom";
import ProductListPage from "./productList";
import ProductDetailPage from "./productDetail";
import CartListPage from "./cartList";

export const ShoppingCartPathes = {
  "product-list": "product-list",
  "product-detail": "product-detail",
  "cart-list": "cart-list",
} as const;

export const ShoppingCartRouteObject: RouteObject[] = [
  {
    path: ShoppingCartPathes["product-list"],
    element: <ProductListPage />,
  },
  {
    path: ShoppingCartPathes["product-detail"],
    element: <ProductDetailPage />,
  },
  {
    path: ShoppingCartPathes["cart-list"],
    element: <CartListPage />,
  },
] as const;
