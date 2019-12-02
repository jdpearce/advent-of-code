import * as fs from "fs";
import * as path from "path";
import { runIntCode } from "./lib";

const input = fs.readFileSync(path.join(__dirname, "../input.txt")).toString();
const program = input
  .split("\n")[0]
  .split(",")
  .map(Number);

program[1] = 12;
program[2] = 2;

console.log(`Value at position 0 after running: ${runIntCode(program)[0]}`);
