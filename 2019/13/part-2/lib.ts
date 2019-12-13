import { Tile } from '../part-1/lib';

export enum Joystick {
  Neutral = 0,
  Left = -1,
  Right = 1
}

export class Screen {
  private state: number[][] = [];
  ballPosition: [number, number];
  paddlePosition: [number, number];
  score: number;

  updateTile(x: number, y: number, tile: Tile) {
    if (!this.state[y]) {
      this.state[y] = [];
    }

    this.state[y][x] = tile;

    if (tile === Tile.Ball) {
      this.ballPosition = [x, y];
    } else if (tile === Tile.Paddle) {
      this.paddlePosition = [x, y];
    }
  }

  outputScreen() {
    const HEIGHT = this.state.length;
    const WIDTH = this.state.reduce((acc, curr) => {
      return curr.length > acc ? curr.length : acc;
    }, 0);

    console.log(HEIGHT, WIDTH);
    for (let y = 0; y < this.state.length; y++) {
      if (!this.state[y]) {
        this.state[y] = [];
      }
      for (let x = 0; x < WIDTH; x++) {
        if (!this.state[y][x]) {
          this.state[y][x] = Tile.Empty;
        }
      }

      console.log(this.state[y].join(''));
    }
  }
}
