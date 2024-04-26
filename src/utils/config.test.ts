import { defaultFirePosition, grid, propagationProbability } from "./config";

describe("Application should start without bad configuration", () => {
  describe("grid", () => {
    it("hauteur should be > 0", () => {
      expect(grid.hauteur).toBeGreaterThan(0);
    });

    it("largeur should be > 0", () => {
      expect(grid.largeur).toBeGreaterThan(0);
    });
  });

  describe("propagationProbability", () => {
    describe("propagationProbability should be beetween 0 and 1", () => {
      it("propagationProbability should be >= 0", () => {
        expect(propagationProbability).toBeGreaterThanOrEqual(0);
      });

      it("propagationProbability should be <= 1", () => {
        expect(propagationProbability).toBeLessThanOrEqual(1);
      });
    });
  });

  describe("defaultFirePosition", () => {
    it("defaultFirePosition length should be >= 1", () => {
      expect(defaultFirePosition.length).toBeGreaterThanOrEqual(1);
    });

    it("defaultFirePosition x should be >= 0", () => {
      defaultFirePosition.forEach(({ x }) => {
        expect(x).toBeGreaterThanOrEqual(0);
      });
    });

    it("defaultFirePosition y should be >= 0", () => {
      defaultFirePosition.forEach(({ y }) => {
        expect(y).toBeGreaterThanOrEqual(0);
      });
    });
  });
});
