import Products from "@/components/admin/Products";
import axios from "axios";
import queryString from "query-string";
import React from "react";

const getProducts = async (searchParams) => {
  const urlParams = {
    page: searchParams.page,
  };

  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `http://localhost:3000/api/products?${searchQuery}`
  );
  return data;
};

const HomePage = async ({ searchParams }) => {
  const data = await getProducts(searchParams);
  return <Products data={data} />;
};

export default HomePage;
