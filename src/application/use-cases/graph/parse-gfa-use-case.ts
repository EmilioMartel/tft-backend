// src/application/use-cases/graph/parse-gfa-use-case.ts
import path from "path";
import fs from "fs/promises";
import { GfaModel, parseGfa } from "../../../infrastructure/services/gfa-parser.service";

export class ParseGfaUseCase {
  constructor(
    private readonly gfaDir = path.resolve(process.cwd(),"..", "gfa")
  ) {}

  /**
   * Lee el único fichero .gfa en gfaDir y lo parsea.
   */
  async execute(): Promise<GfaModel> {
    const entries = await fs.readdir(this.gfaDir);
    if (entries.length === 0) {
      throw new Error(`No se encontró ningún archivo en ${this.gfaDir}`);
    }

    const [gfaFile] = entries;
    const fullPath = path.join(this.gfaDir, gfaFile);
    return await parseGfa(fullPath);
  }
}
