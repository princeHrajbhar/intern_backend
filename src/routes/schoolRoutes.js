const express = require("express");
const SchoolController = require("../controllers/schoolController");

const router = express.Router();

// Route to add a new school
router.post("/addSchool", SchoolController.addSchool);

// Route to list schools sorted by proximity
router.get("/listSchools", SchoolController.listSchools);

module.exports = router;
