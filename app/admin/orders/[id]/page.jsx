import axios from "axios";
import React from "react";
import { cookies } from "next/headers";
import UpdateOrder from "@/components/admin/UpdateOrder";

const getOrder = async (id) => {
  const nextCookies = cookies();

  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  const { data } = await axios.get(
    `http://localhost:3000/api/admin/orders/${id}`,
    {
      headers: {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
      },
    }
  );

  return data;
};

const AdminOrderDetailPage = async ({ params }) => {
  const data = await getOrder(params?.id);

  return <UpdateOrder order={data?.order} />;
};

export default AdminOrderDetailPage;
