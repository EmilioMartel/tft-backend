
import { FileService } from "../../../infrastructure/services";
import { NodeEntity, LinkEntity } from "../../../domain/entities";

import path from 'path';


export interface UseCase {
  execute(): void;
}

export class GetNodesUseCase implements UseCase {
  constructor(private fileService: FileService) {
    
  }

  execute(): { nodes: NodeEntity[]; links: LinkEntity[] } {
    
    const filePath = path.join(__dirname, "../../../../files/test.layout");
    const layoutData = this.fileService.readFile(filePath);

    const { nodes, links } = this.transformJsonToGraph(layoutData);

    return { nodes, links };
  }

  private transformJsonToGraph(layoutData: any): { nodes: NodeEntity[]; links: LinkEntity[] } {
    const nodes: NodeEntity[] = [];
    const links: LinkEntity[] = [];

    Object.keys(layoutData).forEach((key) => {
      const points = layoutData[key];
      
      points.forEach(([x, y]: [number, number], pointIndex: number) => {
        const node = new NodeEntity(`${key}_${pointIndex}`, x, y);
        nodes.push(node);
      });

      for (let i = 0; i < points.length - 1; i++) {
        const link = new LinkEntity(`${key}_${i}`, `${key}_${i + 1}`);
        links.push(link);
      }
    });

    return { nodes, links };
  }
}
