import { Router } from "express";
import { GraphController } from "./controller";
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

export class GraphRoutes {
  static get routes(): Router {
    const router = Router();
    const graphController = new GraphController();

    router.get('/', graphController.getTodos);
    
    router.post("/upload", upload.single("file"), graphController.uploadFile);

    return router;
  }
}
