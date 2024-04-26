import { defaultGrid, firePropagation } from "./tools";
import type { Case, FirePosition } from "./type";

describe("Application should be able to update fire propagation", () => {
  describe("defaultGrid", () => {
    it("should return void array if hauteur or lageur === 0", () => {
      const grid = { hauteur: 0, largeur: 5 };
      const firePosition: FirePosition[] = [];
      const result = defaultGrid(grid, firePosition);

      expect(result).toEqual([]);
    });

    it('should return Case[][] with "forest" status by default', () => {
      const grid = { hauteur: 3, largeur: 3 };
      const firePosition: FirePosition[] = [];
      const result = defaultGrid(grid, firePosition);
      const expectedGrid: Case[][] = [
        [
          { x: 0, y: 0, status: "forest" },
          { x: 1, y: 0, status: "forest" },
          { x: 2, y: 0, status: "forest" }
        ],
        [
          { x: 0, y: 1, status: "forest" },
          { x: 1, y: 1, status: "forest" },
          { x: 2, y: 1, status: "forest" }
        ],
        [
          { x: 0, y: 2, status: "forest" },
          { x: 1, y: 2, status: "forest" },
          { x: 2, y: 2, status: "forest" }
        ]
      ];

      expect(result).toEqual(expectedGrid);
    });

    it("should return Case[][] with 'fire' status in good position", () => {
      const grid = { hauteur: 3, largeur: 3 };
      const firePosition = [{ x: 1, y: 1 }];
      const result = defaultGrid(grid, firePosition);
      const expectedGrid = [
        [
          { x: 0, y: 0, status: "forest" },
          { x: 1, y: 0, status: "forest" },
          { x: 2, y: 0, status: "forest" }
        ],
        [
          { x: 0, y: 1, status: "forest" },
          { x: 1, y: 1, status: "fire" },
          { x: 2, y: 1, status: "forest" }
        ],
        [
          { x: 0, y: 2, status: "forest" },
          { x: 1, y: 2, status: "forest" },
          { x: 2, y: 2, status: "forest" }
        ]
      ];

      expect(result).toEqual(expectedGrid);
    });
  });

  describe("firePropagation", () => {
    it("should return void obeject if grid is empty", () => {
      const grid: Case[][] = [];
      const probability = 0.5;
      const result = firePropagation(grid, probability);

      expect(result).toEqual({ updatedGrid: [], numberOfFires: 0 });
    });

    it("should propagate the fire according to the given probability", () => {
      const grid: Case[][] = [
        [
          { x: 0, y: 0, status: "fire" },
          { x: 1, y: 0, status: "forest" }
        ],
        [
          { x: 0, y: 1, status: "forest" },
          { x: 1, y: 1, status: "forest" }
        ]
      ];
      const probability = 1;
      const { updatedGrid, numberOfFires } = firePropagation(grid, probability);

      // First case is on fire, and should be spread fire to the adjacent case
      expect(updatedGrid[0]![1]!.status).toBe("fire");
      expect(updatedGrid[1]![0]!.status).toBe("fire");
      expect(numberOfFires).toBe(2);
    });

    it("should not propagate the fire if probability is 0", () => {
      const grid: Case[][] = [
        [
          { x: 0, y: 0, status: "fire" },
          { x: 1, y: 0, status: "forest" }
        ],
        [
          { x: 0, y: 1, status: "forest" },
          { x: 1, y: 1, status: "forest" }
        ]
      ];
      const probability = 0; // Aucune propagation de feu
      const result = firePropagation(grid, probability);

      // Aucune case ne devrait être en feu
      expect(result.updatedGrid[0]![1]!.status).toBe("forest");
      expect(result.numberOfFires).toBe(0);
    });
  });
});
