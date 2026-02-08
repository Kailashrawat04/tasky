const express = require('express');
const{ protect, adminOnly } = require('../middlewares/authMiddleware.js');
const{ getUsers, getUserById, deleteUser } = require('../controllers/userContollers');

const router = express.Router();    

// User management routes
router.get("/", protect ,adminOnly, getUsers); // Get all users(admin only)
router.get("/:id", protect ,adminOnly, getUserById); // Get a specific user 
router.delete("/:id", protect ,adminOnly, deleteUser); // Delete a specific user

module.exports = router;