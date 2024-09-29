import { useEffect, useState } from "react";
import {
  HandleCartAction,
  ProductForCart,
  ProductForList,
  ShoppingCartContext,
} from "./context";

const getInitialState = () => {
  const carts = sessionStorage.getItem("carts");
  return carts ? JSON.parse(carts) : [];
};

export function ShoppingCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductForList[]>([]);
  const [carts, setCarts] = useState<ProductForCart[]>(getInitialState());

  const handleCartAction: HandleCartAction = async (id, action) => {
    try {
      // never believe data on client side
      const apiResponse = await fetch(
        `https://dummyjson.com/products/${id}?select=id,title,description,price,thumbnail`,
      );

      const result = (await apiResponse.json()) as ProductForList;

      if (!result) throw new Error("some bad happened");

      switch (action) {
        case "delete":
          setCarts((prev) => prev.filter((p) => p.id.toString() !== id));
          break;
        case "add":
          setCarts((prev) =>
            prev.map((p) => {
              if (p.id.toString() !== id) return p;
              return {
                ...p,
                quantity: p.quantity + 1,
              };
            }),
          );
          break;
        case "minus":
          setCarts((prev) =>
            prev
              .map((p) => {
                if (p.id.toString() !== id) return p;
                if (p.quantity <= 1) return null;
                return {
                  ...p,
                  quantity: p.quantity - 1,
                };
              })
              .filter((p) => !!p),
          );
          break;
        default:
          setCarts((prev) => {
            const isExistIndex = prev.findIndex((p) => p.id.toString() === id);
            if (isExistIndex < 0) return [...prev, { ...result, quantity: 1 }];
            return prev.map((p) => {
              if (p.id.toString() !== id) return p;
              return {
                ...p,
                quantity: p.quantity + 1,
              };
            });
          });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchListOfProducts = async () => {
    try {
      const apiResponse = await fetch(
        "https://dummyjson.com/products?limit=12&skip=15&select=id,title,description,price,thumbnail",
      );
      const result = await apiResponse.json();

      if (!result?.products) {
        throw new Error("some bad happened");
      }
      setProducts(result.products);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchListOfProducts();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("carts", JSON.stringify(carts));
  }, [carts]);

  return (
    <ShoppingCartContext.Provider
      value={{
        isLoading,
        products,
        carts,
        handleCartAction,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
