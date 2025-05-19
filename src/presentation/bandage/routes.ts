import { Router } from "express";
import { BandageController } from "./controller";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

export class BandageRoutes {
  static get routes(): Router {
    const router = Router();
    const bandageController = new BandageController();

    router.get('/', bandageController.getInfo);

    return router;
  }
}
