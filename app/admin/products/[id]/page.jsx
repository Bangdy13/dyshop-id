import UpdateProduct from "@/components/admin/UpdateProduct";
import axios from "axios";
import React from "react";

const getProduct = async (id) => {
  const { data } = await axios.get(`http://localhost:3000/api/products/${id}`);
  return data;
};

const HomePage = async ({ params }) => {
  const data = await getProduct(params.id);
  return <UpdateProduct data={data.product} />;
};

export default HomePage;
