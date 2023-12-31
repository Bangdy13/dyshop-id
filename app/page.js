import ListProducts from "@/components/products/ListProducts";
import axios from "axios";
import queryString from "query-string";
import React from "react";

const getProducts = async (searchParams) => {
  const urlParams = {
    keyword: searchParams.keyword,
    page: searchParams.page,
    category: searchParams.category,
    "ratings[gte]": searchParams.ratings,
    "price[gte]": searchParams.min,
    "price[lte]": searchParams.max,
  };

  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `http://localhost:3000/api/products?${searchQuery}`
  );
  return data;
};

const HomePage = async ({ searchParams }) => {
  const productsData = await getProducts(searchParams);
  return <ListProducts data={productsData} />;
};

export default HomePage;
