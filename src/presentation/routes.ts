import { Router } from "express";
import { GraphRoutes } from "./graph/routes";
import { BandageRoutes } from "./bandage/routes";

export class AppRoutes {

  static get routes(): Router {

    const router = Router();
    
    router.use( '/api/graph', GraphRoutes.routes );

    router.use( '/api/bandage', BandageRoutes.routes );

    return router;
  }


}