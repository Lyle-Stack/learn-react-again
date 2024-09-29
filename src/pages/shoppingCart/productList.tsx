import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartPathes } from "./routes";
import { ShoppingCartContext } from "./context";

const ProductListPage = () => {
  const { isLoading, products } = useContext(ShoppingCartContext);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pt-8 pb-16 sm:px-6 sm:pb-24 sm:pt-12 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Our Feature Products
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {isLoading ? (
            <p className="text-sm">Loading ...</p>
          ) : !products.length ? (
            <p className="text-sm">No Product Found ...</p>
          ) : (
            products.map((product) => (
              <Link
                key={product.id}
                to={ShoppingCartPathes["products"](product.id)}
                className="group"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    alt={product.description}
                    src={product.thumbnail}
                    className="h-full w-full object-cover object-center group-hover:opacity-75 group-hover:scale-125 transition-transform"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.price}
                </p>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
