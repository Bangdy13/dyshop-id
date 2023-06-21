import dbConnect from "@/backend/config/dbConnect";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";
import { myOrders } from "@/backend/controllers/orderControllers";
import { createRouter } from "next-connect";

const router = createRouter();

dbConnect();

router.use(isAuthenticatedUser).get(myOrders);

export default router.handler({ onError });
