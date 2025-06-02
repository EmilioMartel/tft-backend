import { NodeEntity } from "./node.entity";
import { LinkEntity } from "./link.entity";

export class GraphDataEntity {
  constructor(
    public readonly nodes: NodeEntity[],
    public readonly links: LinkEntity[]
  ) {}
}
