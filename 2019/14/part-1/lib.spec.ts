import {
  getRequiredOre,
  parseLine,
  toMaterial,
  toRecipeBook,
  toRecipes
} from './lib';

describe('space stoichiometry', () => {
  test('toMaterial', () => {
    const input = '5 TWNV';
    expect(toMaterial(input)).toEqual({
      name: 'TWNV',
      quantity: 5
    });
  });

  test('parseInput', () => {
    const input = '9 GJSNW, 9 GHJHK => 6 DRKW';
    expect(parseLine(input)).toEqual({
      input: [
        {
          name: 'GJSNW',
          quantity: 9
        },
        {
          name: 'GHJHK',
          quantity: 9
        }
      ],
      output: {
        name: 'DRKW',
        quantity: 6
      }
    });
  });

  test('getRequiredOre', () => {
    const input = `12 WIBBLE => 1 FUEL
    2 BLIMB => 1 WIBBLE
    200 ORE => 6 BLIMB`;
    const recipes = toRecipes(input);
    const recipeBook = toRecipeBook(recipes);
    expect(getRequiredOre(recipeBook)).toEqual(800);
  });

  test('getRequiredOre more multiplier test', () => {
    const input = `12 WIBBLE, 6 BLIMB => 1 FUEL
    2 ORE => 1 WIBBLE
    200 ORE => 6 BLIMB`;
    const recipes = toRecipes(input);
    const recipeBook = toRecipeBook(recipes);
    expect(getRequiredOre(recipeBook)).toEqual(224);
  });

  test('small example', () => {
    const input = `9 ORE => 2 A
    8 ORE => 3 B
    7 ORE => 5 C
    3 A, 4 B => 1 AB
    5 B, 7 C => 1 BC
    4 C, 1 A => 1 CA
    2 AB, 3 BC, 4 CA => 1 FUEL`;
    const recipes = toRecipes(input);
    const recipeBook = toRecipeBook(recipes);
    expect(getRequiredOre(recipeBook)).toEqual(165);
  });

  test('first example', () => {
    const input = `157 ORE => 5 NZVS
    165 ORE => 6 DCFZ
    44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
    12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
    179 ORE => 7 PSHF
    177 ORE => 5 HKGWZ
    7 DCFZ, 7 PSHF => 2 XJWVT
    165 ORE => 2 GPVTF
    3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`;
    const recipes = toRecipes(input);
    const recipeBook = toRecipeBook(recipes);
    expect(getRequiredOre(recipeBook)).toEqual(13312);
  });

  test('first example', () => {
    const input = `171 ORE => 8 CNZTR
    7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL
    114 ORE => 4 BHXH
    14 VRPVC => 6 BMBT
    6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL
    6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT
    15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW
    13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW
    5 BMBT => 4 WPTQ
    189 ORE => 9 KTJDG
    1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP
    12 VRPVC, 27 CNZTR => 2 XDBXC
    15 KTJDG, 12 BHXH => 5 XCVML
    3 BHXH, 2 VRPVC => 7 MZWV
    121 ORE => 7 VRPVC
    7 XCVML => 6 RJRHP
    5 BHXH, 4 VRPVC => 5 LTCX`;
    const recipes = toRecipes(input);
    const recipeBook = toRecipeBook(recipes);
    expect(getRequiredOre(recipeBook)).toEqual(2210736);
  });
});
