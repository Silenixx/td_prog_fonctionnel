import { addFruitToCatalog, calculateStockAmount } from "../src/functional-core/functions";
import type { Catalog, Fruit } from "../src/functional-core/types";

describe("addFruitToCatalog", () => {
  it("Ajoute un fruit au catalogue", () => {
    const catalog: Catalog = [];
    const fruit: Fruit = { id: 1, name: "Pomme", quantityInStock: 100, price: 1.22 };
    const updatedCatalog = addFruitToCatalog(catalog, fruit);
    expect(updatedCatalog).toContain(fruit);
  });
});

describe("calculateStockAmount", () => {
  it("Calcule la valeur monétaire du stock", () => {
    const catalog: Catalog = [
      { id: 1, name: "Pomme", quantityInStock: 100, price: 1.22 },
    ];
    const stockValue = calculateStockAmount(catalog);
    expect(stockValue).toBeCloseTo(106.09); // 100 * (1.22 / 1.15)
  });
});
