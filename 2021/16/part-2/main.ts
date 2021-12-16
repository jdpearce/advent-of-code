import * as fs from 'fs';
import * as path from 'path';
import { readPacket, toBinaryFromHex } from '../part-1/lib';
import { getPacketValue } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const binary = toBinaryFromHex(input);
const [packet] = readPacket(binary, 0);

console.log(`Packet value is ${getPacketValue(packet)}`);
