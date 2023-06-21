"use client";

import OrderContext from "@/context/OrderContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateOrder = ({ order }) => {
  const { updateOrder, updated, setUpdated, error, clearErrors } =
    useContext(OrderContext);

  const [orderStatus, setOrderStatus] = useState(order?.orderStatus);

  useEffect(() => {
    if (updated) {
      setUpdated(false);
      toast.success("Order updated");
    }
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, updated]);

  const submitHandler = () => {
    const orderData = { orderStatus };

    updateOrder(order?._id, orderData);
  };

  return (
    <article className="p-3 lg:p-5 mb-5 bg-white border border-blue-600 rounded-md">
      <header className="lg:flex justify-between mb-4">
        <div className="mb-4 lg:mb-0">
          <p className="font-semibold">
            <span>Order ID: {order._id} </span>
            {order?.orderStatus == "ON-PROCESS" ? (
              <span className="text-red-500">
                • {order?.orderStatus.toUpperCase()}
              </span>
            ) : (
              <span className="text-green-500">
                • {order?.orderStatus.toUpperCase()}
              </span>
            )}
          </p>
          <p className="text-gray-500">
            {new Date(order?.createdAt).toLocaleString("en-US", {
              hour12: true,
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
          </p>
        </div>
      </header>
      <div className="grid md:grid-cols-3 gap-2">
        <div>
          <p className="text-gray-500 mb-1">Person</p>
          <ul className="text-gray-700">
            <li>{order?.user?.name}</li>
            <li>Phone : (+62){order?.shippingInfo?.phoneNumber}</li>
            <li>Email : {order?.user?.email}</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-500 mb-1">Delivery address</p>
          <ul className="text-gray-700">
            <li>{order?.shippingInfo?.street}</li>
            <li>
              {order?.shippingInfo?.city}, {order?.shippingInfo?.state},{" "}
              {order?.shippingInfo?.postCode}
            </li>
            <li>{order?.shippingInfo?.country}</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-500 mb-1">Payment</p>
          <ul className="text-gray-700">
            <li className="text-green-400 font-semibold">
              {order?.paymentInfo?.status?.toUpperCase()}
            </li>
            <li>
              Shipping :{" "}
              {new Intl.NumberFormat("ID", {
                style: "currency",
                currency: "IDR",
                // maximumSignificantDigits: 3,
              }).format(order?.paymentInfo?.shippingPaid.toFixed(2))}
            </li>
            <li>
              Total paid :{" "}
              {new Intl.NumberFormat("ID", {
                style: "currency",
                currency: "IDR",
                // maximumSignificantDigits: 3,
              }).format(order?.paymentInfo?.amountPaid?.toFixed(2))}
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-4" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {order?.orderItems?.map((item) => (
          <figure className="flex flex-row mb-4" key={item._id}>
            <div>
              <div className="block w-20 h-20 rounded border border-gray-200 overflow-hidden p-1">
                <img
                  src={item?.image}
                  className="w-full h-full object-cover"
                  alt="Title"
                />
              </div>
            </div>
            <figcaption className="ml-3">
              <p>{item?.name.substring(0, 35)}</p>
              <p className="mt-1 font-semibold">
                {item?.quantity}x ={" "}
                {new Intl.NumberFormat("ID", {
                  style: "currency",
                  currency: "IDR",
                  // maximumSignificantDigits: 3,
                }).format(item?.price * item?.quantity)}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <hr />

      <div className="my-8">
        <label className="block mb-3"> Update Order Status </label>
        <div className="relative">
          <select
            className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            name="category"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            required
          >
            {[
              "ON-PROCESS",
              "RECEIVED AT SORTING CENTER",
              "WITH DELIVERY COURIER",
              "PROCESSED AT SORTING CENTER",
              `DELIVERED`,
            ].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <i className="absolute inset-y-0 right-0 p-2 text-gray-400">
            <svg
              width="22"
              height="22"
              className="fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M7 10l5 5 5-5H7z"></path>
            </svg>
          </i>
        </div>
      </div>

      <button
        onClick={() => submitHandler()}
        type="submit"
        className="mb-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
      >
        Update Order
      </button>
    </article>
  );
};

export default UpdateOrder;
