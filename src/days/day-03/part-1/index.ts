import { readFileSync } from 'fs';
import { join } from 'path';
import { last, intersection, min } from 'ramda';

export type Coordinate = {
  posX: number;
  posY: number;
};

export const readLines = (filePath: string): string[][] => {
  const file = readFileSync(filePath, { encoding: 'utf8' });
  const lines = file.split('\n').map(line => line.split(','));
  return [lines[0], lines[1]];
};

export const buildCoords = (instructions: string[]): Coordinate[] => {
  const coords: Coordinate[] = [];
  instructions.forEach((instruction: string) => {
    const direction = instruction[0];
    const stepCount = parseInt(instruction[1]);
    const currentCoord = last(coords) ?? { posX: 0, posY: 0 };
    switch (direction) {
      case 'U':
        for (let step = 0; step < stepCount; step++) {
          coords.push({ posX: currentCoord.posX, posY: currentCoord.posY + 1 });
        }
        break;

      case 'D':
        for (let step = 0; step < stepCount; step++) {
          coords.push({ posX: currentCoord.posX, posY: currentCoord.posY - 1 });
        }
        break;

      case 'L':
        for (let step = 0; step < stepCount; step++) {
          coords.push({ posX: currentCoord.posX - 1, posY: currentCoord.posY });
        }
        break;

      case 'R':
        for (let step = 0; step < stepCount; step++) {
          coords.push({ posX: currentCoord.posX + 1, posY: currentCoord.posY });
        }
        break;

      default:
        break;
    }
  });
  return coords;
};

export const distanceFromOrigo = (coord: Coordinate): number => {
  return Math.abs(coord.posX) + Math.abs(coord.posY);
};

export const processLines = (lines: string[][]): number => {
  return intersection(buildCoords(lines[0]), buildCoords(lines[1]))
    .map(distanceFromOrigo)
    .reduce(min);
};

export default () => {
  const lines = readLines(join(__dirname, '../input.txt'));
  console.log(processLines(lines));
};
