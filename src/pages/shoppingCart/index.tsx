import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

const ShoppingCart = () => {
  return (
    <>
      <Navbar />
      <section className="pt-2">
        <Outlet />
      </section>
    </>
  );
};

export default ShoppingCart;
