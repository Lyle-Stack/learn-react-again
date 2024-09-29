import { Link, Outlet } from "react-router-dom";
import { ShoppingCartPathes } from "./routes";
import { RootPathes } from "../../routes";

const ShoppingCart = () => {
  return (
    <div className="p-2 flex flex-col gap-4">
      <nav className="flex flex-row gap-1 flex-wrap justify-between">
        <Link to={`../${RootPathes["shopping-cart"]}`}>Products</Link>
        <Link to={ShoppingCartPathes["cart"]}>My Cart</Link>
      </nav>
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default ShoppingCart;
