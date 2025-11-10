// models/Habit.js
import mongoose from 'mongoose';

const HabitSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Morning', 'Work', 'Fitness', 'Evening', 'Study'],
    },
    reminderTime: { type: String },
    image: { type: String, default: '' },
    creatorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Habit = mongoose.model('Habit', HabitSchema, 'habits');
export default Habit;
