import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import { ShoppingCartProvider } from "./contextProvider";

const ShoppingCart = () => {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <section className="pt-2">
        <Outlet />
      </section>
    </ShoppingCartProvider>
  );
};

export default ShoppingCart;
