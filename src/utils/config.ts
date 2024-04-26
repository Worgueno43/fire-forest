import type { FirePosition, GridSize } from "./type";

// Dimensions of the forest (hauteur > 0, largeur > 0)
const grid: GridSize = {
  hauteur: 3,
  largeur: 3
};

// Default fire postion in the forrest /!\ (x >= 0, y >= 0)
const defaultFirePosition: FirePosition[] = [
  {
    x: 1,
    y: 1
  },
  {
    x: 0,
    y: 0
  }
];

// Probability of fire spread (0.0 to 1.0)
const propagationProbability: number = 0.3;

export { grid, defaultFirePosition, propagationProbability };
