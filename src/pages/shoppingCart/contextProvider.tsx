import { useEffect, useState } from "react";
import {
  HandleCartAction,
  ProductForCart,
  ProductForList,
  ShoppingCartContext,
} from "./context";

export function ShoppingCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductForList[]>([]);
  const [carts, setCarts] = useState<ProductForCart[]>([
    {
      id: 18,
      title: "Cat Food",
      description:
        "Nutritious cat food formulated to meet the dietary needs of your feline friend.",
      price: 8.99,
      thumbnail:
        "https://cdn.dummyjson.com/products/images/groceries/Cat%20Food/thumbnail.png",
      quantity: 10,
    },
  ]);

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
            prev.map((p) => {
              if (p.id.toString() !== id) return p;
              return {
                ...p,
                quantity: p.quantity - 1,
              };
            }),
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
