/**
 * Part 2 is about writing a compression algorithm
 *
 * Start with calculating the path to take,
 * Then compress it somehow into instructions that
 * will fit into three movement functions of no more than 20 chars each
 *
 */

export class PathCalculator {
  private readonly faces = '^<v>';
  private x: number;
  private y: number;
  private path: string[];

  constructor(public grid: string[][]) {
    [this.x, this.y] = this.getCurrent();
  }

  getCurrent(): [number, number] {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        if (this.faces.indexOf(this.grid[y][x]) >= 0) {
          return [x, y];
        }
      }
    }

    throw new Error('No starting point found!');
  }

  private turnToGantry() {
    while (!this.canMoveForward()) {
      this.turnLeft();
      this.path.push('L');
    }
  }

  private turnLeft() {
    let faceIndex = this.faces.indexOf(this.grid[this.y][this.x]);
    faceIndex = (faceIndex + 1) % 4;
    this.grid[this.y][this.x] = this.faces[faceIndex];
  }

  private turnRight() {
    let faceIndex = this.faces.indexOf(this.grid[this.y][this.x]);
    faceIndex = (faceIndex + 3) % 4;
    this.grid[this.y][this.x] = this.faces[faceIndex];
  }

  private moveForward() {
    const face = this.grid[this.y][this.x];
    this.grid[this.y][this.x] = '#';
    switch (face) {
      case '<':
        this.x--;
        break;
      case '>':
        this.x++;
        break;
      case '^':
        this.y--;
        break;
      case 'v':
        this.y++;
        break;
    }
    this.grid[this.y][this.x] = face;
  }

  calculatePath() {
    this.path = [];

    // turn the robot to face the gantry
    this.turnToGantry();

    if (this.path.join('') === 'LLL') {
      this.path = ['R'];
    }

    // make the robot go forward until it can't
    // then turn to face the next bit of gantry
    // then repeat until it can't go forward anymore

    let done = false;
    do {
      let forward = 0;
      while (this.canMoveForward()) {
        forward++;
        this.moveForward();
      }
      this.path.push(forward.toString());

      this.turnLeft();
      if (this.canMoveForward()) {
        this.path.push('L');
      } else {
        this.turnRight();
        this.turnRight();

        if (this.canMoveForward()) {
          this.path.push('R');
        } else {
          this.turnLeft();
          done = true;
        }
      }
    } while (!done);

    this.draw();

    return this.path;
  }

  private canMoveForward(): boolean {
    const face = this.grid[this.y][this.x];
    switch (face) {
      case '<':
        return this.x !== 0 && this.grid[this.y][this.x - 1] === '#';
      case '>':
        return (
          this.x !== this.grid[this.y].length - 1 &&
          this.grid[this.y][this.x + 1] === '#'
        );
      case '^':
        return this.y !== 0 && this.grid[this.y - 1][this.x] === '#';
      case 'v':
        return (
          this.y !== this.grid.length - 1 &&
          this.grid[this.y + 1][this.x] === '#'
        );
    }
  }

  draw() {
    this.grid.forEach(x => console.log(x.join('')));
  }
}
