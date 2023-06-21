"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setCartToState();
  }, []);

  const setCartToState = () => {
    setCart(
      localStorage.getItem("cart-local")
        ? JSON.parse(localStorage.getItem("cart-local"))
        : []
    );
  };

  const addItemToCart = async ({
    product,
    name,
    price,
    image,
    stock,
    seller,
    quantity = 1,
  }) => {
    const item = {
      product,
      name,
      price,
      image,
      stock,
      seller,
      quantity,
    };

    const isItemExist = cart?.cartItems?.find(
      (i) => i.product === item.product
    );

    let newCartItems;

    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i.product === isItemExist.product ? item : i
      );
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
    }

    localStorage.setItem(
      "cart-local",
      JSON.stringify({ cartItems: newCartItems })
    );
    setCartToState();
  };

  const deleteItemFromCart = (id) => {
    const newCartItems = cart.cartItems.filter((i) => i.product !== id);
    toast.success("Delete item success");

    localStorage.setItem(
      "cart-local",
      JSON.stringify({ cartItems: newCartItems })
    );
    setCartToState();
  };

  const saveCheckout = ({ amount, shipping, total }) => {
    const checkoutInfo = {
      amount,
      shipping,
      total,
    };

    const newCart = { ...cart, checkoutInfo };
    localStorage.setItem("cart-local", JSON.stringify(newCart));
    setCartToState();
    router.push("/shipping");
  };

  const clearCartItem = () => {
    localStorage.removeItem("cart-local");
    setCartToState();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        deleteItemFromCart,
        saveCheckout,
        clearCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
