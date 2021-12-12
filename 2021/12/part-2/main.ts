import * as fs from 'fs';
import * as path from 'path';
import { parseIntoGraph } from '../part-1/lib';
import { findAllPaths } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const start = parseIntoGraph(input);
const paths = findAllPaths(start);

console.log(`Number of paths is ${paths.length}`);
