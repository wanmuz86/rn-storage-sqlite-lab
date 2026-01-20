// src/db/productRepository.js
import { fetchProductsFromApi } from '../api/productApi';
import { getDatabase } from './database';


// Insert a single product from the form
// ORM (Realm) vs Pure SQLite = > Ensure that all is ok for the query 

export async function insertProduct({ name, price }) {
  const db = getDatabase();
  // Insert the data inside the DB 
  await db.execute(
    `INSERT INTO products (name, price) VALUES (?, ?)`,
    [name, price]
  );
}

// Simple DB Insertion

// Get all products as a plain JS array
// export async function getAllProducts() {
//   const db = getDatabase();
//    // Retrieve  the data inside the DB 
//   const result = await db.execute(`SELECT * FROM products`);

//   // op-sqlite returns rows as an array of objects
//   return result.rows ?? [];
// }

/// API Call + DB Caching. 
export async function getProducts() {
    // Connect to the DB
  const db = getDatabase();

  // 1) Read from SQLite cache
  // Can be changed to WHERE updatedAT = Date.now()+1 days
  const result = await db.execute(`SELECT * FROM products`);
  // Either I get null or data -> 
  // retrieved the data , store in cached
  const cached = result.rows ?? [];

  if (cached.length > 0) {
    return cached;
  }

  // 2) Cache miss → Fetch from API

  const apiProducts = await fetchProductsFromApi();

  // 3) Insert API response into SQLite
  for (const p of apiProducts) {
    await db.execute(
      `INSERT OR REPLACE INTO products (id, name, price, updatedAt)
       VALUES (?, ?, ?, ?)`,
      [p.id, p.name, p.price, p.updatedAt]
    );
  }

  // Return array of Object to the component
  return apiProducts;
}


// Delete one product by id
export async function deleteProduct(id) {
  const db = getDatabase();
   // Delete the given id from the DB 
  await db.execute(`DELETE FROM products WHERE id = ?`, [id]);
}

// Optional: clear all products
export async function clearProducts() {
  const db = getDatabase();
     // Delete all data
  await db.execute(`DELETE FROM products`);
}
