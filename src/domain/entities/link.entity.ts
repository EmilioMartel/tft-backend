

export class LinkEntity {
  constructor(
    public readonly source: string, 
    public readonly target: string
  ) {
    if (source === target) {
      throw new Error("Un enlace no puede conectar un nodo consigo mismo.");
    }
  }
}