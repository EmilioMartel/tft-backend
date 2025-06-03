import express, { Router, Request, Response } from 'express';
import cors from "cors";

interface Options {
  port: number;
  routes: Router;
}


export class Server {

  private app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) { 
    const { port, routes } = options;
    this.port = port;
    this.routes = routes
  }

  async start() {

    this.app.use(cors({
      origin: "*",
    }));

    this.app.use( express.json() ); 
    this.app.use( express.urlencoded({ extended: true}) );

    this.app.use( this.routes );

    this.app.get("/", (_req: Request, res: Response) => {
      res.send("¡Hola desde el Backend!");
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    })
    
  }


}