import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbConnect";
import { updateProfile } from "@/backend/controllers/authControllers";
import onError from "@/backend/middlewares/errors";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import upload from "@/backend/utils/multer";

const router = createRouter();

dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = upload.array("image");

router.use(isAuthenticatedUser, uploadMiddleware).put(updateProfile);

export default router.handler({ onError });
