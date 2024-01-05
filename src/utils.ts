import type { CellValue, Grid } from './types';

export const undefinedToValue = (value: CellValue | undefined): CellValue => (value === undefined ? 0 : value);

export function createGrid(rows: number, columns: number): Grid {
  const grid: Grid = [];
  for (let x = 0; x < columns; x++) {
    grid[x] = [];
    for (let y = 0; y < rows; y++) {
      grid[x][y] = Math.floor(Math.random() * 2) as CellValue;
    }
  }
  return grid;
}

export function getSumOfLiveNeighbors(grid: Grid, cell: { x: number; y: number }): number {
  let sum = 0;
  for (let x = -1; x < 2; x++) {
    for (let y = -1; y < 2; y++) {
      if (x === cell.x && y === cell.y) break;
      const neighbor = grid[cell.x + x]?.[cell.y + y] ?? 0;
      sum += neighbor;
    }
  }
  return sum;
}

export function calculateNextGrid(grid: Grid): Grid {
  const nextGrid = [...grid];

  grid.forEach((column, x) => {
    column.forEach((_row, y) => {
      const numberOfLiveNeighbors = getSumOfLiveNeighbors(grid, { x, y });
      const cellState = grid[x][y];

      if (cellState === 0 && numberOfLiveNeighbors === 3) {
        nextGrid[x][y] = 1;
      } else if (cellState === 1) {
        if (numberOfLiveNeighbors < 2 || numberOfLiveNeighbors > 3) {
          nextGrid[x][y] = 0;
        } else if (numberOfLiveNeighbors === 2 || numberOfLiveNeighbors === 3) {
          nextGrid[x][y] = 1;
        } else {
          nextGrid[x][y] = cellState;
        }
      } else {
        nextGrid[x][y] = cellState;
      }
    });
  });

  return nextGrid;
}
