// we need an operator precedence parser
// cf. https://en.wikipedia.org/wiki/Operator-precedence_parser

export function calculateProblem(problem: string): number {
  const tokens = problem.replace(' ', '').split('');
  const parsed = parseExpression(tokens);

  let values: number[] = [];
  for (const token of parsed) {
    if (/\d/.test(token)) {
      values.push(Number(token));
    } else if (token === '+') {
      values.push(values.pop() + values.pop());
    } else if (token === '*') {
      values.push(values.pop() * values.pop());
    }
  }
  return values.shift();
}

const operators = new Set(['*', '+']);

export function parseExpression(tokens: string[]): string[] {
  const out_stack = [];
  const op_stack = [];
  for (const token of tokens) {
    if (/\d/.test(token)) {
      out_stack.push(token);
      continue;
    }

    if (operators.has(token)) {
      while (op_stack.length > 0 && op_stack[0] !== '(') {
        out_stack.push(op_stack.shift());
      }
      op_stack.unshift(token);
      continue;
    }

    if (token === '(') {
      op_stack.unshift(token);
      continue;
    }

    if (token === ')') {
      while (op_stack.length > 0 && op_stack[0] !== '(') {
        out_stack.push(op_stack.shift());
      }

      if (op_stack[0] === '(') {
        op_stack.shift();
      }
      continue;
    }
  }

  out_stack.push(...op_stack);

  return out_stack;
}
