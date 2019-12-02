import { readFileSync } from 'fs';
import { join } from 'path';

export const readInput = (filePath: string): number[] => {
  const file = readFileSync(filePath, { encoding: 'utf8' });
  return file.split(',').map(item => parseInt(item));
};

export const processInstruction = (
  input: number[],
  index: number,
  operate: (leftOperand: number, rightOperand: number) => number,
): void => {
  const leftOperandIndex = input[index + 1];
  const rightOperandIndex = input[index + 2];
  const result = operate(input[leftOperandIndex], input[rightOperandIndex]);
  const resultIndex = input[index + 3];
  input[resultIndex] = result;
};

export const processInput = (input: number[]): void => {
  let index = 0;
  while (index < input.length) {
    if (input[index] === 1) {
      processInstruction(input, index, (a, b) => a + b);
    } else if (input[index] === 2) {
      processInstruction(input, index, (a, b) => a * b);
    } else {
      break;
    }
    index += 4;
  }
};

export default () => {
  const input = readInput(join(__dirname, '../input.txt'));

  input[1] = 12;
  input[2] = 2;

  processInput(input);
  console.log(input[0]);
};
