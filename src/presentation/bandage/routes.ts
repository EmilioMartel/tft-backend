import { Router } from "express";
import { BandageController } from "./controller";


export class BandageRoutes {
  static get routes(): Router {
    const router = Router();
    const bandageController = new BandageController();

    router.get('/', bandageController.getInfo);
    router.get('/layout', bandageController.getLayout);

    return router;
  }
}
