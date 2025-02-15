import { Router } from "express";
import { GraphController } from "./controller";


export class GraphRoutes {

  static get routes(): Router {
    const router = Router();
    const graphController = new GraphController();

    router.get( '/', graphController.getTodos );

    return router;
  }

}