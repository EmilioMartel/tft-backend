


import { Request, Response } from "express";
import { GetNodesUseCase } from "../../application/use-cases";
import { FileService } from "../../infrastructure/services";

export class GraphController {
  private getNodesUseCase: GetNodesUseCase;

  constructor() {
    const fileService = new FileService();
    this.getNodesUseCase = new GetNodesUseCase(fileService);
  }

  public getTodos = (req: Request, res: Response): void => {
    try {
      const graphData = this.getNodesUseCase.execute();
      res.json(graphData);
    } catch (error) {
      console.error("Error al obtener el grafo:", error);
      res.status(500).send("Error al obtener el grafo.");
    }
  };
}
