import { promises as fs } from 'fs';
import * as readline from 'readline';

export type Orientation = '+' | '-';

export interface Segment {
  id: string;
  seq: string;
  length: number;
  coverage?: number;
}

export interface Link {
  from: string;
  fromOrient: Orientation;
  to: string;
  toOrient: Orientation;
  overlap: string; // p.e. "60M"
}

export interface PathEntry {
  name: string;
  nodes: { id: string; orient: Orientation }[];
}

export interface GfaModel {
  nodes: Record<string, Segment>;
  links: Link[];
  paths: PathEntry[];
}

/**
 * Parsea un fichero GFA y devuelve su modelo tipado.
 */
export async function parseGfa(filePath: string): Promise<GfaModel> {
  const fileStream = await fs.open(filePath, 'r');
  const rl = readline.createInterface({
    input: fileStream.createReadStream(),
    crlfDelay: Infinity
  });

  const nodes: Record<string, Segment> = {};
  const links: Link[] = [];
  const paths: PathEntry[] = [];

  for await (const line of rl) {
    if (!line) continue;
    const parts = line.split('\t');
    switch (parts[0]) {
      case 'S': {
        // S   1   ACGT…   LN:i:100  KC:i:50
        const [ , id, seq, ...tags ] = parts;
        const lnTag = tags.find(t => t.startsWith('LN:i:'));
        const kcTag = tags.find(t => t.startsWith('KC:i:'));
        nodes[id] = {
          id,
          seq,
          length: lnTag ? +lnTag.split(':')[2] : seq.length,
          coverage: kcTag ? +kcTag.split(':')[2] : undefined
        };
        break;
      }
      case 'L': {
        // L  2  +  1  -  60M
        const [ , from, fOri, to, tOri, overlap ] = parts;
        links.push({
          from, fromOrient: fOri as Orientation,
          to,   toOrient:   tOri as Orientation,
          overlap
        });
        break;
      }
      case 'P': {
        // P  PATH_1  7-,14+,13-  *
        const [ , name, segField ] = parts;
        const nodes = segField.split(',').map(spec => {
          const m = spec.match(/^(\d+)([+-])$/);
          if (!m) throw new Error(`P field inválido: ${spec}`);
          return { id: m[1], orient: m[2] as Orientation };
        });
        paths.push({ name, nodes: nodes });
        break;
      }
      default:
        // ignorar H, C, etc.
        break;
    }
  }

  await fileStream.close();
  return { nodes, links, paths };
}
