import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import onError from "@/backend/middlewares/errors";
import {
  deleteProduct,
  updateProduct,
} from "@/backend/controllers/productControllers";

const router = createRouter();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles("admin")).put(updateProduct);
router.use(isAuthenticatedUser, authorizeRoles("admin")).delete(deleteProduct);

export default router.handler({ onError });
