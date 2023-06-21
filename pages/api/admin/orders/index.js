import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";
import { getOrders } from "@/backend/controllers/orderControllers";

const router = createRouter();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles("admin")).get(getOrders);

export default router.handler({ onError });
