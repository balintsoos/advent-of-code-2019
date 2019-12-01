import { Observable } from 'rxjs';
import readline from 'readline';
import { createReadStream } from 'fs';

export const inputObservable = (filePath: string): Observable<number> => {
  return new Observable<number>(subscriber => {
    const input = readline.createInterface({
      input: createReadStream(filePath, { encoding: 'utf8' }),
    });
    input.on('line', (line: string) => subscriber.next(parseInt(line)));
    input.on('close', () => subscriber.complete());
  });
};
