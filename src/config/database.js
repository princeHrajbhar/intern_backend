const mysql = require("mysql2/promise");

// Create the connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to set up the database
async function setupDatabase() {
  try {
    // First, create the database if it doesn't exist
    const tempPool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    await tempPool.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );
    await tempPool.end();

    // Now create tables
    await createTables();

    console.log("Database setup completed successfully");
    return true;
  } catch (error) {
    console.error("Database setup failed:", error);
    throw error;
  }
}

// Function to create tables
async function createTables() {
  const createSchoolsTable = `
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  try {
    await pool.query(createSchoolsTable);
    console.log("Schools table created or already exists");
  } catch (error) {
    console.error("Error creating schools table:", error);
    throw error;
  }
}

module.exports = {
  pool,
  setupDatabase,
};
