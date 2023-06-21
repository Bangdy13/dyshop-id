import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";
import { getUsers } from "@/backend/controllers/authControllers";

const router = createRouter();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles("admin")).get(getUsers);

export default router.handler({ onError });
