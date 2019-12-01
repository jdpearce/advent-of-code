import * as fs from "fs";
import * as path from "path";
import { calcRealTotalFuel } from "./lib";

const input = fs.readFileSync(path.join(__dirname, "../input.txt")).toString();
const masses = input
  .split("\n")
  .filter(x => x) // eliminate empty rows
  .map(Number);

console.log(`Total fuel required: ${calcRealTotalFuel(masses)}`);
