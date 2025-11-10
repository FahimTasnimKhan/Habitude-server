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
      required: true,
      default: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
      },
    },
  },
  {
    timestamps: true,
  }
);

ProgressSchema.index({ UserId: 1, HabitId: 1, date: 1 }, { unique: true });

const Progress = mongoose.model('Progress', ProgressSchema, 'progresses');
export default Progress;
