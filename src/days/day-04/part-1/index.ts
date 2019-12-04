import { aperture, any, all } from 'ramda';

export const isValidPassword = (password: number): boolean => {
  const digits = password
    .toString()
    .split('')
    .map(digit => parseInt(digit));
  const digitPairs = aperture(2, digits);
  const hasTwoSameDigits = any(([digitA, digitB]) => digitA === digitB, digitPairs);
  const isSorted = all(([digitA, digitB]) => digitA <= digitB, digitPairs);
  return hasTwoSameDigits && isSorted;
};

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
