import { readFileSync } from 'fs';
import { join } from 'path';
import { last, min } from 'ramda';

export type Coordinate = {
  posX: number;
  posY: number;
  distance: number;
};

const ORIGO: Coordinate = { posX: 0, posY: 0, distance: 0 };

export const readLines = (filePath: string): string[][] => {
  const file = readFileSync(filePath, { encoding: 'utf8' });
  const lines = file.split('\n').map(line => line.split(','));
  return [lines[0], lines[1]];
};

export const newCoord = (currentCoord: Coordinate, direction: string): Coordinate => {
  switch (direction) {
    case 'U':
      return { posX: currentCoord.posX, posY: currentCoord.posY + 1, distance: currentCoord.distance + 1 };

    case 'D':
      return { posX: currentCoord.posX, posY: currentCoord.posY - 1, distance: currentCoord.distance + 1 };

    case 'L':
      return { posX: currentCoord.posX - 1, posY: currentCoord.posY, distance: currentCoord.distance + 1 };

    case 'R':
      return { posX: currentCoord.posX + 1, posY: currentCoord.posY, distance: currentCoord.distance + 1 };

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

export const intersection = (listA: Coordinate[], listB: Coordinate[]): Coordinate[] => {
  return listA
    .map(coordA => {
      const pair = listB.find(coordB => coordA.posX === coordB.posX && coordA.posY === coordB.posY);
      if (pair) {
        return { ...coordA, distance: coordA.distance + pair.distance };
      }
      return null;
    })
    .filter(coordA => !!coordA) as Coordinate[];
};

export const processLines = (lines: string[][]): number => {
  const lineA = buildCoords(lines[0], ORIGO);
  const lineB = buildCoords(lines[1], ORIGO);
  return intersection(lineA, lineB)
    .map(intersection => intersection.distance)
    .reduce(min);
};

export default () => {
  const lines = readLines(join(__dirname, '../input.txt'));
  console.log(processLines(lines));
};
