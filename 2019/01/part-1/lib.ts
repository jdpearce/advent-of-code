/**
 * Calculate the fuel required for a module
 *
 * @param mass The mass of the module
 */
export function calcFuelRequired(mass: number): number {
  return Math.floor(mass / 3) - 2;
}

/**
 * Sum the fuel required calculated from an array of masses
 *
 * @param masses An array of module masses
 */
export function calcTotalFuel(masses: number[]): number {
  return masses.reduce((total, mass) => total + calcFuelRequired(mass), 0);
}
