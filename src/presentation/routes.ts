import { Router } from "express";
import { GraphRoutes } from "./graph/routes";

export class AppRoutes {

  static get routes(): Router {

    const router = Router();
    
    router.use( '/api/graph', GraphRoutes.routes );

    return router;
  }


}