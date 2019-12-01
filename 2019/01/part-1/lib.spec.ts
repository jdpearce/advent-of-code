import { calcFuelRequired, calcTotalFuel } from "./lib";

describe("2019-12-01.1", () => {
  const tests = [
    [12, 2],
    [14, 2],
    [1969, 654],
    [100756, 33583]
  ];

  tests.forEach(([input, expected]) => {
    test(`for input ${input} expect ${expected}`, () => {
      expect(calcFuelRequired(input)).toEqual(expected);
    });
  });

  test("should sum the masses", () => {
    const input = [12, 14, 1969, 100756];
    const expected = 34241;
    expect(calcTotalFuel(input)).toEqual(expected);
  });
});
