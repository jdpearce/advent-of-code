interface Pair {
  left?: number | Pair;
  right?: number | Pair;
}

export function parsePairOrNumber(element: any[] | Number, parent?: Pair): Pair | number {
  if (element instanceof Array) {
    let [left, right] = element;
    let pair: Pair = {};
    pair.left = parsePairOrNumber(left, pair);
    pair.right = parsePairOrNumber(right, pair);
    return pair;
  }
  return Number(element);
}

export function printPairOrNumber(pairOrNumber: Pair | number): string {
  if (pairOrNumber instanceof Object) {
    return `[${printPairOrNumber(pairOrNumber.left)},${printPairOrNumber(pairOrNumber.right)}]`;
  }
  return pairOrNumber.toString();
}

export function addLeft(pairOrNumber: Pair | number, number: number): Pair | number {
  if (!number) {
    return pairOrNumber;
  }

  if (pairOrNumber instanceof Object) {
    return {
      left: addLeft(pairOrNumber.left, number),
      right: pairOrNumber.right,
    };
  } else {
    return pairOrNumber + number;
  }
}

export function addRight(pairOrNumber: Pair | number, number: number): Pair | number {
  if (!number) {
    return pairOrNumber;
  }

  if (pairOrNumber instanceof Object) {
    return {
      left: pairOrNumber.left,
      right: addRight(pairOrNumber.right, number),
    };
  } else {
    return pairOrNumber + number;
  }
}

export function explodePairOrNumber(
  pairOrNumber: Pair | number,
  depth: number = 0
): [boolean, number | undefined, number | undefined, Pair | number] {
  if (pairOrNumber instanceof Object) {
    if (depth === 4) {
      return [true, pairOrNumber.left as number, pairOrNumber.right as number, 0];
    }

    let [exploded, left, right, pair] = explodePairOrNumber(pairOrNumber.left, depth + 1);
    if (exploded) {
      return [
        true,
        left,
        undefined,
        {
          right: addLeft(pairOrNumber.right, right),
          left: pair,
        },
      ];
    }

    [exploded, left, right, pair] = explodePairOrNumber(pairOrNumber.right, depth + 1);
    if (exploded) {
      return [
        true,
        undefined,
        right,
        {
          left: addRight(pairOrNumber.left, left),
          right: pair,
        },
      ];
    }

    return [false, undefined, undefined, pairOrNumber];
  } else {
    return [false, undefined, undefined, pairOrNumber];
  }
}

export function splitPairOrNumber(pairOrNumber: Pair | number): [boolean, Pair | number] {
  if (pairOrNumber instanceof Object) {
    let [splitted, pair] = splitPairOrNumber(pairOrNumber.left);
    if (splitted) {
      return [
        true,
        {
          left: pair,
          right: pairOrNumber.right,
        },
      ];
    }

    [splitted, pair] = splitPairOrNumber(pairOrNumber.right);
    if (splitted) {
      return [
        true,
        {
          left: pairOrNumber.left,
          right: pair,
        },
      ];
    }

    return [false, pairOrNumber];
  } else {
    if (pairOrNumber >= 10) {
      return [
        true,
        {
          left: Math.floor(pairOrNumber / 2),
          right: Math.ceil(pairOrNumber / 2),
        },
      ];
    } else {
      return [false, pairOrNumber];
    }
  }
}

export function reduceSnailNumber(pairOrNumber: Pair | number): Pair | number {
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

export function addSnailNumbers(input: string): Pair | number {
  const snailNumbers = input
    .split('\n')
    .filter((l) => !!l)
    .map((line) => parsePairOrNumber(JSON.parse(line)));

  let result: Pair | number = snailNumbers[0];
  for (let i = 1; i < snailNumbers.length; i++) {
    result = reduceSnailNumber({ left: result, right: snailNumbers[i] });
  }

  return result;
}

export function magnitude(pairOrNumber: Pair | number): number {
  if (pairOrNumber instanceof Object) {
    return 3 * magnitude(pairOrNumber.left) + 2 * magnitude(pairOrNumber.right);
  } else {
    return pairOrNumber;
  }
}
