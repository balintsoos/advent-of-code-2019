import { aperture, difference, allPass, pipe, filter, map } from 'ramda';
import { getDigits, isSorted } from '../part-1';

export const getDoubleDigits = pipe(
  getDigits,
  aperture(2),
  filter(([digitA, digitB]) => digitA === digitB),
  map(([digit]) => digit),
);

export const getTripleDigits = pipe(
  getDigits,
  aperture(3),
  filter(([digitA, digitB, digitC]) => digitA === digitB && digitB === digitC),
  map(([digit]) => digit),
);

export const hasExactlyDoubleDigits = (password: number): boolean => {
  return !!difference(getDoubleDigits(password), getTripleDigits(password)).length;
};

export const isValidPassword = allPass([isSorted, hasExactlyDoubleDigits]);

export const generatePasswords = (lowest: number, highest: number): number[] => {
  const passwords: number[] = [];
  for (let password = lowest; password <= highest; password++) {
    if (isValidPassword(password)) {
      passwords.push(password);
    }
  }
  return passwords;
};

export const processInput = (lowest: number, highest: number): number => {
  return generatePasswords(lowest, highest).length;
};

export default () => {
  console.log(processInput(171309, 643603));
};
