import dbConnect from "@/backend/config/dbConnect";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";
import { checkoutSession } from "@/backend/controllers/orderControllers";
import { createRouter } from "next-connect";

const router = createRouter();

dbConnect();

router.use(isAuthenticatedUser).post(checkoutSession);

export default router.handler({ onError });
