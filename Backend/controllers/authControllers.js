const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

 //@desc    Register a new user
 // @route   POST /api/auth/register
 // @access  Public
 //
const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl, adminInviteToken } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }
    
    // Validate and assign role
    let role = "member";
    if (adminInviteToken) {
      if (!process.env.ADMIN_INVITE_TOKEN) {
        console.error('ADMIN_INVITE_TOKEN is not configured in environment variables');
        return res.status(500).json({ 
          msg: "Admin registration is not properly configured",
          code: "ADMIN_CONFIG_MISSING" 
        });
      }
      if (adminInviteToken == process.env.ADMIN_INVITE_TOKEN) {
        role = "admin";
      } else {
        console.warn(`Invalid admin invite token attempt from ${email}`);
        return res.status(400).json({ 
          msg: "Invalid admin invite token",
          code: "INVALID_ADMIN_TOKEN" 
        });
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
      role,
    });

    // Return user data with JWT 
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      role: user.role,
      token: generateToken(user._id), 
    });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};


 // @desc    Login user
 //@route   POST /api/auth/login
 // @access  Public
 
const loginUser = async (req, res) => { 
  try{
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //Return user data with JWT
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      role: user.role,
      token: generateToken(user._id),
    });



} catch(err) {
  console.error(err);
  res.status(500).json({ message: "Server error" });
}};

// @desc    Get user profile
 // @route   GET /api/auth/profile
 //@access  Private (Requires JWT) 
const getUserProfile = async (req, res) => { 
  try{

   const user = await User.findById(req.user.id).select("-password");
   if (!user) {
     return res.status(404).json({ message: "User not found" });
   }

   res.json(user);
} catch(err) {
  console.error(err);
  res.status(500).json({ message: "Server error" });
}};

// @desc    Update user profile
 // @route   PUT /api/auth/profile
 //@access  Private (Requires JWT) 
const updateUserProfile = async (req, res) => { 
  try{
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profileImageUrl: updatedUser.profileImageUrl,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    });

  } catch(err) {
  console.error(err);
  res.status(500).json({ message: "Server error" });
}};



module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
    updateUserProfile,
};
