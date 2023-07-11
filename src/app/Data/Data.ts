import React, { useEffect, useState } from "react";

export const CategoryData = () => {
  const [categoryData, setCategoryData] = useState([null]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategoryData(data);
        setLoading(false);
      });
  }, []);
  return categoryData;
};
