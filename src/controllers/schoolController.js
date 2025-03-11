const SchoolModel = require("../models/schoolModel");
const { calculateDistance, validateCoordinates } = require("../utils/geoUtils");

class SchoolController {
  // Add a new school
  static async addSchool(req, res) {
    try {
      const { name, address, latitude, longitude } = req.body;

      // Input validation
      if (!name || !address) {
        return res.status(400).json({
          success: false,
          message: "Name and address are required",
        });
      }

      // Convert latitude and longitude to numbers
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);

      // Validate coordinates
      if (!validateCoordinates(lat, lng)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180",
        });
      }

      // Add school to database
      const schoolId = await SchoolModel.addSchool(name, address, lat, lng);

      res.status(201).json({
        success: true,
        message: "School added successfully",
        data: {
          id: schoolId,
          name,
          address,
          latitude: lat,
          longitude: lng,
        },
      });
    } catch (error) {
      console.error("Error in addSchool controller:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  }

  // List all schools sorted by proximity to given coordinates
  static async listSchools(req, res) {
    try {
      const { latitude, longitude } = req.query;

      // Input validation
      if (!latitude || !longitude) {
        return res.status(400).json({
          success: false,
          message: "Latitude and longitude are required query parameters",
        });
      }

      // Convert to numbers
      const userLat = parseFloat(latitude);
      const userLng = parseFloat(longitude);

      // Validate coordinates
      if (!validateCoordinates(userLat, userLng)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180",
        });
      }

      // Get all schools
      const schools = await SchoolModel.getAllSchools();

      // Calculate distance for each school and sort
      const schoolsWithDistance = schools.map((school) => {
        const distance = calculateDistance(
          userLat,
          userLng,
          school.latitude,
          school.longitude
        );

        return {
          ...school,
          distance: parseFloat(distance.toFixed(2)), // Round to 2 decimal places
        };
      });

      // Sort by distance (closest first)
      schoolsWithDistance.sort((a, b) => a.distance - b.distance);

      res.status(200).json({
        success: true,
        message: "Schools retrieved successfully",
        data: schoolsWithDistance,
      });
    } catch (error) {
      console.error("Error in listSchools controller:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
}

module.exports = SchoolController;
