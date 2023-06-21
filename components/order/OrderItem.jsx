import React from "react";

const OrderItem = ({ order }) => {
  console.log(order);
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
    </article>
  );
};

export default OrderItem;
