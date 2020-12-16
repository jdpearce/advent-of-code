import { getSeparateBits } from '../part-1/lib';
import { getValidTickets, identifyFields } from './lib';

describe('2020-12-16.2', () => {
  const input = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`;

  const inputWithInvalid = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;

  it('should get the valid tickets', () => {
    const bits = getSeparateBits(inputWithInvalid);

    expect(getValidTickets(bits.tickets, bits.rules)).toEqual([[7, 3, 47]]);
  });

  it('should identify the fields', () => {
    const fieldMap = identifyFields(input);
    expect(fieldMap).toEqual(
      new Map([
        ['row', 0],
        ['class', 1],
        ['seat', 2],
      ])
    );
  });
});
