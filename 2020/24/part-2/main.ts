import * as fs from 'fs';
import * as path from 'path';
import { getInitialState, getStateAfterDays } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const state = getInitialState(input);
let next = getStateAfterDays(state, 100);

console.log(`After 100 days there will be ${next.size} black tiles`);
