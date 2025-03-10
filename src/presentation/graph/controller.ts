import { Request, Response } from "express";
import { GetNodesUseCase } from "../../application/use-cases";
import { FileService } from "../../infrastructure/services";
import { UploadFileUseCase } from "../../application/use-cases/graph/upload-file-use-case";

export class GraphController {
  private getNodesUseCase: GetNodesUseCase;
  private uploadFileUseCase: UploadFileUseCase;
  
  constructor() {
    const fileService = new FileService();
    this.getNodesUseCase = new GetNodesUseCase(fileService);
    this.uploadFileUseCase = new UploadFileUseCase(fileService);
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

  public uploadFile = async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
      res.status(400).json({ error: "No se ha subido ningún archivo." });
      return;
    }

    try {
      await this.uploadFileUseCase.execute(req.file);
      
      console.log("📁 Archivo recibido:", req.file);
      res.status(200).json({ message: "Archivo subido correctamente." });
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      res.status(500).json({ error: "Error al subir el archivo." });
    }
  };
}
