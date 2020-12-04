import { Passport } from '../part-1/lib';
const eyecolors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

export function isPassportValid(passport: Partial<Passport>): boolean {
  //byr
  if (!isValidYear(passport.byr, 1920, 2002)) {
    return false;
  }

  //iyr
  if (!isValidYear(passport.iyr, 2010, 2020)) {
    return false;
  }

  //eyr
  if (!isValidYear(passport.eyr, 2020, 2030)) {
    return false;
  }

  //hgt
  if (!passport.hgt) {
    return false;
  }

  const hgt = Number(passport.hgt.substr(0, passport.hgt.length - 2));
  if (passport.hgt.endsWith('cm')) {
    if (hgt < 150 || hgt > 193) {
      return false;
    }
  } else if (passport.hgt.endsWith('in')) {
    if (hgt < 59 || hgt > 76) {
      return false;
    }
  } else {
    return false;
  }

  //hcl
  if (!/^#[0-9a-f]{6}$/.test(passport.hcl)) {
    return false;
  }

  //ecl
  if (!eyecolors.includes(passport.ecl)) {
    return false;
  }

  //pid
  if (!/^\d{9}$/.test(passport.pid)) {
    return false;
  }

  //cid
  // ignored

  return true;
}

function isValidYear(year: string, min: number, max: number): boolean {
  if (!year || year.length !== 4) {
    return false;
  }

  const byr = Number(year);
  if (byr < min || byr > max) {
    return false;
  }

  return true;
}
