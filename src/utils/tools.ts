import type {
  Case,
  FirePosition,
  FirePropagationReturn,
  GridSize
} from "./type";

export const defaultGrid = (
  grid: GridSize,
  firePosition: FirePosition[]
): Case[][] => {
  const gridArray: Case[][] = [];

  // Création de la grille avec les cases par défaut en "forest"
  for (let y = 0; y < grid.hauteur; y++) {
    const row: Case[] = [];
    for (let x = 0; x < grid.largeur; x++) {
      row.push({ x, y, status: "forest" });
    }
    gridArray.push(row);
  }

  // Placement des positions de feu par défaut.
  firePosition.forEach(({ x, y }) => {
    if (x >= 0 && x < grid.largeur && y >= 0 && y < grid.hauteur) {
      if (gridArray[y] && gridArray[y]![x]) gridArray[y]![x]!.status = "fire";
    }
  });

  return gridArray;
};

export const firePropagation = (
  grid: Case[][],
  probability: number
): FirePropagationReturn => {
  const height = grid.length;
  const width = grid[0]!.length;

  // Compteur pour le nombre de cases en feu
  let numberOfFires = 0;

  // Copie de la grille actuelle pour stocker les mises à jour sans affecter la grille d'entrée (pour ne pas allumer et éteindre un feu durant le même appel.)
  const updatedGrid: Case[][] = [];

  // Détection des nouvelles positions en feu
  const newFirePositions: FirePosition[] = [];

  // Parcours de chaque case dans la grille
  for (let y = 0; y < height; y++) {
    const row: Case[] = [];
    for (let x = 0; x < width; x++) {
      const currentCase = { ...grid[y]![x]! }; // Récupération de la case actuelle

      // Si la case est en feu, on propage le feu aux cases adjacentes avec une probabilité donnée
      if (currentCase.status === "fire") {
        // Définition des positions adjacentes
        const adjacentPositions: [number, number][] = [
          [x - 1, y], // Gauche
          [x + 1, y], // Droite
          [x, y - 1], // Haut
          [x, y + 1] // Bas
        ];

        // Pour chaque position adjacente, vérification et ajout de case en feu.
        adjacentPositions.forEach(([adjX, adjY]) => {
          // Vérification si la position est dans la grille
          if (adjX >= 0 && adjX < width && adjY >= 0 && adjY < height) {
            // Probabilité de propagation du feu
            if (Math.random() < probability) {
              // Si la case adjacente est une forêt, elle devient en feu
              if (grid[adjY]![adjX]!.status === "forest") {
                newFirePositions.push({ x: adjX, y: adjY });
              }
            }
          }
        });
      }

      // Si la case est en feu, elle devient en "ash" et ne peux plus être en feu.
      if (currentCase.status === "fire") {
        currentCase.status = "ash";
      }

      row.push(currentCase); // Ajout de la case mise à jour à la ligne
    }
    updatedGrid.push(row); // Ajout de la ligne à la grille mise à jour
  }

  // Mise à jour de la grille avec les nouvelles positions en feu
  newFirePositions.forEach(({ x, y }) => {
    updatedGrid[y]![x]!.status = "fire";
    numberOfFires++;
  });

  return { updatedGrid, numberOfFires };
};
