import { buildCoords, distance } from './index';
import { intersection, min } from 'ramda';

export const print = (lines: string[][]): void => {
  const display: any = [];
  const displaySize = 50;
  const origo = { posX: 10, posY: 10 };

  for (let i = 0; i <= displaySize; i++) {
    display[i] = [];
    for (let j = 0; j <= displaySize; j++) {
      display[i][j] = '.';
    }
  }

  display[origo.posX][origo.posY] = 'O';

  const lineA = buildCoords(lines[0], origo);
  console.log('Line A', lineA);
  lineA.forEach(coord => {
    display[coord.posX][coord.posY] = 'A';
  });

  const lineB = buildCoords(lines[1], origo);
  console.log('Line B', lineB);
  lineB.forEach(coord => {
    display[coord.posX][coord.posY] = 'B';
  });

  for (let i = displaySize; i >= 0; i--) {
    let row = '';
    for (let j = 0; j <= displaySize; j++) {
      row += display[j][i];
    }
    console.log(row);
  }

  const intersections = intersection(buildCoords(lines[0], origo), buildCoords(lines[1], origo));
  console.log(intersections);
  const distances = intersections.map(intersection => distance(origo, intersection));
  console.log(distances);
  const minimum = distances.reduce((curr, value) => min(curr, value));
  console.log(minimum);
};
