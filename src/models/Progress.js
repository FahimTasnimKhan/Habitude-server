// models/Progress.js
import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    HabitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Habit',
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Progress = mongoose.model('Progress', ProgressSchema, 'progresses');
export default Progress;
// progresses is the Collection Name
