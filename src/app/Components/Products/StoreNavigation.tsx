import { useState } from "react";
import Image from "next/image";
import { CategoryProps } from "@/app/page";

import { motion } from "framer-motion";
const storeAnimationVariants = {
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

type StoreProps = {
  categoryItems: CategoryProps[];
  handleProductClicked: (arg0: number) => void;
  handleProductClose: () => void;
  categoryIsActive: string;
};

const StoreNavigation = (props: StoreProps) => {
  const [triggerAnimation, setTriggerAnimation] = useState<boolean>(false);
  const [filterOption, setFilterOption] = useState<
    "Low to High" | "High to low"
  >("Low to High");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleFilterOptionChange = (option: "Low to High" | "High to low") => {
    setFilterOption(option);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const uniqueCategories = Array.from(
    new Set(props.categoryItems.map((item) => item.category))
  );

  const filteredItems = props.categoryItems
    .filter(
      (item) => selectedCategory === "" || item.category === selectedCategory
    )
    .sort((a, b) => {
      if (filterOption === "Low to High") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

  return (
    <div className="bg-white  min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:x-8 ">
        <div className="flex justify-end mb-4">
          <label className="mr-2 text-black">Sort by price:</label>
          <select
            value={filterOption}
            onChange={(e) =>
              handleFilterOptionChange(
                e.target.value as "Low to High" | "High to low"
              )
            }
            className="border border-gray-300 p-1 rounded-md text-black"
          >
            <option value="Low to High">Low to High</option>
            <option value="High to low">High to low</option>
          </select>
        </div>
        {props.categoryIsActive ? null : (
          <div className="  flex justify-end mb-4">
            <label className="mr-2 text-black">Filter by Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                handleCategoryChange(e.target.value);
                setTriggerAnimation(true);
              }}
              className="border border-gray-300 p-1 rounded-md text-black"
            >
              <option value="" className="text-black">
                All
              </option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}
        <motion.div
          variants={storeAnimationVariants}
          animate={"show"}
          initial="hide"
          className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-10 xl:gap-y-10 xl:h-full"
        >
          {filteredItems.map((item, index) => {
            return (
              <div
                className="group border max-w-full flex flex-col text-center justify-center items-center cursor-pointer"
                key={index}
                onClick={() => {
                  props.handleProductClicked(item.id);
                }}
              >
                <div className="h-full flex justify-center items-center overflow-hidden rounded-lg  ">
                  <div
                    className="w-fit p-4 h-fit flex justify-center overflow-hidden rounded-lg  "
                    key={index}
                  >
                    <Image
                      width={400}
                      height={400}
                      src={item.image}
                      alt={item.title}
                      className="w-fit flex object-cover object-center group-hover:opacity-75 items-center justify-center"
                    />
                  </div>
                </div>
                <h3 className="mt-4 text-sm text-gray-700 p-1">{item.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  $ {item.price}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default StoreNavigation;
