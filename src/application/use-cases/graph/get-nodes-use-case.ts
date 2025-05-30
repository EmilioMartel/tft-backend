import { FileService } from "../../../infrastructure/services";
import { NodeEntity } from "../../../domain/entities";

export interface UseCase {
  execute(): Promise<{ nodes: NodeEntity[];  }>;
}

export class GetNodesUseCase implements UseCase {
  constructor(private fileService: FileService) {}

  async execute(): Promise<{ nodes: NodeEntity[] }> {
    const fileData = await this.fileService.readFile();
    return this.transformJsonToGraph(fileData);
  }

  private transformJsonToGraph(layoutData: any): { nodes: NodeEntity[] } {
    const nodes = this.createNodesFromLayout(layoutData);
    return { nodes };
  }

  private createNodesFromLayout(layoutData: any): NodeEntity[] {
    const pointGroups = Object.entries(layoutData);

    const nodesMap = new Map<string, NodeEntity>();

    pointGroups.forEach(([groupId, points]) => {
      const coordinates = points as [number, number][];
      coordinates.forEach(([x, y]) => {
        const nodeId = `${groupId.substring(0, groupId.length - 1)}`;
        const node = new NodeEntity(nodeId, x, y, coordinates);
        nodesMap.set(nodeId, node);
      });
    });

    return Array.from(nodesMap.values());
  }

}

export class InvalidCoordinateException extends Error {
  constructor(groupId: string, index: number, x: any, y: any) {
    super(`Coordenada no válida en grupo "${groupId}", índice ${index}: [${x}, ${y}]`);
    this.name = "InvalidCoordinateException";
  }
}
