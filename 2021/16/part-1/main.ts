import * as fs from 'fs';
import * as path from 'path';
import { readPacket, sumVersions, toBinaryFromHex } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const binary = toBinaryFromHex(input);
const [packet] = readPacket(binary, 0);

console.log(`Sum of all versions is ${sumVersions(packet)}`);
