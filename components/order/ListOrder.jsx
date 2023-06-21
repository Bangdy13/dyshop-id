"use client";

import React, { useContext, useEffect } from "react";
import OrderItem from "./OrderItem";
import CustomPagination from "../layouts/Pagination";
import CartContext from "@/context/CartContext";
import { useRouter, useSearchParams } from "next/navigation";

const ListOrder = ({ orders }) => {
  const { clearCartItem } = useContext(CartContext);

  const params = useSearchParams();
  const router = useRouter();

  const orderSuccess = params.get("order_success");

  useEffect(() => {
    if (orderSuccess === "true") {
      clearCartItem();
      router.replace("/me/orders");
    }
  }, []);
  return (
    <>
      <h3 className="text-xl font-semibold mb-5">Your Orders</h3>
      {orders?.orders?.map((order) => (
        <OrderItem order={order} key={order.id} />
      ))}

      <CustomPagination
        resPerPage={orders?.resPerPage}
        productsCount={orders?.ordersCount}
      />
    </>
  );
};

export default ListOrder;
