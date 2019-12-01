import { inputObservable } from '../../../libs/input-observable';
import { join } from 'path';
import { reduce } from 'rxjs/operators';

export const calculateFuel = (mass: number): number => Math.floor(mass / 3) - 2;
export const accumulateFuels = (acc: number, mass: number): number => acc + calculateFuel(mass);

export default () =>
  inputObservable(join(__dirname, '../input.txt'))
    .pipe(reduce(accumulateFuels, 0))
    .subscribe((fuel: number) => console.log(fuel));
