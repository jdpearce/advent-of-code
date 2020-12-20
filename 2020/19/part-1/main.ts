import * as fs from 'fs';
import * as path from 'path';
import { checkString, parseRules } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const [rulesInput, messagesInput] = input.split('\n\n');

const map = parseRules(rulesInput);
const messages = messagesInput.split('\n').filter((x) => x);

const sum = messages.filter((x) => checkString(map, x, [0])).length;

console.log(`Number of matching messages is ${sum}`);
