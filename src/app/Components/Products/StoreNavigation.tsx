import { useState } from "react";
import Image from "next/image";
import { CategoryProps } from "@/app/page";

type StoreProps = {
  categoryItems: CategoryProps[];
  handleProductClicked: (arg0: number) => void;
  handleProductClose: () => void;
};

const StoreNavigation = (props: StoreProps) => {
  const [filterOption, setFilterOption] = useState<"ascending" | "descending">(
    "ascending"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleFilterOptionChange = (option: "ascending" | "descending") => {
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
      if (filterOption === "ascending") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:x-8 ">
        <div className="flex justify-end mb-4">
          <label className="mr-2 text-black">Sort by:</label>
          <select
            value={filterOption}
            onChange={(e) =>
              handleFilterOptionChange(
                e.target.value as "ascending" | "descending"
              )
            }
            className="border border-gray-300 p-1 rounded-md text-black"
          >
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
        <div className="flex justify-end mb-4">
          <label className="mr-2 text-black">Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
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
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-10 xl:gap-y-10 xl:h-full">
          {filteredItems.map((item, index) => {
            return (
              <div
                className="group border flex flex-col text-center justify-center items-center cursor-pointer"
                key={index}
                onClick={() => {
                  props.handleProductClicked(item.id);
                }}
              >
                <div
                  className="aspect-h-1 aspect-w-1 w-fit h-full min-w-60 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
                  key={index}
                >
                  <Image
                    width={100}
                    height={100}
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover object-center group-hover:opacity-75 items-center justify-center"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700 p-1">{item.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  $ {item.price}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StoreNavigation;
