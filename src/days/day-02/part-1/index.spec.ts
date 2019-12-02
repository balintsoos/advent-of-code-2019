import { processInput } from './index';

describe('Day 2 Part 1', () => {
  describe('processInput', () => {
    [
      {
        input: [99],
        expected: [99],
      },
      {
        input: [1, 0, 0, 0, 99],
        expected: [2, 0, 0, 0, 99],
      },
      {
        input: [2, 3, 0, 3, 99],
        expected: [2, 3, 0, 6, 99],
      },
      {
        input: [2, 4, 4, 5, 99, 0],
        expected: [2, 4, 4, 5, 99, 9801],
      },
      {
        input: [1, 1, 1, 4, 99, 5, 6, 0, 99],
        expected: [30, 1, 1, 4, 2, 5, 6, 0, 99],
      },
    ].forEach(testCase => {
      it('should calculate result array', () => {
        expect(processInput(testCase.input)).toEqual(testCase.expected);
      });
    });
  });
});
