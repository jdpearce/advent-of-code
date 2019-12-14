import * as fs from 'fs';
import * as path from 'path';
import { getRequiredOre, toRecipeBook, toRecipes } from './lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();
const recipes = toRecipes(input);
const recipeBook = toRecipeBook(recipes);

console.log(`Required ORE = ${getRequiredOre(recipeBook)}`);
