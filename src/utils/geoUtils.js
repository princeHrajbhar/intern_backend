/**
 * Calculate the distance between two points on Earth using the Haversine formula
 * @param {number} lat1 - Latitude of point 1 in degrees
 * @param {number} lon1 - Longitude of point 1 in degrees
 * @param {number} lat2 - Latitude of point 2 in degrees
 * @param {number} lon2 - Longitude of point 2 in degrees
 * @returns {number} - Distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  // Convert latitude and longitude from degrees to radians
  const radLat1 = (Math.PI * lat1) / 180;
  const radLon1 = (Math.PI * lon1) / 180;
  const radLat2 = (Math.PI * lat2) / 180;
  const radLon2 = (Math.PI * lon2) / 180;

  // Haversine formula
  const dLat = radLat2 - radLat1;
  const dLon = radLon2 - radLon1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(radLat1) *
      Math.cos(radLat2) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Earth's radius in kilometers
  const R = 6371;

  // Distance in kilometers
  const distance = R * c;

  return distance;
}

/**
 * Validate geographical coordinates
 * @param {number} latitude
 * @param {number} longitude
 * @returns {boolean} - True if coordinates are valid
 */
function validateCoordinates(latitude, longitude) {
  const validLatitude = !isNaN(latitude) && latitude >= -90 && latitude <= 90;
  const validLongitude =
    !isNaN(longitude) && longitude >= -180 && longitude <= 180;

  return validLatitude && validLongitude;
}

module.exports = {
  calculateDistance,
  validateCoordinates,
};
