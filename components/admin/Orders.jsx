"use client";

import React, { useContext, useEffect } from "react";
import Link from "next/link";
import CustomPagination from "../layouts/Pagination";
import OrderContext from "@/context/OrderContext";
import { toast } from "react-toastify";

const Orders = ({ orders }) => {
  const { deleteOrder, clearErrors, error } = useContext(OrderContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const deleteHandler = (id) => {
    deleteOrder(id);
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 ml-4 font-bold">
        {orders?.ordersCount} Orders
      </h1>
      <table className="w-full text-sm text-left">
        <thead className="text-l text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Amount Paid
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.orders?.map((order) => (
            <tr className="bg-white" key={order._id}>
              <td className="px-6 py-2">{order._id}</td>
              <td className="px-6 py-2">
                {new Intl.NumberFormat("ID", {
                  style: "currency",
                  currency: "IDR",
                  // maximumSignificantDigits: 3,
                }).format(order?.paymentInfo?.amountPaid.toFixed(2))}
              </td>
              <td className="px-6 py-2 font-semibold">
                {order?.orderStatus == "ON-PROCESS" ? (
                  <span className="text-red-500">
                    {order?.orderStatus.toUpperCase()}
                  </span>
                ) : (
                  <span className="text-green-500">
                    {order?.orderStatus.toUpperCase()}
                  </span>
                )}
              </td>
              <td className="px-6 py-2">
                <div>
                  <Link
                    href={`/admin/orders/${order?._id}`}
                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                  >
                    <i className="bi bi-pencil" aria-hidden="true"></i>
                  </Link>
                  <a
                    onClick={() => deleteHandler(order?._id)}
                    className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                  >
                    <i className="bi bi-trash" aria-hidden="true"></i>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-6">
        <CustomPagination
          resPerPage={orders?.resPerPage}
          productsCount={orders?.ordersCount}
        />
      </div>
    </div>
  );
};

export default Orders;
