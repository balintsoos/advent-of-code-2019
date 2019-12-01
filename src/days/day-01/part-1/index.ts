import { inputObservable } from '../../../libs/input-observable';
import { join } from 'path';
import { reduce } from 'rxjs/operators';

const calculateFuel = (mass: number): number => Math.floor(mass / 3) - 2;
const accumulateFuels = (acc: number, mass: number): number => acc + calculateFuel(mass);

inputObservable(join(__dirname, '../input.txt'))
  .pipe(reduce(accumulateFuels, 0))
  .subscribe((fuel: number) => console.log(fuel));
