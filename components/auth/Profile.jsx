"use client";

import AuthContext from "@/context/AuthContext";
import Link from "next/link";
import React, { useContext } from "react";
import UserAddresses from "../user/UserAddresses";

const Profile = ({ addresses }) => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <figure className="flex items-start sm:items-center">
        <div className="relative">
          <img
            className="w-16 h-16 rounded-full mr-4"
            src={user?.avatar ? user?.avatar?.url : "/person.jpg"}
            alt={"user name"}
          />
        </div>
        <figcaption>
          <h5 className="font-semibold text-lg">{user?.name}</h5>
          <p>
            <b>Email:</b> {user?.email} | <b>Joined On: </b>
            {new Date(user?.createdAt).toLocaleString("en-US", {
              hour12: true,
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </figcaption>
      </figure>

      <hr className="my-4" />

      <UserAddresses addresses={addresses} />

      <Link href="/address/new">
        <button className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
          <i className="mr-1 bi bi-plus-lg"></i> Add new address
        </button>
      </Link>

      <hr className="my-4" />
    </>
  );
};

export default Profile;
