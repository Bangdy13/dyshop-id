"use client";

import React, { useContext, useEffect, useRef } from "react";
import StarRatings from "react-star-ratings";
import BreadCrumbs from "../layouts/BreadCrumbs";
import CartContext from "@/context/CartContext";
import NewReviews from "../reviews/NewReviews";
import OrderContext from "@/context/OrderContext";
import Reviews from "../reviews/Reviews";
import AuthContext from "@/context/AuthContext";

const ProductDetails = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);
  const { canUserReview, canReview } = useContext(OrderContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    canUserReview(product?._id);
  }, []);

  const inStock = product.stock >= 1;

  const imgRef = useRef(null);

  const setImagePreview = (url) => {
    imgRef.current.src = url;
  };

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: `${product.name}`, url: `/product/${product._id}` },
  ];

  const addToCartHandler = () => {
    addItemToCart({
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0].url,
      stock: product.stock,
      seller: product.seller,
    });
  };
  return (
    <>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <section className="bg-white py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-5">
            <aside>
              <div className="border border-gray-200 shadow-sm p-3 text-center rounded mb-5">
                <img
                  ref={imgRef}
                  className="object-cover inline-block"
                  src={
                    product?.images[0] ? product?.images[0].url : "/default.png"
                  }
                  alt="Product title"
                  width="100%"
                  height="300"
                />
              </div>
              <div className="space-x-2 overflow-auto text-center whitespace-nowrap">
                {product?.images?.map((img) => (
                  <a
                    onClick={() => setImagePreview(img?.url)}
                    key={img?._id}
                    className="inline-block border border-gray-200 p-1 rounded-md hover:border-blue-500 cursor-pointer"
                  >
                    <img
                      className="w-14 h-14"
                      src={img?.url}
                      alt="Product title"
                      width="500"
                      height="500"
                    />
                  </a>
                ))}
              </div>
            </aside>
            <main>
              <h2 className="font-semibold text-2xl mb-4">{product?.name}</h2>

              <div className="flex flex-wrap items-center space-x-2 mb-3">
                <StarRatings
                  rating={product?.ratings}
                  starRatedColor="#ffb829"
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="2px"
                  name="rating"
                />
                <span className="text-yellow-500">{product?.ratings}</span>

                <svg
                  width="6px"
                  height="6px"
                  viewBox="0 0 6 6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="3" cy="3" r="3" fill="#DBDBDB" />
                </svg>

                <span className="text-green-500">Verified</span>
              </div>

              <p className="mb-4 font-semibold text-xl">
                {" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(product?.price.toFixed(2))}
              </p>

              <p className="mb-4 text-gray-500">{product?.description}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                <button
                  disabled={!inStock}
                  onClick={addToCartHandler}
                  className="px-4 py-2 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  <i className="fa fa-shopping-cart mr-2"></i>
                  Add to cart
                </button>
              </div>

              <ul className="mb-5">
                <li className="mb-1">
                  {" "}
                  <b className="font-medium w-36 inline-block">Stock:</b>
                  {inStock ? (
                    <span className="text-green-500">in Stock</span>
                  ) : (
                    <span className="text-gray-500">out Stock</span>
                  )}
                </li>
                <li className="mb-1">
                  {" "}
                  <b className="font-medium w-36 inline-block">Category:</b>
                  <span className="text-gray-500">{product?.category}</span>
                </li>
                <li className="mb-1">
                  {" "}
                  <b className="font-medium w-36 inline-block">Seller:</b>
                  <span className="text-gray-500">{product?.seller}</span>
                </li>
              </ul>
            </main>
          </div>
          {user?.role === "admin" ? (
            <>{canReview && <NewReviews product={product} />}</>
          ) : (
            <NewReviews product={product} />
          )}
          <hr />
          <div className="font-semibold">
            <h1 className="text-gray-500 review-title mb-6 mt-10 text-2xl">
              Other Customers Reviews
            </h1>
            <Reviews reviews={product?.reviews} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
