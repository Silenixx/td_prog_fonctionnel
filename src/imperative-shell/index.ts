import {
    generateRandomNumberId,
    addFruitToCatalog,
    removeFruitFromCatalog,
    updateAvailableFruitQuantity,
    readFruitByName,
    readFruitById,
    sellFruit,
    calculateAmount,
    calculateStockAmount,
  } from "../functional-core/functions";
import type { Catalog, OrderItem } from "../functional-core/types";

// 1. Constitution du catalogue et du stock initial contenant 3 types de fruits :
let catalog: Catalog = [
{ id: generateRandomNumberId(), name: "Pomme", quantityInStock: 100, price: 1.22 },
{ id: generateRandomNumberId(), name: "Poire", quantityInStock: 50, price: 2.30 },
{ id: generateRandomNumberId(), name: "Ananas", quantityInStock: 30, price: 2.90 },
];
console.log("Étape 1: Catalogue initial :", catalog);

// 2. Affichage de la valeur du stock
console.log("Étape 2: Valeur initiale du stock :", calculateStockAmount(catalog));

// 3. Ajout de 30 barquettes de fraises au stock (à 7€ l'unité)
const fraiseId = generateRandomNumberId();
catalog = addFruitToCatalog(catalog, {
id: fraiseId,
name: "Fraise",
quantityInStock: 30,
price: 7.00,
});
console.log("Étape 3: Catalogue après ajout des fraises :", catalog);

// 4. Recherche d'une référence de fruit nommé "Fraise"
const fraise = readFruitByName(catalog, "Fraise");
console.log("Étape 4: Recherche de 'Fraise' :", fraise || "Non trouvé");

// 5. Recherche d'un fruit dont l'id est 666
const fruit666 = readFruitById(catalog, 666);
console.log("Étape 5: Recherche d'un fruit avec l'ID 666 :", fruit666 || "Aucun fruit trouvé");

// 6. Suppression des fraises du catalogue
if (fraise) {
catalog = removeFruitFromCatalog(catalog, fraise.id);
console.log("Étape 6: Catalogue après suppression des fraises :", catalog);
} else {
console.log("Étape 6: Impossible de supprimer, 'Fraise' introuvable.");
}

// 7. Mise à jour de la quantité disponible d'ananas (10)
const ananas = catalog.find((fruit) => fruit.name === "Ananas");
if (ananas) {
    catalog = updateAvailableFruitQuantity(catalog, ananas.id, 10);
    console.log("Étape 7: Catalogue après mise à jour des ananas :", catalog);
    } else {
    console.log("Étape 7: 'Ananas' introuvable.");
}

// 8. Vente de 5 ananas
let soldItems: OrderItem[] = [];
if (ananas) {
    const result = sellFruit(catalog, ananas.id, 5);
    catalog = result.catalog;
    if (result.soldFruit) soldItems.push(result.soldFruit);
    console.log("Étape 8: Vente de 5 ananas réalisée :", result.soldFruit);
    } else {
    console.log("Étape 8: 'Ananas' introuvable, impossible de vendre.");
}

// 9. Ajout de 10 melons au stock, à 4.04€ l'unité
const melonId = generateRandomNumberId();
catalog = addFruitToCatalog(catalog, {
    id: melonId,
    name: "Melon",
    quantityInStock: 10,
    price: 4.04,
});
console.log("Étape 9: Catalogue après ajout des melons :", catalog);

// 10. Vente de 10 ananas et 2 melons
if (ananas) {
    const saleAnanas = sellFruit(catalog, ananas.id, 10);
    catalog = saleAnanas.catalog;
    if (saleAnanas.soldFruit) soldItems.push(saleAnanas.soldFruit);
    console.log("Étape 10: Vente de 10 ananas réalisée :", saleAnanas.soldFruit);
    } else {
    console.log("Étape 10: 'Ananas' introuvable, impossible de vendre.");
}

const melon = catalog.find((fruit) => fruit.name === "Melon");
if (melon) {
    const saleMelon = sellFruit(catalog, melon.id, 2);
    catalog = saleMelon.catalog;
    if (saleMelon.soldFruit) soldItems.push(saleMelon.soldFruit);
    console.log("Étape 10: Vente de 2 melons réalisée :", saleMelon.soldFruit);
} else {
    console.log("Étape 10: 'Melon' introuvable, impossible de vendre.");
}

// 11. Mise à jour de la quantité disponible de pommes (10)
const pomme = catalog.find((fruit) => fruit.name === "Pomme");
if (pomme) {
    catalog = updateAvailableFruitQuantity(catalog, pomme.id, 10);
    console.log("Étape 11: Catalogue après mise à jour des pommes :", catalog);
} else {
    console.log("Étape 11: 'Pomme' introuvable.");
}

// 12. Suppression de l'ananas du catalogue
if (ananas) {
    catalog = removeFruitFromCatalog(catalog, ananas.id);
    console.log("Étape 12: Catalogue après suppression des ananas :", catalog);
} else {
    console.log("Étape 12: 'Ananas' introuvable, impossible de supprimer.");
}

// 13. Vente de 2 barquettes de fraises, 1 melon
const fraiseAgain = readFruitByName(catalog, "Fraise");
if (fraiseAgain) {
    const saleFraise = sellFruit(catalog, fraiseAgain.id, 2);
    catalog = saleFraise.catalog;
    if (saleFraise.soldFruit) soldItems.push(saleFraise.soldFruit);
    console.log("Étape 13: Vente de 2 barquettes de fraises réalisée :", saleFraise.soldFruit);
} else {
    console.log("Étape 13: 'Fraise' introuvable, impossible de vendre.");
}

if (melon) {
    const saleMelonAgain = sellFruit(catalog, melon.id, 1);
    catalog = saleMelonAgain.catalog;
    if (saleMelonAgain.soldFruit) soldItems.push(saleMelonAgain.soldFruit);
    console.log("Étape 13: Vente de 1 melon réalisée :", saleMelonAgain.soldFruit);
} else {
    console.log("Étape 13: 'Melon' introuvable, impossible de vendre.");
}

// 14. Affichage de la valeur de la vente
console.log("Étape 14: Valeur totale des ventes :", calculateAmount(soldItems));

// 15. Affichage du stock final
console.log("Étape 15: Stock final :", catalog);
  