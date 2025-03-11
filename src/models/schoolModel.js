const { pool } = require("../config/database");

class SchoolModel {
  // Add a new school to the database
  static async addSchool(name, address, latitude, longitude) {
    try {
      const query =
        "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
      const [result] = await pool.query(query, [
        name,
        address,
        latitude,
        longitude,
      ]);
      return result.insertId;
    } catch (error) {
      console.error("Error adding school:", error);
      throw error;
    }
  }

  // Get all schools from the database
  static async getAllSchools() {
    try {
      const query = "SELECT * FROM schools";
      const [rows] = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error fetching schools:", error);
      throw error;
    }
  }

  // Get a school by ID
  static async getSchoolById(id) {
    try {
      const query = "SELECT * FROM schools WHERE id = ?";
      const [rows] = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error fetching school by ID:", error);
      throw error;
    }
  }
}

module.exports = SchoolModel;
