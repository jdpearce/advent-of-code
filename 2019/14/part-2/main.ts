import * as fs from 'fs';
import * as path from 'path';
import { getRequiredOre, toRecipeBook, toRecipes } from '../part-1/lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const recipes = toRecipes(input);
const recipeBook = toRecipeBook(recipes);

/**
 * Use a binary search with the getRequiredOre function from part 1
 * to figure out max figure for FUEL given 1000000000000 units of ORE
 *
 * https://en.wikipedia.org/wiki/Binary_search_algorithm
 */

let lowerBound = 0;
let upperBound = 1e12;
while (lowerBound < upperBound) {
  const midPoint = Math.floor((lowerBound + upperBound + 1) / 2);
  if (getRequiredOre(recipeBook, midPoint) <= 1e12) {
    lowerBound = midPoint;
  } else {
    upperBound = midPoint - 1;
  }
}
console.log(lowerBound);
