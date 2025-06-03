// src/infrastructure/services/file.service.ts
import { promises as fs } from "fs";
import * as path from "path";
import { envs } from "../../config/envs";

export class FileService {
  private rootDir = path.resolve(process.cwd());
  private normalDir = path.resolve(this.rootDir, envs.FILE_PATH);
  private gfaDir = path.resolve(this.rootDir,  "gfa");

  constructor() {
    this.ensureDir(this.normalDir);
    this.ensureDir(this.gfaDir);
  }
 
  public async saveFile(file: Express.Multer.File): Promise<void> {
    if (!file?.originalname || !file.path) {
      throw new Error("Archivo inválido");
    }
    const targetDir = this.getTargetDir(file.originalname);
    await this.ensureDir(targetDir);
    await this.clearDirExcept(targetDir, file.originalname);

    const destPath = path.join(targetDir, file.originalname);
    if (path.resolve(file.path) !== path.resolve(destPath)) {
      await fs.rename(file.path, destPath);
    }
  }

  public async readFile(): Promise<any> {
    const layouts = (await fs.readdir(this.normalDir))
      .filter((f) => f.endsWith(".layout"));

    if (layouts.length === 0) {
      throw new Error(`No hay archivos '.layout' en ${this.normalDir}`);
    }

    const fullPath = path.join(this.normalDir, layouts[0]);
    const raw = await fs.readFile(fullPath, "utf-8");

    try {
      return JSON.parse(raw);
    } catch {
      throw new Error(`JSON inválido en '${layouts[0]}'`);
    }
  }

  private async ensureDir(dir: string): Promise<void> {
    await fs.mkdir(dir, { recursive: true });
  }

  private async clearDirExcept(dir: string, keepFilename: string): Promise<void> {
    const entries = await fs.readdir(dir);
    const toDelete = entries.filter(name => name !== keepFilename);
    await Promise.all(
      toDelete.map(name => fs.unlink(path.join(dir, name)))
    );
  }

  private getTargetDir(filename: string): string {
    const ext = path.extname(filename).toLowerCase();
    return ext === ".gfa" ? this.gfaDir : this.normalDir;
  }
}
