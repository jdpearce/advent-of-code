import * as fs from 'fs';
import * as path from 'path';
import { arrangeAllergens, identifyAllergens, parseFoodList } from '../part-1/lib';

const input = fs.readFileSync(path.join(__dirname, '../input.txt')).toString();

const foods = parseFoodList(input);
const allergens = identifyAllergens(foods);

console.log(`Canonical dangerous list is ${arrangeAllergens(allergens).join(',')}`);
