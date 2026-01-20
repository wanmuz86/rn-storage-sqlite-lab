// src/db/database.js
import { open } from '@op-engineering/op-sqlite';


// database.js is a singleton class that is used to ensure that there is only one connection to database at one time
// Singleton 

let db = null;


export const getDatabase = () => {
  if (!db) {
    db = open({ name: 'app.db' }); // sync open, no await needed
  }
  return db;
};

export const initDatabase = async () => {
    // get the database first, if the database exists then return the existing db to user
  const database = getDatabase();

  // if it does not exists, create it a
  // AUTOINCREMENT so user doesn’t have to provide id

  // Modify here for the first table creation
  await database.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
    updatedAt INTEGER
    );
  `);

  return database;
};
