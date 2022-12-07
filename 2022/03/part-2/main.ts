import * as fs from 'fs';
import * as path from 'path';
import { getPriority } from '../part-1/lib';
import { getBadge, getSumOfPriorities } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

console.log(`Sum of the priorities is ${getSumOfPriorities(input)}`);
