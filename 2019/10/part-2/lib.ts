export interface Point {
  x: number;
  y: number;
}

export interface Asteroid {
  location: Point;
  angles?: { [angle: string]: Asteroid[] };
}

/**
 * Parses the input and populates its
 * asteroids collection
 *
 * Brute force calculates visible map.
 */
export class AsteroidField {
  asteroids: Asteroid[] = [];

  constructor(input: string[][]) {
    this.buildAsteroidList(input);
    this.buildVisibleMaps();
  }

  getBestAsteroid(): Asteroid {
    return this.asteroids.reduce(
      (acc, curr) =>
        Object.keys(curr.angles).length > Object.keys(acc.angles).length
          ? curr
          : acc,
      this.asteroids[0]
    );
  }

  /**
   * We use a hash map (object) of angles to the other asteroids
   * Calculate the angle to each other asteroid using Math.atan2
   *
   * cf. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2
   */
  private buildVisibleMaps() {
    for (let i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].angles = {};
      for (let j = 0; j < this.asteroids.length; j++) {
        if (i === j) continue;

        const pointA = this.asteroids[i].location;
        const pointB = this.asteroids[j].location;
        const angle =
          (Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x) * 180) /
          Math.PI;

        // Need to normalise -90 to 0 and -180 -> -89 should become 270 -> 359
        const degrees = (angle + 450) % 360;

        if (!this.asteroids[i].angles[degrees]) {
          this.asteroids[i].angles[degrees] = [];
        }

        this.asteroids[i].angles[degrees].push(this.asteroids[j]);
      }
    }
  }

  private buildAsteroidList(input: string[][]) {
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] === '#') {
          this.asteroids.push({ location: { x, y } });
        }
      }
    }
  }
}
