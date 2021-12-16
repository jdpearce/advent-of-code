import { readLiteral, readPacket, sumVersions, toBinaryFromHex } from './lib';

describe('2021-12-16.1', () => {
  [
    [`D2FE28`, 6],
    [`38006F45291200`, 9],
    [`8A004A801A8002F478`, 16],
    [`620080001611562C8802118E34`, 12],
    [`C0015000016115A2E0802F182340`, 23],
    [`A0016C880162017C3686B18A3D4780`, 31],
  ].forEach(([input, sum]) => {
    it('should parse the packet and sum versions', () => {
      const binary = toBinaryFromHex(input as string);
      const [packet] = readPacket(binary, 0);
      expect(sumVersions(packet)).toBe(sum);
    });
  });

  it('should parse hex to binary string', () => {
    expect(toBinaryFromHex('D2FE28')).toEqual('110100101111111000101000'.split(''));
  });

  it('should read a number correctly', () => {
    const input = '101111111000101000';
    const [number, pointer] = readLiteral(input.split(''), 0);
    expect(number).toBe(2021);
  });
});
