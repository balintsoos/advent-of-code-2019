import { aperture, difference, allPass } from 'ramda';
import { getDigits, isSorted } from '../part-1';

export const hasExactlyOneDoubleDigits = (password: number): boolean => {
  const digits = getDigits(password);
  const doubleDigits = aperture(2, digits)
    .filter(([digitA, digitB]) => digitA === digitB)
    .map(([digit]) => digit);

  const tripleDigits = aperture(3, digits)
    .filter(([digitA, digitB, digitC]) => digitA === digitB && digitB === digitC)
    .map(([digit]) => digit);

  return !!difference(doubleDigits, tripleDigits).length;
};

export const isValidPassword = allPass([isSorted, hasExactlyOneDoubleDigits]);

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
