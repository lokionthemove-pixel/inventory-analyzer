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
  inventory.sort((a, b) => b.quantity - a.quantity);
};

const sortPriceDescending = (inventory) => {
  inventory.sort((a, b) => b.price - a.price);
};

const inventory = [
  { name: "banana", category: "fruits", price: 15000, quantity: 11, pic: "🍌" },
  { name: "apple", category: "fruits", price: 25000, quantity: 26, pic: "🍎" },
  { name: "orange", category: "fruits", price: 30000, quantity: 38, pic: "🍊" },
  { name: "grape", category: "fruits", price: 40000, quantity: 19, pic: "🍇" },
  {
    name: "watermelon",
    category: "fruits",
    price: 18000,
    quantity: 3,
    pic: "🍉",
  },
  { name: "guava", category: "fruits", price: 12000, quantity: 0, pic: "🍐" },
  { name: "kiwi", category: "fruits", price: 45000, quantity: 40, pic: "🥝" },
  {
    name: "avocado",
    category: "fruits",
    price: 27000,
    quantity: 15,
    pic: "🥑",
  },
  {
    name: "chair",
    category: "furnitures",
    price: 40000,
    quantity: 13,
    pic: "🪑",
  },
  {
    name: "table",
    category: "furnitures",
    price: 70000,
    quantity: 5,
    pic: "🛋️",
  },
  {
    name: "cupboard",
    category: "furnitures",
    price: 270000,
    quantity: 4,
    pic: "🚪",
  },
  {
    name: "lightbulb",
    category: "electronics",
    price: 10000,
    quantity: 10,
    pic: "💡",
  },
];

// console.log(`
//     === INVENTORY ANALYZER ===

// Products:`);

// showByCategory(inventory);

// console.log(`
// === SUMMARY ===

// Total Items: ${calcInventoryQty(inventory)}
// Average Stock: ${calcAverageQty(inventory)}
// Highest Stock: \n${findHighestQty(inventory)}
// Lowest Stock: \n${findLowestQty(inventory)}

// === STOCK CONDITIONS ===

// Out of Stock: \n${inventory
//   .filter((item) => getProductStatus(item) == "out-of-stock")
//   .map(
//     (item) =>
//       `name: ${item.name}, category: ${item.category}, price: ${item.price}, quantity: ${item.quantity}`,
//   )
//   .join("\n")}

// Low Stock: \n${inventory
//   .filter((item) => getProductStatus(item) == "low")
//   .map(
//     (item) =>
//       `name: ${item.name}, category: ${item.category}, price: ${item.price}, quantity: ${item.quantity}`,
//   )
//   .join("\n")}

// Normal Stock: \n${inventory
//   .filter((item) => getProductStatus(item) == "normal")
//   .map(
//     (item) =>
//       `name: ${item.name}, category: ${item.category}, price: ${item.price}, quantity: ${item.quantity}`,
//   )
//   .join("\n")}

// High Stock: \n${inventory
//   .filter((item) => getProductStatus(item) == "high")
//   .map(
//     (item) =>
//       `name: ${item.name}, category: ${item.category}, price: ${item.price}, quantity: ${item.quantity}`,
//   )
//   .join("\n")}

// === INVENTORY STATUS ===

// ${getInventoryStatus(inventory).toUpperCase()}
//     `);

// change data structure: array of objects
// calculate: - Total number of items in stock
//            - Average quantity per product
//            - Highest-stock product
//            - Lowest-stock product
//            - Total inventory value (qty*price)

// Status for each product
// Product categories, show by category()
// search product by name(), check if product exists()
// Filter by status (out-of-stock, low, high, etc), filter by category

// New features:  - add new product,
//                - remove product,
//                - update product quantity,
//                - update price
//                -- just functions, no UI

// sorting by (qty ascending/price descending)
// update summary status to accomodate new data structure

// --------------------------------------------------------//
// element.querySelector(selector)
// element.querySelectorAll(selectors)
// const div = document.createElement("div");
// parentNode.appendChild(childNode)
// parentNode.insertBefore(newNode, referenceNode)
// parentNode.removeChild(child)
// // sets the indicated style rule to the element in the div variable
// div.style.color = "blue";

// // set the entire inline style
// div.setAttribute("style", "color: blue; background: white;");
// div.setAttribute("id", "theDiv");
// div.classList.add("new");
// div.classList.remove("new");
// div.classList.toggle("active");

const mainDiv = document.querySelector("#container");
const contentContainer = document.createElement("div");

const appHeader = document.createElement("h1");
appHeader.textContent = "INVENTORY ANALYZER";
appHeader.style = "text-align: center";
mainDiv.appendChild(appHeader);

const totalInventory = document.createElement("p");
totalInventory.innerHTML = `Total quantity: ${calcInventoryQty(inventory)}
<br>Inventory value: Rp.${calcInventoryValue(inventory)}`;
totalInventory.style = "text-align : center;";
mainDiv.appendChild(totalInventory);
mainDiv.appendChild(contentContainer);

const listCategory = (inventory) => {
  const categories = [];
  inventory.forEach((product) => {
    if (!categories.includes(product.category))
      categories.push(product.category);
  });
  return categories;
};

const showProduct = (inventory, element) => {
  const categories = listCategory(inventory);
  const categoryCard = [];
  categories.forEach((category) => {
    const element = document.createElement("div");
    const categoryHeader = document.createElement("h2");
    categoryHeader.textContent = category.toUpperCase();
    element.appendChild(categoryHeader);
    const content = document.createElement("div");
    element.appendChild(content);
    content.style.cssText =
      "display: grid; grid-template-columns: repeat(auto-fit, minmax(25%, 1fr)); gap: 20px; margin-bottom: 5%";
    categoryCard.push({
      element: element,
      content: content,
      category: category,
    });
  });

  categoryCard.forEach((item) => {
    element.appendChild(item.element);
    inventory.forEach((product) => {
      if (product.category == item.category) {
        const productStatus = getProductStatus(product);
        const parentCard = document.createElement("div");
        item.content.appendChild(parentCard);
        parentCard.style.cssText =
          "display: flex; flex-direction: column; text-align: center";
        const pic = document.createElement("h1");
        pic.textContent = product.pic;
        parentCard.appendChild(pic);
        const text = document.createElement("p");
        text.innerHTML = `Name: ${product.name}
    <br>Category: ${product.category}
    <br>Price: ${product.price}
    <br>Qty: ${product.quantity}
    <br><span id = 'status'>Status: ${productStatus}</span>`;
        parentCard.appendChild(text);
        let color =
          productStatus == "out-of-stock"
            ? "red"
            : productStatus == "low"
              ? "yellow"
              : productStatus == "normal"
                ? "green"
                : "blue";
        const status = text.querySelector("span");
        status.style.cssText = `background-color: ${color}`;
        if (!(color == "yellow")) {
          status.style.cssText += "; color: white";
        }
      }
    });
  });

  // inventory.forEach((product) => {
  //   const productStatus = getProductStatus(product);
  // const parentCard = document.createElement("div");
  // element.appendChild(parentCard);
  // parentCard.style =
  //   "display: flex; flex-direction: column; align-items: center; text-align: center";

  // const pic = document.createElement("h1");
  // pic.textContent = product.pic;
  // parentCard.appendChild(pic);
  // const text = document.createElement("p");
  // text.innerHTML = `Name: ${product.name}
  // <br>Category: ${product.category}
  // <br>Price: ${product.price}
  // <br>Qty: ${product.quantity}
  // <br><span id = 'status'>Status: ${productStatus}</span>`;
  // parentCard.appendChild(text);
  // let color =
  //   productStatus == "out-of-stock"
  //     ? "red"
  //     : productStatus == "low"
  //       ? "yellow"
  //       : productStatus == "normal"
  //         ? "green"
  //         : "blue";
  // const status = text.querySelector("span");
  // status.style.cssText = `background-color: ${color}`;
  // if (!(color == "yellow")) {
  //   status.style.cssText += "; color: white";
  // }
  // });
};

showProduct(inventory, contentContainer);
