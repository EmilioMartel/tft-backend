import fs from "fs";
import path from 'path';

import { Request, Response } from "express";

export class GraphContoller {

  public getTodos = (req: Request, res: Response) => {

    const layoutFilePath = path.join(__dirname, "../../../files/test.layout");
    try {
      const rawData = fs.readFileSync(layoutFilePath, "utf-8");
      const layoutData = JSON.parse(rawData);
  
      const nodes: any[] = [];
      const links: any[] = [];
  
      Object.keys(layoutData).forEach((key, index) => {
        const points = layoutData[key];
  
        points.forEach(([x, y]: [number, number], pointIndex: number) => {
          nodes.push({ id: `${key}_${pointIndex}`, x, y });
        });
  
        for (let i = 0; i < points.length - 1; i++) {
          links.push({
            source: `${key}_${i}`,
            target: `${key}_${i + 1}`,
          });
        }
      });
  
      res.json({ nodes, links });
    } catch (error) {
      console.error("Error al procesar el archivo:", error);
      res.status(500).send("Error al procesar el archivo.");
    }
  };

}