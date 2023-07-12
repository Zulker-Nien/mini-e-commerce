import Image from "next/image";
import { CategoryProps } from "@/app/page";
import React, { useState } from "react";
import { motion } from "framer-motion";

type CartProps = {
  cartItems: CategoryProps | CategoryProps[];
  handleCartClose: () => void;
  handleRemoveCartItem: (arg0: number) => void;
  subtotal: number;
  cartOpen: boolean;
};
const cartVariants = {
  show: {
    x: 0,
    transition: {
      ease: "easeOut",
      duration: 0.3,
    },
  },
  hide: {
    x: 20,
    transition: {
      ease: "easeIn",
      duration: 0.5,
    },
  },
};

const CartSlider = (props: CartProps) => {
  const [cartItems, setCartItems] = useState<CategoryProps[]>(
    Array.isArray(props.cartItems) ? props.cartItems : [props.cartItems]
  );

  return (
    <div
      className="relative z-10 "
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
      data-aos="fade-left"
    >
      <div className="fixed inset-0 overflow-hidden ">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <motion.div
                variants={cartVariants}
                animate={props.cartOpen ? "show" : "hide"}
                initial="hide"
                className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl "
              >
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2
                      className="text-lg font-medium text-gray-900"
                      id="slide-over-title"
                    >
                      Shopping cart
                    </h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        onClick={props.handleCartClose}
                        type="button"
                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Close panel</span>
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
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {Array.isArray(props.cartItems) &&
                          props.cartItems.map((item) => {
                            const itemCount = cartItems.filter(
                              (cartItem) => cartItem.id === item.id
                            ).length;

                            return (
                              <li className="flex py-6" key={item.id}>
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <Image
                                    width={100}
                                    height={100}
                                    src={item.image}
                                    alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div
                                  className="ml-4 flex flex-1 flex-col"
                                  key={item.id}
                                >
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href="#">{item.title}</a>
                                      </h3>
                                      <p className="ml-4">${item.totalPrice}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      Salmon
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      Qty {item.quantity}
                                    </p>

                                    <div className="flex">
                                      <button
                                        onClick={() =>
                                          props.handleRemoveCartItem(item.id)
                                        }
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove quantity
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${props.subtotal}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSlider;
