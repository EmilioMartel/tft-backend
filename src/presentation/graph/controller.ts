import { Request, Response } from "express";
import { GetNodesUseCase } from "../../application/use-cases";
import { FileService } from "../../infrastructure/services";
import { UploadFileUseCase } from "../../application/use-cases/graph/upload-file-use-case";
import { ParseGfaUseCase } from "../../application/use-cases/graph/parse-gfa-use-case";

export class GraphController {
  private getNodesUseCase: GetNodesUseCase;
  private uploadFileUseCase: UploadFileUseCase;
  private parseGfaUseCase: ParseGfaUseCase;
  
  constructor() {
    const fileService = new FileService();
    this.getNodesUseCase = new GetNodesUseCase(fileService);
    this.uploadFileUseCase = new UploadFileUseCase(fileService);
    this.parseGfaUseCase = new ParseGfaUseCase();
  }

  public getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
      const graphData = await this.getNodesUseCase.execute();
      res.json(graphData);
    } catch (error) {
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
      res.status(200).json({ message: "Archivo subido correctamente." });
    } catch (error) {
      res.status(500).json({ error: "Error al subir el archivo." });
    }
  };

  public getParsedGfa = async (req: Request, res: Response) => {
    try {
      const model = await this.parseGfaUseCase.execute();
      res.json(model);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  };
}
