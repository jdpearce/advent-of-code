export interface Node {
  name: string;
  connected: Node[];
}

export function parseIntoGraph(input: string): Node {
  const nodeSet = input
    .split('\n')
    .filter((l) => !!l)
    .map((line) => line.split('-'))
    .reduce((acc, [node1, node2]) => {
      if (!acc[node1]) {
        acc[node1] = { name: node1, connected: [] };
      }
      if (!acc[node2]) {
        acc[node2] = { name: node2, connected: [] };
      }
      acc[node1].connected.push(acc[node2]);
      acc[node2].connected.push(acc[node1]);
      return acc;
    }, {} as { [name: string]: Node });

  return nodeSet['start'];
}

export function findAllPaths(start: Node) {
  const q: Node[][] = [];
  q.push([start]);

  const paths: Node[][] = [];

  while (q.length) {
    const current = q.shift();
    const last = current[current.length - 1];
    for (const node of last.connected) {
      if (node.name === 'start') {
        continue;
      }

      if (node.name === node.name.toLowerCase()) {
        // have we been to this small cave before?
        if (current.some((x) => x.name === node.name)) {
          continue;
        }
      }

      if (node.name === 'end') {
        // add to the completed paths collection
        paths.push([...current, node]);
        continue;
      }

      // otherwise keep searching
      q.push([...current, node]);
    }
  }

  return paths;
}
