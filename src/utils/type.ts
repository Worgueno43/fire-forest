export type GridSize = {
  hauteur: number;
  largeur: number;
};

export type FirePosition = {
  x: number;
  y: number;
};

export type Case = FirePosition & {
  status: "forest" | "fire" | "ash";
};

export type FirePropagationReturn = {
  updatedGrid: Case[][];
  numberOfFires: number;
};
