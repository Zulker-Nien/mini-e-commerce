import React, { useMemo, useState } from "react";
import { CategoryProps } from "@/app/page";
import Image from "next/image";
import { motion } from "framer-motion";

type ProductProps = {
  productItems: CategoryProps | null;
  handleProductClose: () => void;
  handleCartItem: (arg0: CategoryProps) => void;
  cartItems: CategoryProps[];
  handleCartOpen: () => void;
};

const productAnimationVariants = {
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      ease: "easeOut",
      duration: 0.3,
    },
  },
  hide: {
    scale: 0.9,
    opacity: 0.3,
    transition: {
      ease: "easeIn",
      duration: 0.1,
    },
  },
};
const Product: React.FC<ProductProps> = (props) => {
  const { productItems } = props;
  const cacheProducts = productItems;
  const [itemCount, setItemCount] = useState(0);
  const rating = useMemo(
    () => Math.round(Number(productItems?.rating.rate)),
    [productItems?.rating.rate]
  );

  console.log(props.cartItems);

  const svgs = [];
  const renderSvgUsingLoop = () => {
    const svgs = [];
    for (let i = 0; i < rating; i++) {
      svgs.push(
        <svg
          key={i}
          className="text-gray-900 h-5 w-5 flex-shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    for (let i = 0; i < 5 - rating; i++) {
      svgs.push(
        <svg
          key={i + rating}
          className="text-gray-200 h-5 w-5 flex-shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return svgs;
  };

  if (!cacheProducts) {
    return null;
  } else {
    return (
      <div className="relative z-50" role="dialog" aria-modal="true">
        <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"></div>
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex  min-h-full md:w-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <div className="flex justify-center items-center  w-11/12 h-5/6  transform text-left text-base transition lg:w-6/12 md:my-8  md:px-4 lg:max-w-full">
              <motion.div
                variants={productAnimationVariants}
                animate={cacheProducts ? "show" : "hide"}
                initial="hide"
                className="relative bg-white flex w-screen sm:w-screen items-center overflow-hidden px-4 pb-8 pt-14  shadow-2xl sm:px-4 sm:pt-8 md:p-6 lg:p-8"
              >
                <button
                  onClick={props.handleProductClose}
                  type="button"
                  className="absolute z-50 right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <>
                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-h-3 h-full aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5 flex flex-col text-center justify-center items-center">
                      {cacheProducts && (
                        <Image
                          width={300}
                          height={300}
                          src={cacheProducts.image}
                          alt={cacheProducts.title}
                          className="ease-in duration-300 object-cover object-center"
                        />
                      )}
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                        {cacheProducts.title}
                      </h2>

                      <section
                        aria-labelledby="information-heading"
                        className="mt-2"
                      >
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>
                        <p className="text-2xl text-gray-900">
                          $ {cacheProducts.price}
                        </p>
                        <p className="text-l text-gray-900">
                          {cacheProducts.description}
                        </p>

                        <div className="mt-6">
                          <h4 className="sr-only">Reviews</h4>
                          <div className="flex items-center">
                            <div className="flex items-center">
                              {renderSvgUsingLoop()}
                            </div>
                            <a
                              href="#"
                              className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              {cacheProducts.rating.count}
                            </a>
                          </div>
                        </div>
                      </section>

                      <section
                        aria-labelledby="options-heading"
                        className="mt-10 grid grid-cols-2 gap-4"
                      >
                        <button
                          onClick={() => {
                            if (cacheProducts) {
                              props.handleCartItem(cacheProducts);
                              setItemCount(itemCount + 1);
                            }
                          }}
                          className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => {
                            props.handleCartOpen();
                            props.handleProductClose();
                          }}
                          className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Go to Cart
                        </button>
                        <h1 className="text-indigo-600">
                          Quantity-selected: {itemCount}
                        </h1>
                      </section>
                    </div>
                  </div>
                </>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Product;
