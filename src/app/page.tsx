"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Transition } from "@headlessui/react";
import StoreNavigation from "./Components/Products/StoreNavigation";
import Landing from "./Components/Header/Landing";
import Product from "./Components/Products/Product";

export type CategoryProps = {
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
  quantity: number;
  totalPrice: number;
};

export default function Home() {
  const [menuIsActive, setMenuIsActive] = useState<boolean>(false);

  const [categoryIsActive, setCategoryIsActive] = useState<string>("");
  const [categoryData, setCategoryData] = useState<string[]>([]);
  const [categoryItems, setCategoryItems] = useState<CategoryProps[]>([]);

  const [productIsActive, setProductIsActive] = useState<boolean>(false);
  const [productData, setProductData] = useState<number>();
  const [productItems, setProductItems] = useState<CategoryProps | null>(null);

  // const [cartData, setCartData] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CategoryProps[]>([]);

  const handleMenuOpen = () => {
    setMenuIsActive(true);
  };

  const handleMenuClose = () => {
    setMenuIsActive(false);
  };

  const handleActiveCategory = (item: string) => {
    setCategoryIsActive(item);
  };

  const handleProductClicked = (item: number) => {
    setProductData(item);
    setProductIsActive(true);
  };

  const handleProductClose = () => {
    setProductIsActive(false);
  };

  const handleCartItem = (item: CategoryProps) => {
    if (Array.isArray(cartItems)) {
      const existingItem = cartItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        const updatedItems = cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
                totalPrice: cartItem.totalPrice + cartItem.price,
              }
            : cartItem
        );
        setCartItems(updatedItems);
        console.log(cartItems);
      } else {
        setCartItems((prevItems: any) => [
          ...prevItems,
          { ...item, quantity: 1, totalPrice: item.price },
        ]);
      }
    }
  };

  const handleRemoveCartItem = (itemId: number) => {
    if (Array.isArray(cartItems)) {
      const updatedItems: CategoryProps[] = cartItems
        .map((item: CategoryProps) => {
          if (item.id === itemId) {
            const updatedQuantity = item.quantity - 1;
            const updatedTotalPrice = item.totalPrice - item.price;

            if (updatedQuantity === 0) {
              return null;
            }

            return {
              ...item,
              quantity: updatedQuantity,
              totalPrice: updatedTotalPrice,
            };
          }
          return item;
        })
        .filter((item) => item !== null) as CategoryProps[];

      setCartItems(updatedItems);
    }
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        return res.json();
      })
      .then((data) => {
        setCategoryData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (categoryIsActive) {
      fetch(`https://fakestoreapi.com/products/category/${categoryIsActive}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch category items");
          }
          return res.json();
        })
        .then((data) => {
          setCategoryItems(data);
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [categoryIsActive]);

  useEffect(() => {
    if (productData) {
      fetch(`https://fakestoreapi.com/products/${productData}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch product");
          }
          return res.json();
        })
        .then((data) => {
          setProductItems(data);
          setProductIsActive(true);
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [productData]);

  return (
    <>
      <div className="bg-black">
        <header className="relative bg-black">
          <p className="flex h-10 items-center justify-center bg-pink px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
            Welcome to shopping.
          </p>
          <Navbar
            handleMenuOpen={handleMenuOpen}
            menuIsActive={menuIsActive}
            categoryData={categoryData}
            handleActiveCategory={handleActiveCategory}
            cartItems={cartItems}
            handleRemoveCartItem={handleRemoveCartItem}
          />
          {categoryIsActive ? (
            <StoreNavigation
              categoryItems={categoryItems}
              handleProductClicked={handleProductClicked}
              handleProductClose={handleProductClose}
            />
          ) : (
            <>
              <Landing
                handleProductClicked={handleProductClicked}
                handleProductClose={handleProductClose}
              />
            </>
          )}
          {productIsActive && (
            <Product
              productItems={productItems}
              handleProductClose={handleProductClose}
              handleCartItem={handleCartItem}
            />
          )}
        </header>
      </div>
    </>
  );
}
