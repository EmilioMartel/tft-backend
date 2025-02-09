import { Router } from "express";
import { GraphContoller } from "./controller";


export class GraphRoutes {

  static get routes(): Router {
    const router = Router();
    const graphController = new GraphContoller();

    router.get( '/', graphController.getTodos );

    

    return router;
  }

}