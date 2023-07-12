import React, { useEffect, useMemo, useState } from "react";
import StoreNavigation from "../Products/StoreNavigation";
import ScrollLink from "./ScrollLink";
import { CategoryProps } from "@/app/page";
import { motion } from "framer-motion";

type LandingProps = {
  handleProductClicked: (arg0: number) => void;
  handleProductClose: () => void;
  categoryIsActive: string;
};
const productAnimationVariants = {
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 0.3,
    },
  },
  hide: {
    y: -20,
    opacity: 0.3,
    transition: {
      ease: "easeIn",
      duration: 0.1,
    },
  },
};
const Landing = (props: LandingProps) => {
  // const [productItems, setProductItems] = useState<ProductProps[]>([]);
  const [productData, setProductData] = useState<CategoryProps[]>([]);
  const getAllProducts = useMemo(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProductData(data);
      });
  }, []);

  useEffect(() => {
    getAllProducts;
  }, [getAllProducts]);
  return (
    <motion.div
      className="relative isolate px-6 pt-14 lg:px-8"
      variants={productAnimationVariants}
      animate={"show"}
      initial="hide"
    >
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 h-[90vh]">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-white-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Buy your favourite products online.
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white-900 sm:text-6xl">
            Shop the recession away.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Click the button below to get started.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <ScrollLink href="#allProducts">
              <button className="rounded-md bg-pink-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Get started
              </button>
            </ScrollLink>
          </div>
        </div>
      </div>

      <div id="allProducts">
        <StoreNavigation
          categoryItems={productData}
          handleProductClicked={props.handleProductClicked}
          handleProductClose={props.handleProductClose}
          categoryIsActive={props.categoryIsActive}
        />
      </div>
    </motion.div>
  );
};

export default Landing;
