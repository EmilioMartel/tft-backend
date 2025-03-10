import fs from 'fs';
import path from "path";
import { envs } from '../../config/envs';

export class FileService {

  private destinationPath = path.join(__dirname, "../../..");

  constructor() {
    const finalPath = path.join(this.destinationPath, envs.FILE_PATH);
    if (!fs.existsSync(finalPath)) {
      fs.promises.mkdir(finalPath, { recursive: true });
    }
  }

  async saveFile(file: Express.Multer.File): Promise<void> {
    const finalPath = path.join(this.destinationPath, envs.FILE_PATH);
    
    if (!fs.existsSync(finalPath)) {
      await fs.promises.mkdir(finalPath, { recursive: true });
    }
    
    const targetPath = path.join(finalPath, file.originalname);

    const existingFiles = await fs.promises.readdir(finalPath);
    for (const existingFile of existingFiles) {
      if (existingFile !== file.originalname) {
        const existingFilePath = path.join(finalPath, existingFile);
        const stats = await fs.promises.stat(existingFilePath);
        if (stats.isFile()) {
          await fs.promises.unlink(existingFilePath);
          console.log("🔥 Archivo eliminado:", existingFilePath);
        }
      }
    }
    
    if (file.path !== targetPath) {
      await fs.promises.rename(file.path, targetPath);
      console.log("💾 Nuevo archivo guardado:", targetPath);
    } else {
      console.log("El archivo ya se encuentra en el destino:", targetPath);
    }
  }

  readFile(filePath: string): any {
    const finalPath = path.join(this.destinationPath, filePath);
    try {
       if (!fs.existsSync(finalPath)) {
        throw new Error("La carpeta 'uploads' no existe.");
      }

      const files = fs.readdirSync(finalPath);

      if (files.length === 0) {
        throw new Error(`No hay archivos en la carpeta '${envs.FILE_PATH}'.`);
      }

      const filePath = path.join(finalPath, files[0]);

      const stats = fs.statSync(filePath);
      if (!stats.isFile()) {
        throw new Error(`La ruta proporcionada no es un archivo válido: ${filePath}`);
      }

      const rawData = fs.readFileSync(filePath, "utf-8");

      if (!rawData) {
        throw new Error("El archivo está vacío.");
      }

      try {
        return JSON.parse(rawData);
      } catch (jsonError) {
        throw new Error("Error al parsear el archivo JSON.");
      }
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      throw new Error("No se pudo leer el archivo.");
    }
  }
}
