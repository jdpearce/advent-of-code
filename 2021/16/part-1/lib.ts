// packet header
// 3 bits - packet version
// 3 bits - packet type ID

// type ID 4 = NUMBER
// contains n groups 4 bits padded leading zeros
// Each group starts with another bit (so 5 bits really)
// LAST GROUP starts with a 0

// type ID !== 4 = OPERATOR
// contains one or more other packets

// FIRST BIT after header = length type ID
// ID === 0 -> next 15 bits = total length in bits of sub-packets
// ID === 1 -> next 11 bits = number of sub-packets immediately contained

export interface Packet {
  version?: number;
  typeId?: number;
  number?: number;
  lengthTypeId?: string;
  subPacketLength?: number;
  subPacketCount?: number;
  subPackets: Packet[];
}

export function sumVersions(packet: Packet): number {
  let sum = packet.version;
  for (const subpacket of packet.subPackets || []) {
    sum += sumVersions(subpacket);
  }
  return sum;
}

/**
 * Recursive function that reads packets from the input stream
 */
export function readPacket(input: string[], pointer: number): [Packet, number] {
  const packet: Packet = { subPackets: [] };
  [packet.version, pointer] = readNumber(input, pointer, 3);
  [packet.typeId, pointer] = readNumber(input, pointer, 3);

  if (packet.typeId === 4) {
    // number
    [packet.number, pointer] = readLiteral(input, pointer);
  } else {
    // operator
    packet.lengthTypeId = input[pointer++];
    if (packet.lengthTypeId === '0') {
      [packet.subPacketLength, pointer] = readNumber(input, pointer, 15);
      const mark = pointer;
      while (pointer - mark < packet.subPacketLength) {
        let subpacket: Packet;
        [subpacket, pointer] = readPacket(input, pointer);
        packet.subPackets.push(subpacket);
      }
    } else {
      [packet.subPacketCount, pointer] = readNumber(input, pointer, 11);
      while (packet.subPackets.length < packet.subPacketCount) {
        let subpacket: Packet;
        [subpacket, pointer] = readPacket(input, pointer);
        packet.subPackets.push(subpacket);
      }
    }
  }

  return [packet, pointer];
}

/**
 * Reads a number of the length given from the input and returns the new pointer
 */
export function readNumber(input: string[], pointer: number, length: number): [number, number] {
  return [toNumber(input.slice(pointer, pointer + length)), pointer + length];
}

/**
 * Reads a number in chunks of 5 bits from the input and returns the new pointer
 */
export function readLiteral(input: string[], pointer: number): [number, number] {
  let buffer: string[] = [];
  let binary: string[] = [];
  while (pointer < input.length) {
    const bit = input[pointer];
    buffer.push(bit);
    if (buffer.length === 5) {
      binary.push(...buffer.slice(1));
      if (buffer[0] === '1') {
        buffer.length = 0;
      } else {
        return [toNumber(binary), ++pointer];
      }
    }
    pointer++;
  }
  throw new Error('Error reading Number');
}

const hexMap = {
  '0': '0000',
  '1': '0001',
  '2': '0010',
  '3': '0011',
  '4': '0100',
  '5': '0101',
  '6': '0110',
  '7': '0111',
  '8': '1000',
  '9': '1001',
  A: '1010',
  B: '1011',
  C: '1100',
  D: '1101',
  E: '1110',
  F: '1111',
};

export function toBinaryFromHex(input: string): string[] {
  const letters = input.split('');
  const binary: string[] = [];
  for (const letter of letters) {
    binary.push(...hexMap[letter].split(''));
  }
  return binary;
}

export function toNumber(buffer: string[]): number {
  return parseInt(buffer.join(''), 2);
}
