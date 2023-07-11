import Image from "next/image";

type CategoryItems = {
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

type StoreProps = {
  categoryItems: CategoryItems[];
  handleProductClicked: (arg0: number) => void;
  handleProductClose: () => void;
};

const StoreNavigation = (props: StoreProps) => {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:x-8 ">
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-10 xl:gap-y-10 xl:h-full">
          {props.categoryItems.map((item, index) => {
            return (
              <div
                className="group border flex flex-col text-center justify-center items-center cursor-pointer"
                key={index}
                onClick={() => {
                  props.handleProductClicked(item.id);
                }}
              >
                <div
                  className=" aspect-h-1 aspect-w-1 w-fit h-full min-w-60 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 "
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
