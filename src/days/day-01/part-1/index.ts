import { inputObservable } from '../../../libs/input-observable';
import { join } from 'path';
import { map, reduce } from 'rxjs/operators';

export const calculateFuel = (mass: number): number => Math.floor(mass / 3) - 2;
export const add = (acc: number, value: number): number => acc + value;
export const sum = reduce(add, 0);

export default () =>
  inputObservable(join(__dirname, '../input.txt'))
    .pipe(map(calculateFuel))
    .pipe(sum)
    .subscribe((fuel: number) => console.log(fuel));
