export type Coordinates = [number, number, number];

export interface Moon {
  position: Coordinates;
  velocity: Coordinates;
}

export function generatePairs(moonList: Moon[]): Array<[Moon, Moon]> {
  const pairs: Array<[Moon, Moon]> = [];
  for (let i = 0; i < moonList.length; i++) {
    for (let j = 0; j < moonList.length; j++) {
      if (i === j) continue;
      pairs.push([moonList[i], moonList[j]]);
    }
  }
  return pairs;
}

export function applyGravity(pairs: Array<[Moon, Moon]>) {
  for (let pair of pairs) {
    const [moonA, moonB] = pair;

    for (let i = 0; i < 3; i++) {
      if (moonB.position[i] > moonA.position[i]) {
        moonA.velocity[i] += 1;
      } else if (moonB.position[i] < moonA.position[i]) {
        moonA.velocity[i] -= 1;
      }
    }
  }
}

export function applyVelocity(moons: Moon[]) {
  for (let moon of moons) {
    for (let i = 0; i < 3; i++) {
      moon.position[i] += moon.velocity[i];
    }
  }
}

export function tick(moons: Moon[], pairs: Array<[Moon, Moon]>) {
  applyGravity(pairs);
  applyVelocity(moons);
}

export function calcPotentialEnergy(moon: Moon): number {
  return moon.position.reduce((acc, curr) => (acc += Math.abs(curr)), 0);
}

export function calcKineticEnergy(moon: Moon): number {
  return moon.velocity.reduce((acc, curr) => (acc += Math.abs(curr)), 0);
}

export function calcTotalEnergy(moonList: Moon[]): number {
  return moonList.reduce(
    (acc, curr) => (acc += calcPotentialEnergy(curr) * calcKineticEnergy(curr)),
    0
  );
}
