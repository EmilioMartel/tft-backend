// src/infrastructure/services/file.service.ts
import fs from 'fs/promises';
import path from 'path';
import { envs } from '../../config/envs';

export class FileService {
  private baseDir: string;

  constructor() {
    // Carpeta raíz: sube un nivel y entra en envs.FILE_PATH o 'files'
    this.baseDir = path.resolve(process.cwd(), '..');
    this.ensureDir(this.baseDir);
  }

  /** Crea recursivamente un directorio si no existe */
  private async ensureDir(dir: string): Promise<void> {
    await fs.mkdir(dir, { recursive: true });
  }

  /**
   * Guarda el archivo con su nombre original. 
   * Si es .gfa → crea/usa la subcarpeta 'gfa'.
   * Elimina en paralelo cualquier otro fichero de ese mismo directorio.
   */
  public async saveFile(file: Express.Multer.File): Promise<void> {
    const ext = path.extname(file.originalname).toLowerCase();           // Ejemplo: path.extname('a.gfa') → '.gfa'
    const targetDir = ext === '.gfa'
      ? path.join(this.baseDir, 'gfa')
      : path.join(this.baseDir, envs.FILE_PATH)

    await this.ensureDir(targetDir);

    // Borrar en paralelo todo menos este fichero
    const existing = await fs.readdir(targetDir);
    await Promise.all(
      existing
        .filter(name => name !== file.originalname)
        .map(name => fs.unlink(path.join(targetDir, name)))
    );

    // Mover (rename) desde el tmp de Multer al directorio definitivo
    const targetPath = path.join(targetDir, file.originalname);
    await fs.rename(file.path, targetPath);

    console.log(`💾 Archivo guardado en: ${targetPath}`);
  }

  /**
   * Lee y parsea el primer JSON que encuentre **en baseDir** 
   * (no busca dentro de /gfa).
   */
  public async readFile(): Promise<any> {
    const layoutPath = path.join(this.baseDir, envs.FILE_PATH)
    await this.ensureDir(layoutPath);

    // Sólo JSON, ignora carpetas como 'gfa'
    const files = (await fs.readdir(layoutPath))
      .filter(f => path.extname(f).toLowerCase() === '.layout');

    if (files.length === 0) {
      throw new Error(`No hay archivos layout en '${layoutPath}'.`);
    }

    const fullPath = path.join(layoutPath, files[0]);
    const raw = await fs.readFile(fullPath, 'utf-8');

    if (!raw) {
      throw new Error(`El archivo '${files[0]}' está vacío.`);
    }

    try {
      return JSON.parse(raw);
    } catch {
      throw new Error(`Error al parsear JSON de '${files[0]}'.`);
    }
  }
}
