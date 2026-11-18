//http://localhost:5003/api/auth/register


const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });


noteSchema.index({ userId: 1, createdAt: -1 });
noteSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Note', noteSchema);