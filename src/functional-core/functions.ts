import type { Fruit, Catalog, OrderItem } from "./types";

// Génère un identifiant aléatoire
export const generateRandomNumberId = (): number => Math.floor(Math.random() * 10000);

// Vérifie si un objet est un fruit
export const isFruit = (value: unknown): value is Fruit => {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    "quantityInStock" in value &&
    "price" in value
  );
};

// Vérifie si une liste est un catalogue
export const isCatalog = (value: unknown): value is Catalog => {
  return Array.isArray(value) && value.every(isFruit);
};

// Ajoute un fruit au catalogue
export const addFruitToCatalog = (catalog: Catalog, fruit: Fruit): Catalog => {
  return [...catalog, fruit];
};

// Supprime un fruit par ID
export const removeFruitFromCatalog = (catalog: Catalog, fruitId: number): Catalog => {
  return catalog.filter((fruit) => fruit.id !== fruitId);
};

// Met à jour la quantité d'un fruit
export const updateAvailableFruitQuantity = (
  catalog: Catalog,
  fruitId: number,
  newQuantity: number
): Catalog => {
  return catalog.map((fruit) =>
    fruit.id === fruitId ? { ...fruit, quantityInStock: newQuantity } : fruit
  );
};

// Retourne un fruit par son ID
export const readFruitById = (catalog: Catalog, fruitId: number): Fruit | undefined => {
  return catalog.find((fruit) => fruit.id === fruitId);
};

// Retourne un fruit par son nom
export const readFruitByName = (catalog: Catalog, name: string): Fruit | undefined => {
  return catalog.find((fruit) => fruit.name.toLowerCase() === name.toLowerCase());
};

// Vend un fruit
export const sellFruit = (
  catalog: Catalog,
  fruitId: number,
  quantity: number
): { catalog: Catalog; soldFruit?: OrderItem } => {
  const fruit = catalog.find((fruit) => fruit.id === fruitId);

  if (!fruit || fruit.quantityInStock < quantity) {
    return { catalog };
  }

  const updatedCatalog = updateAvailableFruitQuantity(
    catalog,
    fruitId,
    fruit.quantityInStock - quantity
  );

  const soldFruit: OrderItem = {
    fruitId: fruit.id,
    quantity,
    unitPrice: fruit.price,
    amount: fruit.price * quantity,
  };

  return { catalog: updatedCatalog, soldFruit };
};

// Calcule le montant total d'une vente
export const calculateAmount = (orderItems: OrderItem[]): number => {
  return orderItems.reduce((total, item) => total + item.amount, 0);
};

// Calcule la valeur monétaire du stock
export const calculateStockAmount = (catalog: Catalog): number => {
  return catalog.reduce(
    (total, fruit) => total + fruit.quantityInStock * (fruit.price / 1.15),
    0
  );
};
