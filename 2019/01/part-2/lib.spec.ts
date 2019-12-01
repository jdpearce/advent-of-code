import { calcFuelForModule, calcRealTotalFuel } from "./lib";

describe("2019-12-01.2", () => {
  const tests = [
    [12, 2],
    [14, 2],
    [1969, 966],
    [100756, 50346]
  ];

  tests.forEach(([input, expected]) => {
    test(`for input ${input} expect ${expected}`, () => {
      expect(calcFuelForModule(input)).toEqual(expected);
    });
  });

  test("should sum the masses of fuel", () => {
    const input = [12, 14, 1969, 100756];
    const expected = 51316;
    expect(calcRealTotalFuel(input)).toEqual(expected);
  });
});
