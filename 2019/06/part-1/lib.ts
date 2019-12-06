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

export function countOrbits(map: OrbitMap): number {
  let count = 0;
  for (const body of Object.keys(map)) {
    let current = body;
    while (current != 'COM') {
      count++;
      current = map[current];
    }
  }
  return count;
}
