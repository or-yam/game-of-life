import './style.css';
import type { Grid } from './types';
import { calculateNextGrid, createGrid } from './utils';

const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight - 50;
const RESOLUTION_RATIO = 50;
const GENERATION_DELAY_MS = 200;
const LIVE_COLOR = 'rgb(255,20,147)';
const DEAD_COLOR = 'rgb(50,50,50)';

const restartButton = document.getElementById('restart-btn')!;
const startButton = document.getElementById('start-btn')!;

startButton.onclick = () => renderAnimation(grid);
restartButton.onclick = () => renderGrid(grid);

const canvas: HTMLCanvasElement = document.querySelector('canvas')!;
const canvasContext = canvas.getContext('2d')!;

canvas.width = CANVAS_WIDTH - (CANVAS_WIDTH % RESOLUTION_RATIO);
canvas.height = CANVAS_HEIGHT - (CANVAS_HEIGHT % RESOLUTION_RATIO);

let grid = createGrid(Math.floor(canvas.height / RESOLUTION_RATIO), Math.floor(canvas.width / RESOLUTION_RATIO));

const renderGrid = (grid: Grid) => {
  grid.forEach((column, x) => {
    column.forEach((_row, y) => {
      if (grid[x][y] === 1) {
        canvasContext.fillStyle = LIVE_COLOR;
      } else {
        canvasContext.fillStyle = DEAD_COLOR;
      }
      canvasContext.fillRect(x * RESOLUTION_RATIO, y * RESOLUTION_RATIO, RESOLUTION_RATIO - 1, RESOLUTION_RATIO - 1);
    });
  });
};

const renderAnimation = async (grid: Grid) => {
  await new Promise(resolve => setTimeout(resolve, GENERATION_DELAY_MS));

  grid.forEach((column, x) => {
    column.forEach((_row, y) => {
      if (grid[x][y] === 1) {
        canvasContext.fillStyle = LIVE_COLOR;
      } else {
        canvasContext.fillStyle = DEAD_COLOR;
      }
      canvasContext.fillRect(x * RESOLUTION_RATIO, y * RESOLUTION_RATIO, RESOLUTION_RATIO - 1, RESOLUTION_RATIO - 1);
    });
  });

  const nextGrid = calculateNextGrid(grid);
  requestAnimationFrame(() => renderAnimation(nextGrid));
};

renderGrid(grid);
