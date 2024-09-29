import { createContext } from "react";

export type ProductForList = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

export type ProductForCart = ProductForList & {
  quantity: number;
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
  carts: ProductForCart[];
  handleCartAction: HandleCartAction;
}>({
  isLoading: true,
  products: [],
  carts: [],
  handleCartAction: async () => {},
});

export type HandleCartAction = (
  id: string,
  action: "create" | "add" | "minus" | "delete",
) => Promise<void>;
