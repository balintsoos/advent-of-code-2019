import { processLines } from './index';

describe('Day 6 Part 1', () => {
  describe('processInput', () => {
    it('should calculate result', () => {
      const input = [
        ['COM', 'B'],
        ['B', 'C'],
        ['C', 'D'],
        ['D', 'E'],
        ['E', 'F'],
        ['B', 'G'],
        ['G', 'H'],
        ['D', 'I'],
        ['E', 'J'],
        ['J', 'K'],
        ['K', 'L'],
      ];
      expect(processLines(input)).toEqual(42);
    });
  });
});
