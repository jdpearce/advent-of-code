import * as fs from 'fs';
import * as path from 'path';
import { OpCode, ProgramState } from './intcode-computer';
import { Joystick, Screen } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const program = input
  .split('\n')[0]
  .split(',')
  .map(Number);

program[0] = 2; // FREE PLAY!
const screen = new Screen();

const state = new ProgramState(program);
while (state.hasNotHalted) {
  if (state.output.length === 3) {
    const [x, y, tileOrScore] = state.output;

    if (x === -1 && y === 0) {
      screen.score = tileOrScore;
    } else {
      screen.updateTile(x, y, tileOrScore);
    }

    state.output = [];
  }

  if (state.next.opCode === OpCode.Input) {
    if (screen.ballPosition[0] < screen.paddlePosition[0]) {
      state.input.push(Joystick.Left);
    } else if (screen.ballPosition[0] > screen.paddlePosition[0]) {
      state.input.push(Joystick.Right);
    } else {
      state.input.push(Joystick.Neutral);
    }
  }

  state.tick();
}

screen.outputScreen();
console.log(screen.score);
