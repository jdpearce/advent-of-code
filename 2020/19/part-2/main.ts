import * as fs from 'fs';
import * as path from 'path';
import { checkString, parseRules } from '../part-1/lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const [rulesInput, messagesInput] = input.split('\n\n');

const map = parseRules(rulesInput);

map.set(8, [[42], [42, 8]]);
map.set(11, [
  [42, 31],
  [42, 11, 31],
]);

const messages = messagesInput.split('\n').filter((x) => x);

const sum = messages.filter((x) => checkString(map, x, [0])).length;

console.log(`Number of matching messages is ${sum}`);
