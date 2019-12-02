import { inputObservable } from '../lib/input-observable';
import { join } from 'path';
import { map } from 'rxjs/operators';
import { calculateFuel } from '../lib/calculate-fuel';
import { sum } from '../lib/sum-operator';

const calculateTotalFuel = (mass: number): number => {
  const fuel = calculateFuel(mass);
  if (fuel > 0) {
    return fuel + calculateTotalFuel(fuel);
  }
  return 0;
}

export default () =>
  inputObservable(join(__dirname, '../input.txt'))
    .pipe(map(calculateTotalFuel))
    .pipe(sum)
    .subscribe((fuel: number) => console.log(fuel));
