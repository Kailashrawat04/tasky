const express = require("express");
const { registerUser,loginUser , getUserProfile, updateUserProfile } = require("../controllers/authControllers");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadModdleware");

const router = express.Router();

// Auth Routes
router.post("/register", registerUser); // Register User
router.post("/login", loginUser ); // Login User
router.get("/profile", protect, getUserProfile); // Get User Profile
router.put("/profile", protect, updateUserProfile); // Update Profile

router.post("/upload-image",upload.single ("image"),  (req, res) => {
   if (!req.file) {
    return res.status(400).send("No file uploaded.");
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
  }
);
module.exports = router;
