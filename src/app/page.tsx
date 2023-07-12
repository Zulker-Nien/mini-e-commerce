"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Transition } from "@headlessui/react";
import StoreNavigation from "./Components/Products/StoreNavigation";
import Landing from "./Components/Landing/Landing";
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

  const [cartItems, setCartItems] = useState<CategoryProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
                totalPrice: +(cartItem.totalPrice + cartItem.price).toFixed(2),
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

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }, [cartItems]);

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (categoryIsActive) {
      setIsLoading(true);
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
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  }, [categoryIsActive]);

  useEffect(() => {
    if (productData) {
      setIsLoading(true);
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
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  }, [productData]);

  return (
    <>
      <div className="bg-black">
        <header className="relative bg-black">
          <Navbar
            handleMenuOpen={handleMenuOpen}
            menuIsActive={menuIsActive}
            categoryData={categoryData}
            handleActiveCategory={handleActiveCategory}
            cartItems={cartItems}
            handleRemoveCartItem={handleRemoveCartItem}
            subtotal={subtotal}
          />
          {isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <p>Loading...</p>
            </div>
          ) : categoryIsActive ? (
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
      <div className=" h-[10vh]  bg-black flex justify-center items-center">
        <h1 className="text-white">Developed by Zulker Nien</h1>
      </div>
    </>
  );
}
