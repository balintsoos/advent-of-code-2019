import { readFileSync } from 'fs';
import { join } from 'path';
import { pipe, split, map, reject, isEmpty } from 'ramda';

export type Graph = {
  [key: string]: string;
};

export const readFile = (filePath: string) => readFileSync(filePath, { encoding: 'utf8' });

export const readLines = pipe(readFile, split('\n'), reject(isEmpty), map(split(')')));

export const buildGraph = (lines: string[][]): Graph => {
  const graph: Graph = {};
  lines.forEach(line => {
    graph[line[1]] = line[0];
  });
  return graph;
};

export const traverse = (graph: Graph, key: string, count: number): number => {
  const nextKey = graph[key];
  if (nextKey === 'COM') {
    return count;
  }
  return traverse(graph, nextKey, count + 1);
};

export const calculateSum = (graph: Graph) => (accumulatedSum: number, currentKey: string): number => {
  const count = traverse(graph, currentKey, 1);
  return accumulatedSum + count;
};

export const processLines = (lines: string[][]): number => {
  const graph = buildGraph(lines);
  return Object.keys(graph).reduce(calculateSum(graph), 0);
};

export default () => {
  const lines = readLines(join(__dirname, '../input.txt'));
  console.log(processLines(lines));
};
