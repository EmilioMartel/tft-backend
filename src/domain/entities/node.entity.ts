export class NodeEntity {
  constructor(
    public readonly id: string,
    public readonly x: number,
    public readonly y: number,
    public readonly points: [number, number][]
  ) {}
}
