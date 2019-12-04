import { aperture, any, all, allPass } from 'ramda';

export const getDigits = (password: number): number[] => {
  return password
    .toString()
    .split('')
    .map(digit => parseInt(digit));
};

export const isSorted = (password: number): boolean => {
  const digitPairs = aperture(2, getDigits(password));
  return all(([digitA, digitB]) => digitA <= digitB, digitPairs);
};

export const hasDoubleDigits = (password: number): boolean => {
  const digitPairs = aperture(2, getDigits(password));
  return any(([digitA, digitB]) => digitA === digitB, digitPairs);
};

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
