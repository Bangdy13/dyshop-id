"use client";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { ProductProvider } from "@/context/ProductContext";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GlobalProvider = ({ children }) => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={true}
      />
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <ProductProvider>
              <SessionProvider>{children}</SessionProvider>
            </ProductProvider>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
};

export default GlobalProvider;
