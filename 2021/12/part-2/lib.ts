export interface Node {
  name: string;
  connected: Node[];
}

/**
 * In this case
 *
 * Lowercase caves can be visited up to twice, but only one of them
 */
export function findAllPaths(start: Node) {
  const q: { small: string; visits: { [cave: string]: number }; path: Node[] }[] = [];
  q.push({ small: '', visits: {}, path: [start] });

  const paths: Node[][] = [];

  while (q.length) {
    const current = q.shift();
    const last = current.path[current.path.length - 1];
    for (const node of last.connected) {
      let small = current.small;

      if (node.name === 'start') {
        continue;
      }

      if (node.name === 'end') {
        // add to the completed paths collection
        paths.push([...current.path, node]);
        continue;
      }

      if (node.name === node.name.toLowerCase()) {
        switch (current.visits[node.name] || 0) {
          case 0:
            // all is good we can add this
            break;

          case 1:
            if (current.small === '') {
              small = node.name;
            } else {
              // can't visit any other cave more than once
              continue;
            }
            break;

          case 2:
            // we can't visit more than twice
            continue;
        }
      }

      const visits = { ...current.visits };
      visits[node.name] = (visits[node.name] || 0) + 1;

      // keep searching
      q.push({ small, visits, path: [...current.path, node] });
    }
  }

  return paths;
}

export function prettyPrintPath(nodes: Node[]): string {
  return nodes.reduce((acc, curr, index) => (acc += (index > 0 ? ',' : '') + curr.name), '');
}
