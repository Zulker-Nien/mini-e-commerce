import Image from "next/image";
import ToggleButton from "../Mobile/ToggleButton";
import { CategoryProps } from "@/app/page";
import { useEffect, useState } from "react";
import CartSlider from "./CartSlider";

type NavbarProps = {
  handleMenuOpen: () => void;
  handleActiveCategory: (arg0: string) => void;
  menuIsActive: boolean;
  categoryData: string[];
  cartItems: CategoryProps | CategoryProps[];
  handleRemoveCartItem: (arg0: number) => void;
  subtotal: number;
};

const Navbar = (props: NavbarProps) => {
  const [cartOpen, setCartOpen] = useState(false);
  const handleCartClose = () => {
    setCartOpen(false);
  };
  return (
    <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-b border-gray-200">
        <div className="flex h-16 items-center">
          <ToggleButton handleMenuOpen={props.handleMenuOpen} />
          <div className="ml-4 flex lg:ml-0">
            <button onClick={() => props.handleActiveCategory("")}>
              <span className="sr-only text-white">Your Company</span>
              <Image
                width={400}
                height={400}
                className="h-8 w-auto"
                src="/next.svg"
                alt=""
              />
            </button>
          </div>

          <div className="hidden lg:ml-8 lg:block lg:self-stretch">
            <div className="flex h-full space-x-8">
              {props.categoryData &&
                props.categoryData.map((item, index) => {
                  return (
                    <div className="flex" key={index}>
                      <div className="relative flex" key={index}>
                        <button
                          type="button"
                          className="capitalize border-transparent text-pink-700 hover:text-white relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                          aria-expanded="false"
                          key={index}
                          onClick={() => props.handleActiveCategory(item)}
                        >
                          {item}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          {/* )} */}

          <div className="ml-auto flex items-center">
            <div className="ml-4 flow-root lg:ml-6 z-20">
              <button
                onClick={() => {
                  setCartOpen(!cartOpen);
                }}
                className="group -m-2 flex items-center p-2 cursor-pointer"
              >
                <svg
                  className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                  {Array.isArray(props.cartItems) &&
                    props.cartItems &&
                    props.cartItems.length}
                </span>
                <span className="sr-only">items in cart, view bag</span>
              </button>
              {cartOpen && (
                <CartSlider
                  cartItems={props.cartItems}
                  handleCartClose={handleCartClose}
                  handleRemoveCartItem={props.handleRemoveCartItem}
                  subtotal={props.subtotal}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
