import { gridFromInput, gridToString, nextGridState } from './lib';

describe('2021-12-11.1', () => {
  const input = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

  it('should calculate the next step', () => {
    const expected = `6594254334
3856965822
6375667284
7252447257
7468496589
5278635756
3287952832
7993992245
5957959665
6394862637`;

    const expectedGrid = gridFromInput(expected);
    const state = gridFromInput(input);
    nextGridState(state);

    expect(state).toEqual(expectedGrid);
  });

  it('should calculate the second round too', () => {
    const expected = `8807476555
5089087054
8597889608
8485769600
8700908800
6600088989
6800005943
0000007456
9000000876
8700006848`;

    const round1 = `6594254334
3856965822
6375667284
7252447257
7468496589
5278635756
3287952832
7993992245
5957959665
6394862637`;

    const state = gridFromInput(round1);
    nextGridState(state);

    expect(gridToString(state)).toEqual(expected);
  });

  it('should calculate the grid after 20 steps', () => {
    const expected = `3936556452
5686556806
4496555690
4448655580
4456865570
5680086577
7000009896
0000000344
6000000364
4600009543`;
    const state = gridFromInput(input);

    for (let i = 0; i < 20; i++) {
      nextGridState(state);
    }

    expect(gridToString(state)).toEqual(expected);
  });

  it('should calculate number of flashes after 100 steps', () => {
    const state = gridFromInput(input);

    let flashes = 0;
    for (let i = 0; i < 100; i++) {
      flashes += nextGridState(state);
    }

    expect(flashes).toEqual(1656);
  });
});
