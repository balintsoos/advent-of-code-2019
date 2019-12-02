import { reduce } from 'rxjs/operators';

export const add = (acc: number, value: number): number => acc + value;
export const sum = reduce(add, 0);
