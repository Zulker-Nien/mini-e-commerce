"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Transition } from "@headlessui/react";
import StoreNavigation from "./Components/Header/StoreNavigation";
import Landing from "./Components/Header/Landing";

type CategoryProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function Home() {
  const [menuIsActive, setMenuIsActive] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<string[]>([]);
  const [categoryItems, setCategoryItems] = useState<CategoryProps[]>([]);
  const [categoryIsActive, setCategoryIsActive] = useState<string>();

  const handleMenuOpen = () => {
    console.log(menuIsActive, "open");
    setMenuIsActive(true);
  };
  const handleMenuClose = () => {
    console.log(menuIsActive, "close");
    setMenuIsActive(false);
  };
  const handleActiveCategory = (item: string) => {
    console.log(categoryIsActive, "open");
    setCategoryIsActive(item);
  };

  const getAllCategories = useMemo(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategoryData(data);
      });
  }, []);

  useEffect(() => {
    getAllCategories;
  }, [getAllCategories]);

  const getCategoryItems = useMemo(() => {
    fetch(`https://fakestoreapi.com/products/category/${categoryIsActive}`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryItems(data);
        console.log(data);
      });
  }, [categoryIsActive]);

  useEffect(() => {
    getCategoryItems;
  }, [categoryIsActive]);

  return (
    <>
      <div className="bg-black">
        {menuIsActive && (
          <div
            className="relative z-40 lg:hidden"
            role="dialog"
            aria-modal="true"
          >
            <Transition
              show={menuIsActive}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-white bg-opacity-25"></div>
              <div className="fixed inset-0 z-40 flex">
                <Transition
                  show={menuIsActive}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                    <div className="flex px-4 pb-2 pt-5">
                      <button
                        onClick={() => {
                          handleMenuClose();
                        }}
                        type="button"
                        className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 damn"
                      >
                        <span className="sr-only">Close menu</span>
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

                    {/* <!-- Links --> */}
                    <div className="mt-2">
                      <div className="border-b border-gray-200">
                        <div
                          className="-mb-px flex space-x-8 px-4"
                          aria-orientation="horizontal"
                          role="tablist"
                        >
                          {/* <!-- Selected: "border-indigo-600 text-indigo-600", Not Selected: "border-transparent text-gray-900" --> */}
                          <button
                            id="tabs-1-tab-1"
                            className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            aria-controls="tabs-1-panel-1"
                            role="tab"
                            type="button"
                          >
                            Women
                          </button>
                          {/* <!-- Selected: "border-indigo-600 text-indigo-600", Not Selected: "border-transparent text-gray-900" --> */}
                          <button
                            id="tabs-1-tab-2"
                            className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            aria-controls="tabs-1-panel-2"
                            role="tab"
                            type="button"
                          >
                            Men
                          </button>
                        </div>
                      </div>

                      {/* <!-- 'Women' tab panel, show/hide based on tab state. --> */}
                      <div
                        id="tabs-1-panel-1"
                        className="space-y-10 px-4 pb-8 pt-10"
                        aria-labelledby="tabs-1-tab-1"
                        role="tabpanel"
                        tabIndex={0}
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          <div className="group relative text-sm">
                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                              <Image
                                width={100}
                                height={100}
                                src="./next.svg"
                                alt="Models sitting back to back, wearing Basic Tee in black and bone."
                                className="object-cover object-center"
                              />
                            </div>
                            <a
                              href="#"
                              className="mt-6 block font-medium text-gray-900"
                            >
                              <span
                                className="absolute inset-0 z-10"
                                aria-hidden="true"
                              ></span>
                              New Arrivals
                            </a>
                            <p aria-hidden="true" className="mt-1">
                              Shop now
                            </p>
                          </div>
                          <div className="group relative text-sm">
                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                              <Image
                                width={100}
                                height={100}
                                src="./next.svg"
                                alt="Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees."
                                className="object-cover object-center"
                              />
                            </div>
                            <a
                              href="#"
                              className="mt-6 block font-medium text-gray-900"
                            >
                              <span
                                className="absolute inset-0 z-10"
                                aria-hidden="true"
                              ></span>
                              Basic Tees
                            </a>
                            <p aria-hidden="true" className="mt-1">
                              Shop now
                            </p>
                          </div>
                        </div>
                        <div>
                          <p
                            id="women-clothing-heading-mobile"
                            className="font-medium text-gray-900"
                          >
                            Clothing
                          </p>
                          <ul
                            role="list"
                            aria-labelledby="women-clothing-heading-mobile"
                            className="mt-6 flex flex-col space-y-6"
                          >
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Tops
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Dresses
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Pants
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Denim
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Sweaters
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                T-Shirts
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Jackets
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Activewear
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Browse All
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p
                            id="women-accessories-heading-mobile"
                            className="font-medium text-gray-900"
                          >
                            Accessories
                          </p>
                          <ul
                            role="list"
                            aria-labelledby="women-accessories-heading-mobile"
                            className="mt-6 flex flex-col space-y-6"
                          >
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Watches
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Wallets
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Bags
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Sunglasses
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Hats
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Belts
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p
                            id="women-brands-heading-mobile"
                            className="font-medium text-gray-900"
                          >
                            Brands
                          </p>
                          <ul
                            role="list"
                            aria-labelledby="women-brands-heading-mobile"
                            className="mt-6 flex flex-col space-y-6"
                          >
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Full Nelson
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                My Way
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Re-Arranged
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Counterfeit
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Significant Other
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* <!-- 'Men' tab panel, show/hide based on tab state. --> */}
                      <div
                        id="tabs-1-panel-2"
                        className="space-y-10 px-4 pb-8 pt-10"
                        aria-labelledby="tabs-1-tab-2"
                        role="tabpanel"
                        tabIndex={0}
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          <div className="group relative text-sm">
                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                              <Image
                                width={100}
                                height={100}
                                src="./next.svg"
                                alt="Drawstring top with elastic loop closure and textured interior padding."
                                className="object-cover object-center"
                              />
                            </div>
                            <a
                              href="#"
                              className="mt-6 block font-medium text-gray-900"
                            >
                              <span
                                className="absolute inset-0 z-10"
                                aria-hidden="true"
                              ></span>
                              New Arrivals
                            </a>
                            <p aria-hidden="true" className="mt-1">
                              Shop now
                            </p>
                          </div>
                          <div className="group relative text-sm">
                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                              <Image
                                width={100}
                                height={100}
                                src="./next.svg"
                                alt="Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt."
                                className="object-cover object-center"
                              />
                            </div>
                            <a
                              href="#"
                              className="mt-6 block font-medium text-gray-900"
                            >
                              <span
                                className="absolute inset-0 z-10"
                                aria-hidden="true"
                              ></span>
                              Artwork Tees
                            </a>
                            <p aria-hidden="true" className="mt-1">
                              Shop now
                            </p>
                          </div>
                        </div>
                        <div>
                          <p
                            id="men-clothing-heading-mobile"
                            className="font-medium text-gray-900"
                          >
                            Clothing
                          </p>
                          <ul
                            role="list"
                            aria-labelledby="men-clothing-heading-mobile"
                            className="mt-6 flex flex-col space-y-6"
                          >
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Tops
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Pants
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Sweaters
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                T-Shirts
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Jackets
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Activewear
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Browse All
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p
                            id="men-accessories-heading-mobile"
                            className="font-medium text-gray-900"
                          >
                            Accessories
                          </p>
                          <ul
                            role="list"
                            aria-labelledby="men-accessories-heading-mobile"
                            className="mt-6 flex flex-col space-y-6"
                          >
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Watches
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Wallets
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Bags
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Sunglasses
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Hats
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Belts
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p
                            id="men-brands-heading-mobile"
                            className="font-medium text-gray-900"
                          >
                            Brands
                          </p>
                          <ul
                            role="list"
                            aria-labelledby="men-brands-heading-mobile"
                            className="mt-6 flex flex-col space-y-6"
                          >
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Re-Arranged
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Counterfeit
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                Full Nelson
                              </a>
                            </li>
                            <li className="flow-root">
                              <a
                                href="#"
                                className="-m-2 block p-2 text-gray-500"
                              >
                                My Way
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                      <div className="flow-root">
                        <a
                          href="#"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Company
                        </a>
                      </div>
                      <div className="flow-root">
                        <a
                          href="#"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Stores
                        </a>
                      </div>
                    </div>

                    <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                      <div className="flow-root">
                        <a
                          href="#"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Sign in
                        </a>
                      </div>
                      <div className="flow-root">
                        <a
                          href="#"
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Create account
                        </a>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6">
                      <a href="#" className="-m-2 flex items-center p-2">
                        <Image
                          width={100}
                          height={100}
                          src="./next.svg"
                          alt=""
                          className="block h-auto w-5 flex-shrink-0"
                        />
                        <span className="ml-3 block text-base font-medium text-gray-900">
                          CAD
                        </span>
                        <span className="sr-only">, change currency</span>
                      </a>
                    </div>
                  </div>
                </Transition>
              </div>
            </Transition>
          </div>
        )}
        <header className="relative bg-black">
          <p className="flex h-10 items-center justify-center bg-pink px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
            Welcome to shopping.
          </p>
          <Navbar
            handleMenuOpen={handleMenuOpen}
            menuIsActive={menuIsActive}
            categoryData={categoryData}
            handleActiveCategory={handleActiveCategory}
          />
          {categoryIsActive ? (
            <StoreNavigation categoryItems={categoryItems} />
          ) : (
            <Landing />
          )}
        </header>
      </div>
    </>
  );
}
