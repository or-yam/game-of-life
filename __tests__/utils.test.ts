import { describe, it, expect, beforeAll } from 'vitest';
import { calculateNextGrid, createGrid, getSumOfLiveNeighbors } from '../src/utils';
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

describe('Next generation calculation', () => {
  const grid = createGrid(3, 3);

  describe('For a cell that is populated', () => {
    it('Each cell with one or no neighbors dies, as if by solitude', () => {
      grid[0][0] = 1;
      grid[0][1] = 0;
      grid[0][2] = 0;
      grid[1][0] = 0;
      grid[1][1] = 1;
      grid[1][2] = 0;
      grid[2][0] = 0;
      grid[2][1] = 0;
      grid[2][2] = 0;
      const nextGrid = calculateNextGrid(grid);
      expect(nextGrid[0][0]).toEqual(0);
      expect(nextGrid[1][1]).toEqual(0);
    });
    it('Each cell with four or more neighbors dies, as if by overpopulation', () => {
      grid[0][0] = 1;
      grid[0][1] = 0;
      grid[0][2] = 1;
      grid[1][0] = 1;
      grid[1][1] = 1;
      grid[1][2] = 0;
      grid[2][0] = 0;
      grid[2][1] = 1;
      grid[2][2] = 1;
      const nextGrid = calculateNextGrid(grid);
      expect(nextGrid[1][1]).toEqual(0);
    });
    it('Each cell with two or three neighbors survives', () => {
      grid[0][0] = 1;
      grid[0][1] = 0;
      grid[0][2] = 0;
      grid[1][0] = 0;
      grid[1][1] = 1;
      grid[1][2] = 0;
      grid[2][0] = 0;
      grid[2][1] = 1;
      grid[2][2] = 0;
      const nextGrid = calculateNextGrid(grid);
      expect(nextGrid[1][1]).toEqual(1);
    });
  });
  describe('For a cell that is empty or unpopulated', () => {
    it('Each cell with three neighbors becomes populated', () => {
      grid[0][0] = 1;
      grid[0][1] = 0;
      grid[0][2] = 0;
      grid[1][0] = 1;
      grid[1][1] = 0;
      grid[1][2] = 0;
      grid[2][0] = 0;
      grid[2][1] = 0;
      grid[2][2] = 1;
      const nextGrid = calculateNextGrid(grid);
      expect(nextGrid[1][1]).toEqual(1);
    });
  });
});

describe('Sum of live neighbors', () => {
  const grid = createGrid(3, 3);
  grid[0][0] = 1;
  grid[0][1] = 0;
  grid[0][2] = 1;
  grid[1][0] = 1;
  grid[1][1] = 1;
  grid[1][2] = 0;
  grid[2][0] = 0;
  grid[2][1] = 1;
  grid[2][2] = 1;
  it('should get the sum of 5 live neighbors', () => {
    const neighbors = getSumOfLiveNeighbors(grid, { x: 1, y: 1 });
    expect(neighbors).toEqual(5);
  });
  it('should treat undefined cells as 0', () => {
    const neighbors = getSumOfLiveNeighbors(grid, { x: 0, y: 0 });
    expect(neighbors).toEqual(2);
  });
});
