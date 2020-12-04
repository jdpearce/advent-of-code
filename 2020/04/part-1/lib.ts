export const fields = [`byr`, `iyr`, `eyr`, `hgt`, `hcl`, `ecl`, `pid`, `cid`];
export const optional = [`cid`];

export interface Passport {
  ecl: string;
  pid: string;
  eyr: string;
  hcl: string;
  byr: string;
  iyr: string;
  cid?: string;
  hgt: string;
}

export function countValidPassports(
  input: string[],
  validator: (passport: Partial<Passport>) => boolean
): number {
  const passports: Partial<Passport>[] = getPassports(input);
  return passports.filter((p) => validator(p)).length;
}

export function getPassports(input: string[]): Partial<Passport>[] {
  const passports: Partial<Passport>[] = [];

  let currentPairs: string[] = [];
  for (const line of input) {
    if (line.length > 1) {
      currentPairs.push(...line.split(' '));
    } else if (currentPairs.length > 0) {
      passports.push(parsePassport(currentPairs));
      currentPairs = [];
    }
  }

  if (currentPairs.length > 0) {
    passports.push(parsePassport(currentPairs));
  }

  return passports;
}

export function parsePassport(pairs: string[]): Partial<Passport> {
  const passport: Partial<Passport> = {};
  for (const pair of pairs) {
    const [key, value] = pair.split(':');
    passport[key] = value;
  }
  return passport;
}

export function isPassportValid(passport: Partial<Passport>): boolean {
  for (const field of fields) {
    if (optional.includes(field)) {
      continue;
    }

    if (!passport[field]) {
      return false;
    }
  }

  return true;
}
