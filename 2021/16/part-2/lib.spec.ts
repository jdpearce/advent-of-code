import { readPacket, toBinaryFromHex } from '../part-1/lib';
import { getPacketValue } from './lib';

describe('2021-12-16.2', () => {
  [
    [`C200B40A82`, 3],
    [`04005AC33890`, 54],
    [`880086C3E88112`, 7],
    [`CE00C43D881120`, 9],
    [`D8005AC2A8F0`, 1],
    [`F600BC2D8F`, 0],
    ['9C005AC2F8F0', 0],
    ['9C0141080250320F1802104A08', 1],
  ].forEach(([input, sum]) => {
    it('should parse the packet and find the value', () => {
      const binary = toBinaryFromHex(input as string);
      const [packet] = readPacket(binary, 0);
      expect(getPacketValue(packet)).toBe(sum);
    });
  });
});
