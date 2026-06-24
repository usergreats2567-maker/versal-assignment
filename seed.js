import connectDB from "./src/config/Db.js";
import Product from "./src/models/product.model.js";
import { faker } from "@faker-js/faker";

const categories = [
  "Electronics",
  "Books",
  "Clothing",
  "Sports",
  "Furniture",
  "Beauty",
  "Toys",
  "Food"
];

const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 10000;

const createProduct = () => ({
  name: faker.commerce.productName(),
  category: categories[Math.floor(Math.random() * categories.length)],
  price: Number(faker.commerce.price({ min: 5, max: 1000, dec: 2 }))
});

async function seed() {
  await connectDB();
  await Product.deleteMany({});
  console.log("Cleared existing products.");

  for (let inserted = 0; inserted < TOTAL_PRODUCTS; inserted += BATCH_SIZE) {
    const batchSize = Math.min(BATCH_SIZE, TOTAL_PRODUCTS - inserted);
    const batch = Array.from({ length: batchSize }, createProduct);
    await Product.insertMany(batch);
    console.log(`Inserted ${inserted + batchSize} / ${TOTAL_PRODUCTS} products.`);
  }

  console.log("Seeding complete.");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
