export interface Food {
  ingredients: Set<string>;
  allergens: Set<string>;
}

export function parseFoodList(input: string): Food[] {
  const foods: Food[] = [];

  const lines = input.split('\n').filter((x) => x);
  for (const line of lines) {
    const [ingredientInput, allergenInput] = line.split(' (contains ');
    const allergens = new Set<string>(
      allergenInput ? allergenInput.substr(0, allergenInput.length - 1).split(', ') : []
    );
    const ingredients = new Set<string>(ingredientInput.split(' '));
    foods.push({
      ingredients,
      allergens,
    });
  }

  return foods;
}

/**
 * @param foods
 */
export function findSafeIngredients(foods: Food[]): string[] {
  const allergens = identifyAllergens(foods);

  // now we know the allergens by name
  // we just remove those from the ingredients list

  let safe: Set<string> = new Set<string>();
  let set = new Set<string>(allergens.values());
  for (const food of foods) {
    for (const ingredient of food.ingredients) {
      if (!set.has(ingredient)) {
        safe.add(ingredient);
      }
    }
  }

  return [...safe.keys()];
}

export function identifyAllergens(foods: Food[]): Map<string, string> {
  let allergens = new Map<string, Set<string>>();
  let ingredients = new Set<string>();
  for (const food of foods) {
    ingredients = new Set([...ingredients, ...food.ingredients]);

    for (const allergen of food.allergens) {
      if (allergens.has(allergen)) {
        // take the intersection
        allergens.set(
          allergen,
          new Set([...allergens.get(allergen).keys()].filter((x) => food.ingredients.has(x)))
        );
      } else {
        allergens.set(allergen, new Set(food.ingredients));
      }
    }
  }

  const numAllergens = allergens.size;
  const known = new Map<string, string>();
  while (known.size < numAllergens) {
    for (const [allergen, ingredients] of allergens.entries()) {
      const ingredient = [...ingredients][0];
      if (ingredients.size === 1 && !known.has(ingredient)) {
        known.set(allergen, ingredient);

        // remove from all others
        for (const a of allergens.values()) {
          a.delete(ingredient);
        }
      }
    }
  }

  return known;
}

export function countSafeAppearances(foods: Food[]): number {
  const safe = new Set<string>(findSafeIngredients(foods));

  const appearances = foods.reduce((acc, curr) => {
    acc += [...curr.ingredients].filter((x) => safe.has(x)).length;
    return acc;
  }, 0);

  return appearances;
}

export function arrangeAllergens(allergens: Map<string, string>): string[] {
  const keys = [...allergens.keys()];
  keys.sort();

  const canonical = [];
  keys.forEach((key) => canonical.push(allergens.get(key)));
  return canonical;
}
