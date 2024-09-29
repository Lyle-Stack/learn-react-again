import { createContext, useEffect, useState } from "react";

export type ProductForList = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

export type Product = ProductForList & {
  category: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
};

export const ShoppingCartContext = createContext<{
  isLoading: boolean;
  products: ProductForList[];
}>({
  isLoading: true,
  products: [],
});

export function ShoppingCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductForList[]>([]);

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
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
