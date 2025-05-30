// src/application/use-cases/graph/parse-gfa-use-case.ts
import path from "path";
import { GfaModel, parseGfa } from "../../../infrastructure/services/gfa-parser.service";

export class ParseGfaUseCase {
  constructor() {}

  /**
   * Devuelve el modelo GFA (segments + links + paths).
   */
  async execute(): Promise<GfaModel> {
    // f íj a la ruta real de tu archivo .gfa
    return await parseGfa(path.join(process.cwd(),"..", "gfa", "test.gfa"));
  }
}
