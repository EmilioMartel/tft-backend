import { Router } from "express";
import { GraphController } from "./controller";
import multer from "multer";
import path from "path";
import fs from "fs";

const BASE_FILES_DIR = path.resolve(process.cwd(), "..");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const subdir = ext === ".gfa" ? "gfa" : process.env.FILE_PATH!;
    const targetDir = path.join(BASE_FILES_DIR, subdir);

    fs.mkdir(targetDir, { recursive: true }, (err) => {
      if (err) {
        return cb(err, targetDir);
      }
      cb(null, targetDir);
    });
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

    router.get("/parsed-gfa", graphController.getParsedGfa);

    return router;
  }
}
