import { useEffect, useState } from "react";
import { Product } from "./contextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { ShoppingCartPathes } from "./routes";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const StarIcon = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLOrSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`size-6 ${className}`}
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
      clipRule="evenodd"
    />
  </svg>
);

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<null | Product>(null);

  const fetchProductDetail = async (id: string) => {
    try {
      const apiResponse = await fetch(`https://dummyjson.com/products/${id}`);
      const result = await apiResponse.json();

      if (!result) {
        throw new Error("some bad happened");
      }
      setProduct(result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCart: React.MouseEventHandler<HTMLButtonElement> = () => {
    navigate(`../${ShoppingCartPathes.cart}`);
  };

  useEffect(() => {
    if (id) fetchProductDetail(id);
  }, []);

  if (!product) return <p className="text-sm">Loading ...</p>;

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex items-center space-x-2 px-4 sm:px-6  md:px-8"
          >
            {[product.category, ...product.tags].map((v, i) => (
              <li key={`${v}-${i}`} className="flex items-center">
                <span className="capitalize mr-2 text-sm font-medium text-gray-900">
                  {v}
                </span>
                <svg
                  fill="currentColor"
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </li>
            ))}
            <li className="text-sm">
              <span className="font-medium text-gray-500 hover:text-gray-600">
                {product.title}
              </span>
            </li>
          </ol>
        </nav>

        <div className="mx-auto mt-6 sm:px-6 md:grid md:grid-cols-2 md:gap-x-8 md:px-8">
          <div>
            <div className="aspect-h-1 border shadow aspect-w-1 block overflow-hidden rounded-md">
              <img
                alt={product.description}
                src={product.thumbnail}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-6">
              {product.images.map((src) => (
                <div className="border shadow" key={src}>
                  <img
                    alt={product.description}
                    src={src}
                    className="h-full w-full max-w-20 object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mx-auto pb-4 pt-2 md:pb-12 md:pt-8">
            <div className="mt-4 md:mt-0">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                $ {product.price}
              </p>

              {/* review stars */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          Math.round(product.rating) > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0",
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                </div>
              </div>

              <div className="py-5 md:pb-b md:pt-6">
                {/* Description */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* infomation part */}
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    Infomation
                  </h3>

                  <div className="mt-2">
                    <ul
                      role="list"
                      className="list-disc space-y-1 pl-4 text-sm"
                    >
                      {[
                        product.warrantyInformation,
                        product.shippingInformation,
                        `${product.availabilityStatus} (${product.stock})`,
                        product.returnPolicy,
                      ].map((wd) => (
                        <li key={wd} className="text-gray-400">
                          <span className="text-gray-600">{wd}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* detail part */}
                <div className="mt-4">
                  <h2 className="text-sm font-medium text-gray-900">
                    Details
                  </h2>

                  <div className="mt-2 space-y-6">
                    <ul
                      role="list"
                      className="list-disc space-y-1 pl-4 text-sm"
                    >
                      {JSON.stringify({
                        Weight: product.weight,
                        ...product.dimensions,
                        "Minmum Order Quantity": product.minimumOrderQuantity,
                      })
                        .replace(/[{}"]/g, "")

                        .replace(/[:]/g, " : ")
                        .split(",")
                        .map((wd) => (
                          <li key={wd} className="text-gray-400">
                            <span className="text-gray-600">{wd}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                <button
                  className="mt-6 min-w-48 px-3 py-2 border border-neutral-700 bg-transparent text-sm font-semibold rounded hover:bg-neutral-700 hover:text-white transition-colors"
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
