"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [updated, setUpdated] = useState(false);

  const router = useRouter();

  const newProduct = async (product) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/api/admin/products`,
        product
      );
      if (data) {
        router.replace("/admin/products");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const updateProduct = async (product, id) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/admin/products/${id}`,
        product
      );
      if (data) {
        setUpdated(true);
        router.replace(`/admin/products`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/admin/products/${id}`
      );
      if (data?.success) {
        router.replace(`/admin/products`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const postReview = async (reviewData) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/products/review`,
        reviewData
      );
      if (data?.success) {
        router.replace(`/product/${reviewData?.productId}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const uploadProductImages = async (formData, id) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `http://localhost:3000/api/admin/products/upload_images/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data?.data) {
        setLoading(false);
        router.replace("/admin/products");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <ProductContext.Provider
      value={{
        error,
        loading,
        updated,
        setUpdated,
        newProduct,
        updateProduct,
        deleteProduct,
        postReview,
        uploadProductImages,
        clearErrors,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
