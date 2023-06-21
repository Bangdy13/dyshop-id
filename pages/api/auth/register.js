import dbConnect from "@/backend/config/dbConnect";
import onError from "@/backend/middlewares/errors";
import { createRouter } from "next-connect";
import { registerUser } from "@/backend/controllers/authControllers";

const router = createRouter();

dbConnect();

router.post(registerUser);

export default router.handler({ onError });
