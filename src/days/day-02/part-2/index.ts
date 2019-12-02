import { readFileSync } from 'fs';
import { join } from 'path';

export const readInput = (filePath: string): number[] => {
  const file = readFileSync(filePath, { encoding: 'utf8' });
  return file.split(',').map(item => parseInt(item));
};

export const processItem = (input: number[], index: number, callback: (a: number, b: number) => number): number[] => {
  const addLeftIndex = input[index + 1];
  const addRightIndex = input[index + 2];
  const result = callback(input[addLeftIndex], input[addRightIndex]);
  const resultIndex = input[index + 3];
  input[resultIndex] = result;
  return input;
};

export const processInput = (input: number[]) => {
  let index = 0;
  while (index < input.length) {
    if (input[index] === 1) {
      input = processItem(input, index, (a, b) => a + b);
    } else if (input[index] === 2) {
      input = processItem(input, index, (a, b) => a * b);
    } else {
      break;
    }
    index += 4;
  }
  return input;
};

export default () => {
  const input = readInput(join(__dirname, '../input.txt'));

  const noun = 56;
  const verb = 96;

  input[1] = noun;
  input[2] = verb;

  const result = processInput(input);
  console.log(`${result[0]}\n19690720`);
  console.log(100 * noun + verb);
};
