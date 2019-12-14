export interface Material {
  name: string;
  quantity: number;
}

export interface Recipe {
  input: Material[];
  output: Material;
}

export type RecipeBook = { [material: string]: Recipe };

/**
 *
 * @param str Some string of the form "9 DJGK"
 */
export function toMaterial(str: string): Material {
  const [quantity, name] = str.trim().split(' ');
  return { name, quantity: Number(quantity) };
}

export function parseLine(recipe: string): Recipe {
  const [i, o] = recipe.split(' => ');

  const output = toMaterial(o);
  const input = i.split(', ').map(toMaterial);

  return {
    input,
    output
  };
}

export function toRecipes(input: string): Recipe[] {
  return input
    .split('\n')
    .filter(x => x)
    .map(parseLine);
}

export function toRecipeBook(recipes: Recipe[]): RecipeBook {
  const recipeBook: RecipeBook = {};
  for (let recipe of recipes) {
    recipeBook[recipe.output.name] = recipe;
  }
  return recipeBook;
}

/**
 * Can use materials in more than one recipe...so recursive calc doesn't really work
 *
 * @param recipeBook
 */
export function getRequiredOre(
  recipeBook: RecipeBook,
  fuelAmount: number = 1
): number {
  const required: { [name: string]: number } = { FUEL: fuelAmount };

  while (Object.keys(required).some(x => required[x] > 0 && x !== 'ORE')) {
    let need: Material[] = Object.keys(required)
      .filter(x => required[x] > 0 && x !== 'ORE')
      .map(x => ({
        name: x,
        quantity: required[x]
      }));
    for (let material of need) {
      const recipe = recipeBook[material.name];
      let multiplier = 1;
      if (recipe.output.quantity < material.quantity) {
        multiplier = Math.ceil(material.quantity / recipe.output.quantity);
      }

      required[material.name] -= recipe.output.quantity * multiplier;
      for (let input of recipe.input) {
        if (!required[input.name]) {
          required[input.name] = 0;
        }
        required[input.name] += input.quantity * multiplier;
      }
    }
  }

  return required['ORE'];
}
