/**
 * The formula for a straight line is y = ax + b
 *
 * a is the gradient
 * b is the y-coord of the intercept
 *
 * To determine whether a point is on the line
 * plug x into the formula and see if it works.
 *
 */

export interface Point {
  x: number;
  y: number;
}

export class StraightLine {
  public get id(): string {
    return `${this.a}:${this.b}`;
  }
  public readonly a: number;
  public readonly b: number;

  constructor(pointA: Point, pointB: Point) {
    this.a = (pointB.y - pointA.y) / (pointB.x - pointA.x);
    this.b = pointA.y - this.a * pointA.x;
  }

  isOnLine(point: Point): boolean {
    return point.y === this.a * point.x + this.b;
  }
}

export function distanceToOrigin(point: Point): number {
  return distanceBetween(point, { x: 0, y: 0 });
}

export function distanceBetween(pointA: Point, pointB: Point): number {
  return Math.sqrt(
    Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)
  );
}

// The above turned out not to be useful, but I'm leaving it here anyway

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

        if (!this.asteroids[i].angles[angle]) {
          this.asteroids[i].angles[angle] = [];
        }

        this.asteroids[i].angles[angle].push(this.asteroids[j]);
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
