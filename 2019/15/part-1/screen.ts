import { MapPointType, ShipMap } from './lib';

const outputGlyphs = ['#', '.', 'O', 'X'];

export class Screen {
  private state: string[][] = [];

  constructor(shipMap: ShipMap) {
    let xMin = 0;
    let yMin = 0;
    for (const coord of Object.keys(shipMap)) {
      const point = shipMap[coord];
      if (point.x < xMin) {
        xMin = point.x;
      }
      if (point.y < yMin) {
        yMin = point.y;
      }
    }

    xMin = Math.abs(xMin);
    yMin = Math.abs(yMin);

    for (const coord of Object.keys(shipMap)) {
      const point = shipMap[coord];
      this.updateTile(point.x + xMin, point.y + yMin, point.type);
    }
  }

  updateTile(x: number, y: number, type: MapPointType) {
    if (!this.state[y]) {
      this.state[y] = [];
    }

    this.state[y][x] = outputGlyphs[type];
  }

  outputScreen() {
    const HEIGHT = this.state.length;
    const WIDTH = this.state.reduce((acc, curr) => {
      return curr.length > acc ? curr.length : acc;
    }, 0);

    console.log(`MAP HEIGHT: ${HEIGHT}, MAP WIDTH: ${WIDTH}`);
    for (let y = 0; y < this.state.length; y++) {
      if (!this.state[y]) {
        this.state[y] = [];
      }
      for (let x = 0; x < WIDTH; x++) {
        if (!this.state[y][x]) {
          this.state[y][x] = outputGlyphs[MapPointType.Wall];
        }
      }

      console.log(this.state[y].join(''));
    }
  }
}
