import { createContext, useEffect, useState } from "react";

type Product = {
  id: number; //
  title: string; //
  description: string; //
  category: string;
  price: number; //
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
  images: string[]; //
  thumbnail: string; //
};

export const ShoppingCartContext = createContext<{
  isLoading: boolean;
  products: Product[];
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
  const [products, setProducts] = useState<Product[]>([]);

  const fetchListOfProducts = async () => {
    try {
      const apiResponse = await fetch(
        "https://dummyjson.com/products?limit=12&skip=15",
      );
      const result = await apiResponse.json();

      if (result?.products) {
        setProducts(result.products);
      }
      throw new Error("some bad happened");
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
