import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartPathes } from "./routes";
import { ShoppingCartContext } from "./context";

const CartListPage = () => {
  const { carts, handleCartAction } = useContext(ShoppingCartContext);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 flex h-full flex-col bg-white shadow">
        <div className="flex-1 px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              Shopping cart
            </h2>
          </div>

          <div className="mt-8">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {carts.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      alt={product.description}
                      src={product.thumbnail}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link to={ShoppingCartPathes.products(product.id)}>
                            {product.title}
                          </Link>
                        </h3>
                        <p className="ml-4">{product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex flex-row flex-nowrap gap-2">
                        <p className="text-gray-500 min-w-12">
                          Qty {product.quantity}
                        </p>

                        <button
                          type="button"
                          className="font-medium text-white hover:text-black transition-colors bg-indigo-600 hover:bg-indigo-200 border px-2 rounded"
                          onClick={() =>
                            handleCartAction(product.id.toString(), "minus")
                          }
                        >
                          -
                        </button>
                        <button
                          type="button"
                          className="font-medium text-white hover:text-black transition-colors bg-indigo-600 hover:bg-indigo-200 border px-1.5 rounded"
                          onClick={() =>
                            handleCartAction(product.id.toString(), "add")
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-300"
                        onClick={() =>
                          handleCartAction(product.id.toString(), "delete")
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="px-4 py-6 sm:px-6 bg-white shadow md:self-end">
        <div className="font-medium text-gray-900">
          <p>Order Summary</p>
          <hr className="my-2" />
          <p>
            Total ${" "}
            {carts
              .reduce((pre, cur) => pre + cur.price * cur.quantity, 0)
              .toFixed(2)}
          </p>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-4 flex flex-col items-center justify-center text-center text-sm text-gray-500">
          <button className="min-w-48 px-3 py-2 font-medium text-white hover:text-black transition-colors bg-indigo-600 hover:bg-indigo-200 border rounded">
            Checkout
          </button>
          <p className="mt-4">
            or{" "}
            <button
              type="button"
              // onClick={() => setOpen(false)}
              className="font-medium text-indigo-600 hover:text-indigo-300"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartListPage;
