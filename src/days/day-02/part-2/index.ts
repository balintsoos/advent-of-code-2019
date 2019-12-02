import { join } from 'path';
import { readInput, processInput } from '../part-1';

export default () => {
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const input = readInput(join(__dirname, '../input.txt'));
      input[1] = noun;
      input[2] = verb;
      processInput(input);
      if (input[0] === 19690720) {
        console.log({ noun, verb, result: 100 * noun + verb });
        return;
      }
    }
  }
};
