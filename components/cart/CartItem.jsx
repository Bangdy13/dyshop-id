"use client";

import CartContext from "@/context/CartContext";
import Link from "next/link";
import React, { useContext } from "react";

const CartItem = () => {
  const { addItemToCart, deleteItemFromCart, cart, saveCheckout } =
    useContext(CartContext);

  const plusQyt = (cartItem) => {
    const newQyt = cartItem.quantity + 1;
    const item = { ...cartItem, quantity: newQyt };

    if (newQyt > Number(cartItem.stock)) return;

    addItemToCart(item);
  };

  const minQyt = (cartItem) => {
    const newQyt = cartItem.quantity - 1;
    const item = { ...cartItem, quantity: newQyt };

    if (newQyt <= 0) return;

    addItemToCart(item);
  };

  const totalUnits = cart.cartItems?.reduce((a, item) => a + item.quantity, 0);
  const amountWithoutShipping = cart.cartItems?.reduce(
    (a, item) => a + item.quantity * item.price,
    0
  );
  const amountShipping = (amountWithoutShipping * 0.05).toFixed(2);
  const totalAmount = (
    Number(amountWithoutShipping) + Number(amountShipping)
  ).toFixed(2);

  const checkoutHandler = () => {
    const data = {
      amount: amountWithoutShipping,
      shipping: amountShipping,
      total: totalAmount,
    };

    saveCheckout(data);
  };

  return (
    <>
      <section className="py-5 sm:py-7 bg-blue-100">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-2">
            ({cart?.cartItems?.length || 0}) Items in Cart
          </h2>
        </div>
      </section>
      <section className="py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          {cart?.cartItems?.length === 0 ? (
            <h3 className="text-lg">
              Cart empty{" "}
              <Link href="/" className="text-blue-500">
                Go to shopping
              </Link>{" "}
            </h3>
          ) : (
            <div className="flex flex-col md:flex-row gap-4 ">
              <main className="md:w-3/4">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  {cart?.cartItems?.map((item) => (
                    <div key={item.product}>
                      <div className="flex flex-wrap lg:flex-row gap-5  mb-4">
                        <div className="w-full lg:w-2/5 xl:w-2/4">
                          <figure className="flex leading-5">
                            <div>
                              <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                                <img
                                  src={item.image}
                                  alt="Title"
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            </div>
                            <figcaption className="ml-3">
                              <p>
                                <Link
                                  href={`product/${item.product}`}
                                  className="hover:text-blue-600"
                                >
                                  {item.name}
                                </Link>
                              </p>
                              <p className="mt-1 text-gray-400">
                                {" "}
                                Seller: {item.seller}
                              </p>
                            </figcaption>
                          </figure>
                        </div>
                        <div className="w-24">
                          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                            <button
                              onClick={() => minQyt(item)}
                              data-action="decrement"
                              className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                            >
                              <span className="m-auto text-2xl font-thin">
                                −
                              </span>
                            </button>
                            <input
                              type="text"
                              className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900  outline-none custom-input-number"
                              name="custom-input-number"
                              value={item.quantity}
                              readOnly
                            ></input>
                            <button
                              onClick={() => plusQyt(item)}
                              data-action="increment"
                              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                            >
                              <span className="m-auto text-2xl font-thin">
                                +
                              </span>
                            </button>
                          </div>
                        </div>
                        <div>
                          <div className="leading-5">
                            <p className="font-semibold not-italic">
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              }).format(item.price.toFixed(2) * item.quantity)}
                            </p>
                            <small className="text-gray-400">
                              {" "}
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              }).format(item.price.toFixed(2))}{" "}
                              / per item{" "}
                            </small>
                          </div>
                        </div>
                        <div className="flex-auto">
                          <div className="float-right">
                            <a
                              onClick={() => deleteItemFromCart(item.product)}
                              className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                            >
                              Remove
                            </a>
                          </div>
                        </div>
                      </div>

                      <hr className="my-4" />
                    </div>
                  ))}
                </article>
              </main>
              <aside className="md:w-1/4">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  <ul className="mb-5">
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>Sub Total:</span>
                      <span>
                        {" "}
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(amountWithoutShipping)}
                      </span>
                    </li>
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>Total Units:</span>
                      <span className="text-green-500">
                        {totalUnits} (Units)
                      </span>
                    </li>
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>Shipping:</span>
                      <span>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(amountShipping)}
                      </span>
                    </li>
                    <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                      <span>Total price:</span>
                      <span>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(totalAmount)}
                      </span>
                    </li>
                  </ul>

                  <a
                    onClick={checkoutHandler}
                    className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer"
                  >
                    Continue
                  </a>

                  <Link
                    href="/"
                    className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
                  >
                    Back to shop
                  </Link>
                </article>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CartItem;
