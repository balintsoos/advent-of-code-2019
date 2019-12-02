import { inputObservable } from '../lib/input-observable';
import { join } from 'path';
import { map } from 'rxjs/operators';
import { calculateFuel } from '../lib/calculate-fuel';
import { sum } from '../lib/sum-operator';

export default () =>
  inputObservable(join(__dirname, '../input.txt'))
    .pipe(map(calculateFuel))
    .pipe(sum)
    .subscribe((fuel: number) => console.log(fuel));
