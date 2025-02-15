



import fs from 'fs';

export class FileService {
  readFile(filePath: string): any {
    try {
      const rawData = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(rawData);
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      throw new Error("No se pudo leer el archivo.");
    }
  }
}
