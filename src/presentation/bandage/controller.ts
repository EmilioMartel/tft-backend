import { Request, Response } from "express";
import { envs } from "../../config/envs";

export class BandageController {
  private readonly apiUrl: string = `${envs.HOST_NAME}:${envs.PORT}/api/bandage`;
  public getInfo = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await fetch(`${this.apiUrl}/info`);
      const data = await response.json();
      const parsed = this.parseOutputPreservingUnits(data.stdout);
      res.status(200).json(parsed);
    } catch (error) {
      console.error("Error fetching Bandage info:", error);
      res.status(500).json({ message: "Error retrieving Bandage info" });
    }
  };

  public getLayout = async (req: Request, res: Response): Promise<void> => {
    try {
      const url = `${this.apiUrl}/layout`;
      const response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching Bandage info:", error);
      res.status(500).json({ message: "Error retrieving Bandage info" });
    }
  };

  private parseOutputPreservingUnits(text: string): Record<string, string | number> {
    const result: Record<string, string | number> = {};

    const regex = /(.+?):\s*([^\s]+)/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      const rawKey = match[1].trim();
      const rawValue = match[2].trim();

      if (rawValue.endsWith("%")) {
        result[rawKey] = rawValue;
      } else {
        const num = parseFloat(rawValue);
        result[rawKey] = isNaN(num) ? rawValue : num;
      }
    }

    return result;
  }
}
