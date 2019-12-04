import { processLines } from './index';

describe('Day 3 Part 1', () => {
  describe('processInput', () => {
    [
      {
        input: [
          ['R8', 'U5', 'L5', 'D3'],
          ['U7', 'R6', 'D4', 'L4'],
        ],
        expected: 6,
      },
      {
        input: [
          ['R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72'],
          ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83'],
        ],
        expected: 159,
      },
    ].forEach(testCase => {
      it('should calculate result array', () => {
        expect(processLines(testCase.input)).toEqual(testCase.expected);
      });
    });
  });
});
