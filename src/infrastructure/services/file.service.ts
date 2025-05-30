// src/infrastructure/services/file.service.ts
import { promises as fs } from "fs";
import * as path from "path";
import { envs } from "../../config/envs";

export class FileService {
  /** Ruta absoluta al directorio raíz del proyecto */
  private rootDir = path.resolve(process.cwd(), "..");

  /** Carpeta “normal” (no‐.gfa), e.g. '<project-root>/files' */
  private normalDir = path.resolve(this.rootDir, envs.FILE_PATH);

  /** Carpeta para .gfa, e.g. '<project-root>/gfa' */
  private gfaDir = path.resolve(this.rootDir, "gfa");

  constructor() {
    // Creamos ambas carpetas si no existen
    this.ensureDir(this.normalDir);
    this.ensureDir(this.gfaDir);
  }

  /**
   * Guarda un único archivo:
   * - Si es .gfa → en carpeta 'gfa'
   * - Si no     → en carpeta 'files' (o la que indique envs.FILE_PATH)
   *
   * Antes de mover, borra todo *menos* el archivo entrante para evitar
   * que la limpieza elimine al propio archivo.
   */
  public async saveFile(file: Express.Multer.File): Promise<void> {
    // Guard clause: validamos entrada
    if (!file?.originalname || !file.path) {
      throw new Error("Archivo inválido");
    }

    const targetDir = this.getTargetDir(file.originalname);
    console.debug(`saveFile → targetDir = ${targetDir}`);
    await this.ensureDir(targetDir);

    // Borramos todo menos el fichero que acabamos de subir
    await this.clearDirExcept(targetDir, file.originalname);

    // Movemos solo si la ruta de multer y la final difieren
    const destPath = path.join(targetDir, file.originalname);
    if (path.resolve(file.path) !== path.resolve(destPath)) {
      await fs.rename(file.path, destPath);
      console.info(`💾 Movido a: ${destPath}`);
    } else {
      console.info(`💾 Archivo ya en destino: ${destPath}`);
    }
  }

  /**
   * Lee y parsea el primer '.layout' de la carpeta normal ('files').
   */
  public async readFile(): Promise<any> {
    const layouts = (await fs.readdir(this.normalDir))
      .filter((f) => f.endsWith(".layout"));

    if (layouts.length === 0) {
      throw new Error(`No hay archivos '.layout' en ${this.normalDir}`);
    }

    const fullPath = path.join(this.normalDir, layouts[0]);
    console.debug(`Leyendo layout desde: ${fullPath}`);
    const raw = await fs.readFile(fullPath, "utf-8");

    try {
      return JSON.parse(raw);
    } catch {
      throw new Error(`JSON inválido en '${layouts[0]}'`);
    }
  }

  /** Crea recursivamente el directorio si no existe */
  private async ensureDir(dir: string): Promise<void> {
    await fs.mkdir(dir, { recursive: true });
  }

  /**
   * Borra TODO el contenido de un directorio *excepto* el fichero indicado.
   *
   * @example
   * // En '/tmp/data' borra todo menos 'keep.txt'
   * await this.clearDirExcept('/tmp/data', 'keep.txt');
   */
  private async clearDirExcept(dir: string, keepFilename: string): Promise<void> {
    const entries = await fs.readdir(dir);
    const toDelete = entries.filter(name => name !== keepFilename);
    await Promise.all(
      toDelete.map(name => fs.unlink(path.join(dir, name)))
    );
  }

  /**
   * Decide carpeta destino según extensión:
   * - '.gfa' → '<project-root>/gfa'
   * - otro    → '<project-root>/files' (o envs.FILE_PATH)
   */
  private getTargetDir(filename: string): string {
    const ext = path.extname(filename).toLowerCase();
    return ext === ".gfa" ? this.gfaDir : this.normalDir;
  }
}
