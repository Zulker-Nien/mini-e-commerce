import { CategoryProps } from "@/app/page";
import React from "react";
type ToggleProps = {
  handleMenuClose: () => void;
  categoryData: string[];
  handleActiveCategory: (arg0: string) => void;
};
const ToggleMenu = (props: ToggleProps) => {
  return (
    <div className="relative z-40 lg:hidden" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-white bg-opacity-25"></div>
      <div className="fixed inset-0 z-40 flex">
        <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
          <div className="flex px-4 pb-2 pt-5">
            <button
              onClick={() => {
                props.handleMenuClose();
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

          {props.categoryData &&
            props.categoryData.map((item, index) => {
              return (
                <div
                  className="space-y-6 border-t border-gray-200 px-4 py-6"
                  onClick={() => {
                    props.handleActiveCategory(item);
                    props.handleMenuClose();
                  }}
                  key={index}
                >
                  <div className="flow-root">
                    <div className="-m-2 block p-2 font-medium text-gray-900">
                      {item}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ToggleMenu;
