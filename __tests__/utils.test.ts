import { describe, it, expect, beforeAll } from 'vitest';
import { createGrid } from '../src/utils';
import { Grid } from '../src/types';

describe('Create Grid', () => {
  let grid: Grid;
  beforeAll(() => {
    grid = createGrid(4, 3);
  });

  it('should create grid', () => {
    expect(grid.length).toEqual(3);
    expect(grid[0].length).toEqual(4);
  });
  it('should create grid with only 0 or 1 values', () => {
    grid.forEach((column, x) => {
      column.forEach((_row, y) => {
        expect([0, 1]).toContain(grid[x][y]);
      });
    });
  });
});
function oneOf(arg0: number[]): any {
  throw new Error('Function not implemented.');
}
