import dbConnect from "@/backend/config/dbConnect";
import onError from "@/backend/middlewares/errors";
import { webhook } from "@/backend/controllers/orderControllers";
import { createRouter } from "next-connect";

const router = createRouter();

dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

router.post(webhook);

export default router.handler({ onError });
