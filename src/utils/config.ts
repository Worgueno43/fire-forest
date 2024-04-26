import type { FirePosition, GridSize } from "./type";

// Dimensions of the forest
const grid: GridSize = {
  hauteur: 10,
  largeur: 10
};

// Default fire postion in the forrest
const defaultFirePosition: FirePosition[] = [
  {
    x: 2,
    y: 4
  }
];

// Probability of fire spread
const propagationProbability: number = 0.2;

export { grid, defaultFirePosition, propagationProbability };
