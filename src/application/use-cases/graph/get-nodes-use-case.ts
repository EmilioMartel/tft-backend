import { FileService } from "../../../infrastructure/services";
import { NodeEntity, LinkEntity } from "../../../domain/entities";
import path from 'path';

export interface UseCase {
  execute(): { nodes: NodeEntity[]; links: LinkEntity[] };
}

export class GetNodesUseCase implements UseCase {
  constructor(private fileService: FileService) {}

  execute(): { nodes: NodeEntity[]; links: LinkEntity[] } {
    const filePath = path.join(__dirname, "../../../../files/test.layout");
    const fileData = this.fileService.readFile(filePath);

    const { nodes, links } = this.transformJsonToGraph(fileData);

    return { nodes, links };
  }

  private transformJsonToGraph(layoutData: any): { nodes: NodeEntity[]; links: LinkEntity[] } {
    const nodes = this.createNodesFromLayout(layoutData);
    const links = this.createLinksFromNodes(nodes);
    return { nodes, links };
  }

  private createNodesFromLayout(layoutData: any): NodeEntity[] {
    const pointGroups = Object.entries(layoutData);

    const nodesMap = new Map<string, NodeEntity>();

    pointGroups.forEach(([groupId, points]) => {
      const coordinates = points as [number, number][];
      coordinates.forEach(([x, y], index) => {
        this.validateCoordinate(x, y, groupId, index);
        const nodeId = `${groupId}_${index}`;
        const node = new NodeEntity(nodeId, x, y);
        nodesMap.set(nodeId, node);
      });
    });

    return Array.from(nodesMap.values());
  }

  private validateCoordinate(x: any, y: any, groupId: string, index: number): void {
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      throw new InvalidCoordinateException(groupId, index, x, y);
    }
  }

  private createLinksFromNodes(nodes: NodeEntity[]): LinkEntity[] {
    const links: LinkEntity[] = [];
    const nodesMap = new Map(nodes.map(node => [node.id, node]));

    nodes.forEach((currentNode) => {
      const nextNodeId = this.getNextNodeId(currentNode.id);
      const nextNode = nodesMap.get(nextNodeId);
      if (nextNode && this.areNodesInSameGroup(currentNode, nextNode)) {
        links.push(new LinkEntity(currentNode.id, nextNode.id));
      }
    });

    return links;
  }

  private getNextNodeId(nodeId: string): string {
    const [groupId, index] = nodeId.split('_');
    const nextIndex = Number(index) + 1;
    return `${groupId}_${nextIndex}`;
  }

  private areNodesInSameGroup(nodeA: NodeEntity, nodeB: NodeEntity): boolean {
    const groupA = this.extractGroupFromNodeId(nodeA.id);
    const groupB = this.extractGroupFromNodeId(nodeB.id);
    return groupA === groupB;
  }

  private extractGroupFromNodeId(nodeId: string): string {
    return nodeId.split('_')[0];
  }
}

export class InvalidCoordinateException extends Error {
  constructor(groupId: string, index: number, x: any, y: any) {
    super(`Coordenada no válida en grupo "${groupId}", índice ${index}: [${x}, ${y}]`);
    this.name = "InvalidCoordinateException";
  }
}
