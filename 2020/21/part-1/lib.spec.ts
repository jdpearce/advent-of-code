import {
  arrangeAllergens,
  countSafeAppearances,
  findSafeIngredients,
  identifyAllergens,
  parseFoodList,
} from './lib';

describe('2020-12-21.1', () => {
  const input = `trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc mxmxvkd sbzzf (contains fish)
sqjhc fvjkl (contains soy)
mxmxvkd kfcds sqjhc nhms (contains dairy, fish)`;

  it('should parse the input', () => {
    const result = parseFoodList(input);
    expect(result).toEqual([
      { allergens: new Set(['dairy']), ingredients: new Set(['trh', 'fvjkl', 'sbzzf', 'mxmxvkd']) },
      { allergens: new Set(['fish']), ingredients: new Set(['sqjhc', 'mxmxvkd', 'sbzzf']) },
      { allergens: new Set(['soy']), ingredients: new Set(['sqjhc', 'fvjkl']) },
      {
        allergens: new Set(['dairy', 'fish']),
        ingredients: new Set(['mxmxvkd', 'kfcds', 'sqjhc', 'nhms']),
      },
    ]);
  });

  it('should identify the allergens', () => {
    const foods = parseFoodList(input);
    const allergens = identifyAllergens(foods);
    expect(allergens).toEqual(
      new Map([
        ['dairy', 'mxmxvkd'],
        ['soy', 'fvjkl'],
        ['fish', 'sqjhc'],
      ])
    );
  });

  it('should find safe foods', () => {
    const foods = parseFoodList(input);
    const safe = findSafeIngredients(foods);
    expect(safe.sort()).toEqual(['kfcds', 'nhms', 'sbzzf', 'trh'].sort());
  });

  it('should count safe appearances', () => {
    const foods = parseFoodList(input);
    const appearances = countSafeAppearances(foods);
    expect(appearances).toBe(5);
  });

  it('should arrange by allergen', () => {
    const foods = parseFoodList(input);
    const allergens = identifyAllergens(foods);
    const arranged = arrangeAllergens(allergens);
    expect(arranged).toEqual(['mxmxvkd', 'sqjhc', 'fvjkl']);
  });
});
