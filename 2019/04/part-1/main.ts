import { matchesCriteria } from './lib';

const start = 136760;
const end = 595730;

let matches = [];
for (let i = start; i <= end; i++) {
  if (matchesCriteria(i.toString())) {
    matches.push(i);
  }
}

console.log(
  `There are ${matches.length} different passwords that match the criteria.`
);
