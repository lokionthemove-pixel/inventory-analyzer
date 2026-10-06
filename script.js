// array 8 product names
// array stock quantity corresponding product
// calculate total item count, average stock quantity/product, highest stock, lowest stock
// count: out of stock (0), low stock (1-5), normal stock (6-20), high stock (21+)
// overall inventory status: "critical" <20, low 20-49, healthy 50-99, overstocked >100

const countAllItems = (quantity) => {
  return quantity.reduce((acc, curr) => {
    return acc + curr;
  });
};

const calcAverageQuantity = (quantity) => {
  return Math.round(countAllItems(quantity) / quantity.length);
};

const findLowestStock = (quantity) => {
  return quantity.reduce((lowest, compare) => {
    if (lowest > compare) {
      lowest = compare;
    }
    return lowest;
  });
};

const findHighestStock = (quantity) => {
  return quantity.reduce((highest, compare) => {
    if (highest < compare) {
      highest = compare;
    }
    return highest;
  });
};

const inventory = [
  "banana",
  "apple",
  "orange",
  "grape",
  "watermelon",
  "guava",
  "kiwi",
  "avocado",
];
const quantity = [11, 26, 38, 19, 3, 0, 40, 15];

const countOutOfStock = (quantity) => {
  return quantity.reduce((outOfStock, compare) => {
    if (compare == 0) {
      outOfStock++;
    }
    return outOfStock;
  }, 0);
};
const countLowStock = (quantity) => {
  return quantity.reduce((lowStock, compare) => {
    if (compare >= 1 && compare <= 5) {
      lowStock++;
    }
    return lowStock;
  }, 0);
};

const countNormalStock = (quantity) => {
  return quantity.reduce((normalStock, compare) => {
    if (compare >= 6 && compare <= 20) {
      normalStock++;
    }
    return normalStock;
  }, 0);
};

const countHighStock = (quantity) => {
  return quantity.reduce((highStock, compare) => {
    if (compare >= 21) {
      highStock++;
    }
    return highStock;
  }, 0);
};

const rateInventoryStatus = (quantity) => {
  const totalQuantity = countAllItems(quantity);
  return totalQuantity >= 100
    ? "overstocked"
    : totalQuantity >= 50
      ? "healthy"
      : totalQuantity >= 20
        ? "low"
        : "critical";
};

console.log(`
    === INVENTORY ANALYZER ===

Products:
${inventory[0]}: ${quantity[0]}
${inventory[1]}: ${quantity[1]}
${inventory[2]}: ${quantity[2]}
${inventory[3]}: ${quantity[3]}
${inventory[4]}: ${quantity[4]}
${inventory[5]}: ${quantity[5]}
${inventory[6]}: ${quantity[6]}
${inventory[7]}: ${quantity[7]}

=== SUMMARY ===

Total Items: ${countAllItems(quantity)}
Average Stock: ${calcAverageQuantity(quantity)}
Highest Stock: ${findHighestStock(quantity)}
Lowest Stock: ${findLowestStock(quantity)}

=== STOCK CONDITIONS ===

Out of Stock: ${countOutOfStock(quantity)}
Low Stock: ${countLowStock(quantity)}
Normal Stock: ${countNormalStock(quantity)}
High Stock: ${countHighStock(quantity)}

=== INVENTORY STATUS ===

${rateInventoryStatus(quantity).toUpperCase()}
    `);
