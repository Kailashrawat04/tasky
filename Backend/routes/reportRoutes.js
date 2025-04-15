const express = require('express');
const { protect, adminOnly } = require('../middlewares/authMiddleware.js');
const { exportTasksReport, exportUserReport } = require('../controllers/reportContollers.js');


const router = express.Router();
router.get("/export/tasks", protect, adminOnly, exportTasksReport);
router.get("/export/users", protect, adminOnly, exportUserReport);// export all users-task report

module.exports = router;