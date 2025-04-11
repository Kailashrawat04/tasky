const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImageUrl: { type: String, default: null },
  adminInviteToken: { type: String },
  role: { type: String, enum: ['admin', 'member'], default: 'member' }, // Fixed default to match enum
},
       {timestamps: true }
);

module.exports = mongoose.model('User', userSchema);