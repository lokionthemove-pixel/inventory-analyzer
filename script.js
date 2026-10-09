const calcInventoryQty = (inventory) => {
  return inventory.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);
};

const calcAverageQty = (inventory) => {
  return calcInventoryQty(inventory) / inventory.length;
};

const findLowestQty = (inventory) => {
  let lowestStock = inventory[0];
  inventory.forEach((element) => {
    if (lowestStock.quantity > element.quantity) {
      lowestStock = element;
    }
  });
  return `Name: ${lowestStock.name}, category: ${lowestStock.category}, price: ${lowestStock.price}, quantity: ${lowestStock.quantity}`;
};

const findHighestQty = (inventory) => {
  let highestStock = inventory[0];
  inventory.forEach((element) => {
    if (highestStock.quantity < element.quantity) {
      highestStock = element;
    }
  });
  return `Name: ${highestStock.name}, category: ${highestStock.category}, price: ${highestStock.price}, quantity: ${highestStock.quantity}`;
};

const calcInventoryValue = (inventory) => {
  return inventory.reduce((totalValue, current) => {
    totalValue += current.price * current.quantity;
    return totalValue;
  }, 0);
};

const getInventoryStatus = (inventory) => {
  const totalQuantity = calcInventoryQty(inventory);
  return totalQuantity >= 100
    ? "overstocked"
    : totalQuantity >= 50
      ? "healthy"
      : totalQuantity >= 20
        ? "low"
        : "critical";
};

const getProductStatus = (product) => {
  return product.quantity > 20
    ? "high"
    : product.quantity >= 6
      ? "normal"
      : product.quantity >= 1
        ? "low"
        : "out-of-stock";
};

const filterByCategory = (inventory, category) => {
  const productsInCategory = [];
  inventory.forEach((product) => {
    if (category === product.category) {
      productsInCategory.push(product);
    }
  });
  return productsInCategory;
};

const showByCategory = (inventory) => {
  let category;
  inventory.forEach((product) => {
    if (category != product.category) {
      category = product.category;
      console.log("\n" + category.toUpperCase());
    }
    console.log(product);
  });
};

const getProductByName = (inventory, productName) => {
  return inventory.find((product) => product.name === productName);
};

const isExist = (inventory, productName) => {
  if (getProductByName(inventory, productName)) return true;
  else return false;
};

const filterByStatus = (inventory, status) => {
  const filterResult = [];
  inventory.forEach((product) => {
    if (getProductStatus(product) === status) filterResult.push(product);
  });
  return filterResult;
};

const showArray = (arr) => arr.forEach((item) => console.log(item));

const addNewProduct = (
  inventory,
  productName,
  productCategory,
  productPrice = 0,
  productQty = 0,
) => {
  const newProduct = {
    name: productName,
    category: productCategory,
    price: productPrice,
    quantity: productQty,
  };
  inventory.push(newProduct);
  console.log(`${productName} is succesfully added!`);
};

const removeProduct = (inventory, productName) => {
  const removedProduct = inventory.find(
    (product) => product.name === productName,
  );
  inventory.splice(inventory.indexOf(removedProduct), 1);
  console.log(`${productName} is removed succesfully!`);
};

const updateProduct = (inventory, productName, key, value) => {
  if (!["name", "category", "price", "quantity"].includes(key))
    return console.error("Invalid property!");
  inventory.find((product) => product.name === productName)[key] = value;
};

const sortQtyAscending = (inventory) => {
  inventory.sort((a, b) => a.name.localeCompare(b.name));
};

const sortPriceDescending = (inventory) => {
  inventory.sort((a, b) => b.price - a.price);
};

const inventory = [
  { name: "banana", category: "fruits", price: 15000, quantity: 11 },
  { name: "apple", category: "fruits", price: 25000, quantity: 26 },
  { name: "orange", category: "fruits", price: 30000, quantity: 38 },
  { name: "grape", category: "fruits", price: 40000, quantity: 19 },
  { name: "watermelon", category: "fruits", price: 18000, quantity: 3 },
  { name: "guava", category: "fruits", price: 12000, quantity: 0 },
  { name: "kiwi", category: "fruits", price: 45000, quantity: 40 },
  { name: "avocado", category: "fruits", price: 27000, quantity: 15 },
  { name: "chair", category: "furnitures", price: 40000, quantity: 13 },
  { name: "table", category: "furnitures", price: 70000, quantity: 5 },
  { name: "cupboard", category: "furnitures", price: 270000, quantity: 4 },
  { name: "lightbulb", category: "electronics", price: 10000, quantity: 10 },
];

console.log(`
    === INVENTORY ANALYZER ===

Products:`);

showByCategory(inventory);

console.log(`
=== SUMMARY ===

Total Items: ${calcInventoryQty(inventory)}
Average Stock: ${calcAverageQty(inventory)}
Highest Stock: \n${findHighestQty(inventory)}
Lowest Stock: \n${findLowestQty(inventory)}

=== STOCK CONDITIONS ===

Out of Stock: \n${inventory
  .filter((item) => getProductStatus(item) == "out-of-stock")
  .map(
    (item) =>
      `name: ${item.name}, category: ${item.category}, price: ${item.price}, quantity: ${item.quantity}`,
  )
  .join("\n")}
  
Low Stock: \n${inventory
  .filter((item) => getProductStatus(item) == "low")
  .map(
    (item) =>
      `name: ${item.name}, category: ${item.category}, price: ${item.price}, quantity: ${item.quantity}`,
  )
  .join("\n")}

Normal Stock: \n${inventory
  .filter((item) => getProductStatus(item) == "normal")
  .map(
    (item) =>
      `name: ${item.name}, category: ${item.category}, price: ${item.price}, quantity: ${item.quantity}`,
  )
  .join("\n")}
  
High Stock: \n${inventory
  .filter((item) => getProductStatus(item) == "high")
  .map(
    (item) =>
      `name: ${item.name}, category: ${item.category}, price: ${item.price}, quantity: ${item.quantity}`,
  )
  .join("\n")}

=== INVENTORY STATUS ===

${getInventoryStatus(inventory).toUpperCase()}
    `);

// change data structure: array of objects        v
// calculate: - Total number of items in stock    v
//            - Average quantity per product      v
//            - Highest-stock product             v
//            - Lowest-stock product              v
//            - Total inventory value (qty*price) v

// Status for each product                                                v
// Product categories, show by category()                                 v
// search product by name(), check if product exists()                    v
// Filter by status (out-of-stock, low, high, etc), filter by category    v

// New features:  - add new product,                        v
//                - remove product,                         v
//                - update product quantity,                v
//                - update price                            v
//                -- just functions, no UI

// sorting by (qty ascending/price descending)              v
// update summary status to accomodate new data structure
