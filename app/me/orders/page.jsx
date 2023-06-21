import axios from "axios";
import React from "react";
import { cookies } from "next/headers";
import ListOrder from "@/components/order/ListOrder";
import queryString from "query-string";

const getOrders = async (searchParams) => {
  const nextCookies = cookies();

  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  const urlParams = {
    page: searchParams.page || 1,
  };

  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `http://localhost:3000/api/orders/me?${searchQuery}`,
    {
      headers: {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
      },
    }
  );

  return data;
};

const MyOrderPage = async ({ searchParams }) => {
  const orders = await getOrders(searchParams);

  return <ListOrder orders={orders} />;
};

export default MyOrderPage;
