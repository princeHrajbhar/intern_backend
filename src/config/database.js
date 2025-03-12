const mysql = require("mysql2/promise");

// Create the connection pool using DB_URL
const pool = mysql.createPool(process.env.DB_URL);

// Function to set up the database
async function setupDatabase() {
  try {
    // First, create the database if it doesn't exist
    const tempPool = mysql.createPool({
      uri: process.env.DB_URL,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    const dbName = process.env.DB_URL.split('/').pop();

    await tempPool.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await tempPool.end();

    // Now create tables
    await createTables();

    console.log("✅ Database setup completed successfully");
    return true;
  } catch (error) {
    console.error("❌ Database setup failed:", error);
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
    console.log("✅ Schools table created or already exists");
  } catch (error) {
    console.error("❌ Error creating schools table:", error);
    throw error;
  }
}

module.exports = {
  pool,
  setupDatabase,
};
