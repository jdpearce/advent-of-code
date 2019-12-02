import { runIntCode } from "../part-1/lib";

/**
 * Find the inputs that result in the output at prog[0] of 19690720
 *
 * @param program The IntCode program
 */
export function findInputs(program: number[]): number[] {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      let prog = [...program];
      prog[1] = noun;
      prog[2] = verb;
      const output = runIntCode(prog)[0];
      if (output === 19690720) {
        return [noun, verb];
      }
    }
  }
}
