import { Link, Outlet } from "react-router-dom";
import { ShoppingCartPathes } from "./routes";

const ShoppingCart = () => {
  return (
    <div className="p-2 flex flex-col gap-4">
      <nav className="flex flex-row gap-1 flex-wrap justify-between">
        <Link to={ShoppingCartPathes["product-list"]}>Products</Link>
        <Link to={ShoppingCartPathes["cart-list"]}>My Cart</Link>
      </nav>
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default ShoppingCart;
