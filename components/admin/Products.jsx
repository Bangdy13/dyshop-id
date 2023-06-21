"use client";

import Link from "next/link";
import React, { useContext, useEffect } from "react";
import CustomPagination from "../layouts/Pagination";
import ProductContext from "@/context/ProductContext";
import { toast } from "react-toastify";

const Products = ({ data }) => {
  const { deleteProduct, clearErrors, error } = useContext(ProductContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const deleteProductHandler = (id) => {
    deleteProduct(id);
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 ml-4 font-bold">
        {data?.productsCount} Products
      </h1>
      <table className="w-full text-sm text-left">
        <thead className="text-l text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Stock
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.products.map((product) => (
            <tr className="bg-white" key={product._id}>
              <td className="px-6 py-2 text-lg capitalize">{product?.name}</td>
              <td className="px-6 py-2">{product?.stock}</td>
              <td className="px-6 py-2">
                {new Intl.NumberFormat("ID", {
                  style: "currency",
                  currency: "IDR",
                  // maximumSignificantDigits: 3,
                }).format(product?.price.toFixed(2))}
              </td>
              <td className="px-6 py-2">
                <div>
                  <Link
                    href={`/admin/products/${product?._id}/upload_images`}
                    className="px-2 py-2 inline-block text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                  >
                    <i className="bi bi-images" aria-hidden="true"></i>
                  </Link>

                  <Link
                    href={`/admin/products/${product?._id}`}
                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                  >
                    <i className="bi bi-pencil" aria-hidden="true"></i>
                  </Link>
                  <a
                    onClick={() => deleteProductHandler(product?._id)}
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
          resPerPage={data?.resPerPage}
          productsCount={data?.filteredProductsCount}
        />
      </div>
    </div>
  );
};

export default Products;
