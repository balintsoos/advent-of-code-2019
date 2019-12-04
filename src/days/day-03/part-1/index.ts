import { readFileSync } from 'fs';
import { join } from 'path';
import { last, min } from 'ramda';

export type Coordinate = {
  posX: number;
  posY: number;
};

const ORIGO: Coordinate = { posX: 0, posY: 0 };

export const readLines = (filePath: string): string[][] => {
  const file = readFileSync(filePath, { encoding: 'utf8' });
  const lines = file.split('\n').map(line => line.split(','));
  return [lines[0], lines[1]];
};

export const newCoord = (currentCoord: Coordinate, direction: string): Coordinate => {
  switch (direction) {
    case 'U':
      return { posX: currentCoord.posX, posY: currentCoord.posY + 1 };

    case 'D':
      return { posX: currentCoord.posX, posY: currentCoord.posY - 1 };

    case 'L':
      return { posX: currentCoord.posX - 1, posY: currentCoord.posY };

    case 'R':
      return { posX: currentCoord.posX + 1, posY: currentCoord.posY };

    default:
      return currentCoord;
  }
};

export const buildCoords = (instructions: string[], origo: Coordinate): Coordinate[] => {
  const coords: Coordinate[] = [];
  instructions.forEach((instruction: string) => {
    const direction = instruction[0];
    const stepCount = parseInt(instruction.slice(1));
    for (let step = 0; step < stepCount; step++) {
      const currentCord = last(coords) ?? origo;
      coords.push(newCoord(currentCord, direction));
    }
  });
  return coords;
};

export const distance = (coordA: Coordinate, coordB: Coordinate): number => {
  return Math.abs(coordA.posX - coordB.posX) + Math.abs(coordA.posY - coordB.posY);
};

export const intersection = (listA: Coordinate[], listB: Coordinate[]): Coordinate[] =>
  listA.filter(coordA => !!listB.find(coordB => coordA.posX === coordB.posX && coordA.posY === coordB.posY));

export const processLines = (lines: string[][]): number => {
  return intersection(buildCoords(lines[0], ORIGO), buildCoords(lines[1], ORIGO))
    .map(intersection => distance(ORIGO, intersection))
    .reduce(min);
};

export default () => {
  const lines = readLines(join(__dirname, '../input.txt'));
  console.log(processLines(lines));
};
