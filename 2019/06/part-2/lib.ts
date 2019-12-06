export type OrbitalBody = string;

export type OrbitMap = { [body: string]: OrbitalBody };

export function populateOrbits(orbits: string[]): OrbitMap {
  const map: OrbitMap = {};
  for (let orbit of orbits) {
    const [body1, body2] = orbit.split(')');
    map[body2] = body1;
  }
  return map;
}

/**
 * Counts the numnber of orbital transfers needed
 * to take YOU to SAN
 *
 * @param map
 */
export function countTransfers(map: OrbitMap): number {
  let youToCom: string[] = [];
  let current = 'YOU';
  while (current != 'COM') {
    current = map[current];
    youToCom.push(current);
  }
  youToCom.reverse();

  let sanToCom: string[] = [];
  current = 'SAN';
  while (current != 'COM') {
    current = map[current];
    sanToCom.push(current);
  }
  sanToCom.reverse();

  let match = 0;
  let common = 'COM';
  while (sanToCom[match] === youToCom[match]) {
    common = sanToCom[match];
    match++;
  }

  let transfers = 0;
  sanToCom.reverse();
  let currentOrbit = 0;
  while (sanToCom[currentOrbit] != common) {
    currentOrbit++;
    transfers++;
  }

  youToCom.reverse();
  currentOrbit = 0;
  while (youToCom[currentOrbit] != common) {
    currentOrbit++;
    transfers++;
  }

  return transfers;
}
