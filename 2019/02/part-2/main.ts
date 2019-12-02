import * as fs from "fs";
import * as path from "path";
import { findInputs } from "./lib";

const input = fs.readFileSync(path.join(__dirname, "../input.txt")).toString();
const program = input
  .split("\n")[0]
  .split(",")
  .map(Number);

const [noun, verb] = findInputs(program);

console.log(`Inputs are: noun=${noun}, verb=${verb}`);
console.log(`100 * noun + verb = ${100 * noun + verb}`);
