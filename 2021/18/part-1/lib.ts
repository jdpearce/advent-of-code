export type PairOrNumber = [PairOrNumber, PairOrNumber] | number;

export function printPairOrNumber(pairOrNumber: PairOrNumber): string {
  if (pairOrNumber instanceof Object) {
    const [left, right] = pairOrNumber;
    return `[${printPairOrNumber(left)},${printPairOrNumber(right)}]`;
  }
  return pairOrNumber.toString();
}

/**
 * Given a tree (pairOrNumber) this walks down the LEFT hand side
 * and adds toAdd to the first number it finds
 */
export function addLeft(pairOrNumber: PairOrNumber, toAdd: number): PairOrNumber {
  if (!toAdd) {
    return pairOrNumber;
  }

  if (pairOrNumber instanceof Object) {
    const [left, right] = pairOrNumber;
    return [addLeft(left, toAdd), right] as PairOrNumber;
  } else {
    return pairOrNumber + toAdd;
  }
}

/**
 * Given a tree (pairOrNumber) this walks down the RIGHT hand side
 * and adds toAdd to the first number it finds
 */
export function addRight(pairOrNumber: PairOrNumber, toAdd: number): PairOrNumber {
  if (!toAdd) {
    return pairOrNumber;
  }

  if (pairOrNumber instanceof Object) {
    const [left, right] = pairOrNumber;
    return [left, addRight(right, toAdd)] as PairOrNumber;
  } else {
    return pairOrNumber + toAdd;
  }
}

export function explodePairOrNumber(
  pairOrNumber: PairOrNumber,
  depth: number = 0
): [boolean, number | undefined, number | undefined, PairOrNumber] {
  if (pairOrNumber instanceof Object) {
    const [left, right] = pairOrNumber;
    if (depth === 4) {
      return [true, left as number, right as number, 0];
    }

    let [exploded, explodeLeft, explodeRight, pair] = explodePairOrNumber(left, depth + 1);
    if (exploded) {
      return [true, explodeLeft, undefined, [pair, addLeft(right, explodeRight)]];
    }

    [exploded, explodeLeft, explodeRight, pair] = explodePairOrNumber(right, depth + 1);
    if (exploded) {
      return [true, undefined, explodeRight, [addRight(left, explodeLeft), pair]];
    }
  }

  return [false, undefined, undefined, pairOrNumber];
}

export function splitPairOrNumber(pairOrNumber: PairOrNumber): [boolean, PairOrNumber] {
  if (pairOrNumber instanceof Object) {
    const [left, right] = pairOrNumber;

    let [splitted, pair] = splitPairOrNumber(left);
    if (splitted) {
      return [true, [pair, right]];
    }

    [splitted, pair] = splitPairOrNumber(right);
    if (splitted) {
      return [true, [left, pair]];
    }
  } else if (pairOrNumber >= 10) {
    return [true, [Math.floor(pairOrNumber / 2), Math.ceil(pairOrNumber / 2)]];
  }

  return [false, pairOrNumber];
}

export function reduceSnailNumber(pairOrNumber: PairOrNumber): PairOrNumber {
  let changes = true;
  while (changes) {
    [changes, , , pairOrNumber] = explodePairOrNumber(pairOrNumber);
    if (changes) {
      continue;
    }

    [changes, pairOrNumber] = splitPairOrNumber(pairOrNumber);
  }
  return pairOrNumber;
}

export function addSnailNumbers(input: string): PairOrNumber {
  const snailNumbers = input
    .split('\n')
    .filter((l) => !!l)
    .map((line) => JSON.parse(line));

  let result: PairOrNumber = snailNumbers[0];
  for (let i = 1; i < snailNumbers.length; i++) {
    result = reduceSnailNumber([result, snailNumbers[i]]);
  }

  return result;
}

export function magnitude(pairOrNumber: PairOrNumber): number {
  if (pairOrNumber instanceof Object) {
    const [left, right] = pairOrNumber;
    return 3 * magnitude(left) + 2 * magnitude(right);
  } else {
    return pairOrNumber;
  }
}
