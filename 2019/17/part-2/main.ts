import * as fs from 'fs';
import * as path from 'path';
import { OpCode, ProgramState } from '../../13/part-2/intcode-computer';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const program = input
  .split('\n')[0]
  .split(',')
  .map(Number);

// const grid = generateGrid([...program]);
// const calculator = new PathCalculator(grid);
// calculator.draw();

// console.log(calculator.calculatePath().join());
// "L,10,R,8,R,8,L,10,R,8,R,8,L,10,L,12,R,8,R,10,R,10,L,12,R,10,L,10,L,12,R,8,R,10,R,10,L,12,R,10,L,10,L,12,R,8,R,10,R,10,L,12,R,10,R,10,L,12,R,10,L,10,R,8,R,8"

let main = 'A,A,B,C,B,C,B,C,C,A\n';
let A = 'L,10,R,8,R,8\n';
let B = 'L,10,L,12,R,8,R,10\n';
let C = 'R,10,L,12,R,10\n';

// wake up little vacuum robot!
program[0] = 2;
const state = new ProgramState(program);

let toInput = [
  ...main.split(''),
  ...A.split(''),
  ...B.split(''),
  ...C.split(''),
  'n',
  '\n'
];

state.input.push(...toInput.reverse().map(x => x.charCodeAt(0)));

do {
  if (state.next.opCode === OpCode.Input && state.input.length === 0) {
    console.log(String.fromCharCode(...state.output));
    throw new Error('Expected input but did not find any');
  }

  state.tick();
} while (state.hasNotHalted);

console.log(String.fromCharCode(...state.output));
console.log(state.output.pop());
