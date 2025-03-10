import fs from 'fs';
import path from "path";

export class FileService {

  private uploadPath = path.join(__dirname, "../../../uploads");

  constructor() {
    this.ensureUploadPath();
  }

  private async ensureUploadPath(): Promise<void> {
    if (!fs.existsSync(this.uploadPath)) {
      fs.promises.mkdir(this.uploadPath);
    }
  }

  async saveFile(file: Express.Multer.File): Promise<void> {
    await this.ensureUploadPath();
    const filePath = path.join(this.uploadPath, file.originalname);
    await fs.promises.rename(file.path, filePath);
  }

  readFile(filePath: string) {
    try {
      const rawData = fs.readFileSync(filePath, "utf-8");
      if (!rawData) throw new Error("El archivo está vacío");
      return JSON.parse(rawData);
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      throw new Error("No se pudo leer el archivo.");
    }
  }
}
