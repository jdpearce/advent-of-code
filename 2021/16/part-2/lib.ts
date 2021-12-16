import { Packet } from '../part-1/lib';

export function getPacketValue(packet: Packet): number {
  switch (packet.typeId) {
    case 0:
      return packet.subPackets.reduce((acc, curr) => (acc += getPacketValue(curr)), 0);

    case 1:
      return packet.subPackets.reduce((acc, curr) => (acc *= getPacketValue(curr)), 1);

    case 2:
      return Math.min(...packet.subPackets.map((p) => getPacketValue(p)));

    case 3:
      return Math.max(...packet.subPackets.map((p) => getPacketValue(p)));

    case 4:
      return packet.number;

    case 5:
      return getPacketValue(packet.subPackets[0]) > getPacketValue(packet.subPackets[1]) ? 1 : 0;

    case 6:
      return getPacketValue(packet.subPackets[0]) < getPacketValue(packet.subPackets[1]) ? 1 : 0;

    case 7:
      return getPacketValue(packet.subPackets[0]) === getPacketValue(packet.subPackets[1]) ? 1 : 0;
  }

  throw new Error('unknown packet type');
}
