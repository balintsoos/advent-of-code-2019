import { aperture, any, all, allPass, pipe, toString, split, map } from 'ramda';

export const getDigits = pipe(
  toString,
  split(''),
  map(digit => parseInt(digit)),
);

export const isSorted = pipe(
  getDigits,
  aperture(2),
  all(([digitA, digitB]) => digitA <= digitB),
);

export const hasDoubleDigits = pipe(
  getDigits,
  aperture(2),
  any(([digitA, digitB]) => digitA === digitB),
);

export const isValidPassword = allPass([isSorted, hasDoubleDigits]);

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
