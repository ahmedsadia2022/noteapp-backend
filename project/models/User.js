const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  interests: [{ type: String }] 
}, { timestamps: true });


userSchema.index({ role: 1, createdAt: -1 }); 

userSchema.index({ interests: 1 });

module.exports = mongoose.model('User', userSchema);