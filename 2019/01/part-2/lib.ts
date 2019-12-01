import { calcFuelRequired } from "../part-1/lib";

/**
 * Calculates the total mass of fuel required for a module
 *
 * @param mass Mass of the module
 */
export function calcFuelForModule(mass: number): number {
  let total = 0;
  let fuel = calcFuelRequired(mass);
  while (fuel > 0) {
    total += fuel;
    fuel = calcFuelRequired(fuel);
  }
  return total;
}

/**
 * Calculates the REAL amount of fuel required for an array of module masses
 * (includes fuel required for the fuel as well)
 *
 * @param masses Module masses
 */
export function calcRealTotalFuel(masses: number[]): number {
  return masses.reduce((total, mass) => total + calcFuelForModule(mass), 0);
}
