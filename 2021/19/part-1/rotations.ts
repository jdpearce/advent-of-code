/**
 * We're going to need rotation matrices to rotate
 * the cubes around until we find overlaps.
 * https://en.wikipedia.org/wiki/Rotation_matrix
 */

import { Point } from './lib';

/**
 * The 24 possible rotations in 3D
 */
export const rotationMatrices = [
  // row #1
  [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ],
  [
    [1, 0, 0],
    [0, 0, -1],
    [0, 1, 0],
  ],
  [
    [1, 0, 0],
    [0, -1, 0],
    [0, 0, -1],
  ],
  [
    [1, 0, 0],
    [0, 0, 1],
    [0, -1, 0],
  ],
  // row #2
  [
    [0, -1, 0],
    [1, 0, 0],
    [0, 0, 1],
  ],
  [
    [0, 0, 1],
    [1, 0, 0],
    [0, 1, 0],
  ],
  [
    [0, 1, 0],
    [1, 0, 0],
    [0, 0, -1],
  ],
  [
    [0, 0, -1],
    [1, 0, 0],
    [0, -1, 0],
  ],
  // row #3
  [
    [-1, 0, 0],
    [0, -1, 0],
    [0, 0, 1],
  ],
  [
    [-1, 0, 0],
    [0, 0, -1],
    [0, -1, 0],
  ],
  [
    [-1, 0, 0],
    [0, 1, 0],
    [0, 0, -1],
  ],
  [
    [-1, 0, 0],
    [0, 0, 1],
    [0, 1, 0],
  ],
  // row #4
  [
    [0, 1, 0],
    [-1, 0, 0],
    [0, 0, 1],
  ],
  [
    [0, 0, 1],
    [-1, 0, 0],
    [0, -1, 0],
  ],
  [
    [0, -1, 0],
    [-1, 0, 0],
    [0, 0, -1],
  ],
  [
    [0, 0, -1],
    [-1, 0, 0],
    [0, 1, 0],
  ],
  // row #5
  [
    [0, 0, -1],
    [0, 1, 0],
    [1, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 0, 1],
    [1, 0, 0],
  ],
  [
    [0, 0, 1],
    [0, -1, 0],
    [1, 0, 0],
  ],
  [
    [0, -1, 0],
    [0, 0, -1],
    [1, 0, 0],
  ],
  // row #6
  [
    [0, 0, -1],
    [0, -1, 0],
    [-1, 0, 0],
  ],
  [
    [0, -1, 0],
    [0, 0, 1],
    [-1, 0, 0],
  ],
  [
    [0, 0, 1],
    [0, 1, 0],
    [-1, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 0, -1],
    [-1, 0, 0],
  ],
];

export function rotate(matrix: number[][], vector: Point): Point {
  if (matrix.length !== vector.length) {
    throw new Error(
      `Cannot multiply matrix of length ${matrix.length} by vector of length ${vector.length}`
    );
  }

  let output: Point = [0, 0, 0];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      output[i] += matrix[i][j] * vector[j];
    }
  }

  return output;
}

export function* getMatrixRotations(vector: Point): Generator<Point> {
  for (const matrix of rotationMatrices) {
    yield rotate(matrix, vector);
  }
}
