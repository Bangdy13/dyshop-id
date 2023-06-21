import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import onError from "@/backend/middlewares/errors";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import upload from "@/backend/utils/multer";
import { uploadProductImage } from "@/backend/controllers/productControllers";

const router = createRouter();

dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = upload.array("image");

router
  .use(uploadMiddleware, isAuthenticatedUser, authorizeRoles("admin"))
  .post(uploadProductImage);

export default router.handler({ onError });
