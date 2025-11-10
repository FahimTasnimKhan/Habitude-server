import Progress from '../models/Progress.js';
import { HttpResponse } from '../utils/HttpResponse.js';
import {
  calculateStreak,
  getDaysCompletedThisMonth,
} from '../utils/progressUtils.js';

// ✅ Create new progress (prevent duplicates per day)
export const CreateProgressByUseridandHabitid = async (req, res) => {
  const { UserId, HabitId, date } = req.body;

  if (!UserId || !HabitId)
    return HttpResponse(res, 400, true, 'Both UserId and HabitId are required');

  try {
    // Normalize the date (midnight)
    const normalizedDate = date ? new Date(date) : new Date();
    normalizedDate.setHours(0, 0, 0, 0);

    // Optional: Prevent future dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (normalizedDate > today) {
      return HttpResponse(
        res,
        400,
        true,
        'Cannot create progress for a future date'
      );
    }

    // Check for existing progress in the same calendar day
    const startOfDay = new Date(normalizedDate);
    const endOfDay = new Date(normalizedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingProgress = await Progress.exists({
      UserId,
      HabitId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (existingProgress) {
      return HttpResponse(
        res,
        409,
        true,
        'You have already marked this habit as complete on this date'
      );
    }

    // Create the new progress record
    const newProgress = new Progress({
      UserId,
      HabitId,
      date: normalizedDate,
    });

    await newProgress.save();

    return HttpResponse(
      res,
      201,
      false,
      'Progress created successfully',
      newProgress
    );
  } catch (error) {
    console.error(error);

    // Handle duplicate key error (in case of race condition)
    if (error.code === 11000) {
      return HttpResponse(
        res,
        409,
        true,
        'Duplicate entry: You have already completed this habit on this date'
      );
    }

    return HttpResponse(res, 500, true, 'Internal Server Error');
  }
};

// ✅ Get all progress records for a user-habit pair
export const GetProgressByUseridandHabitid = async (req, res) => {
  const { UserId, HabitId } = req.params;

  if (!UserId || !HabitId)
    return HttpResponse(res, 400, true, 'Both UserId and HabitId are required');

  try {
    const progresses = await Progress.find({ UserId, HabitId })
      .populate([
        { path: 'UserId', select: 'name email photoURL' },
        { path: 'HabitId', select: 'title description category image' },
      ])
      .sort({ date: -1 });

    const streak = calculateStreak(progresses);
    const DaysCompleted = getDaysCompletedThisMonth(progresses);

    return HttpResponse(res, 200, false, 'Progresses fetched successfully', {
      progresses,
      streak,
      DaysCompleted,
    });
  } catch (error) {
    console.error(error);
    return HttpResponse(res, 500, true, 'Internal Server Error');
  }
};

// ✅ Delete a specific progress record by ID
export const DeleteProgressByID = async (req, res) => {
  const { id } = req.params;

  if (!id)
    return HttpResponse(res, 400, true, 'Progress ID is required for deletion');

  try {
    const existingProgress = await Progress.findById(id);
    if (!existingProgress)
      return HttpResponse(res, 404, true, 'Progress not found');

    await Progress.findByIdAndDelete(id);
    return HttpResponse(res, 200, false, 'Progress deleted successfully');
  } catch (error) {
    console.error(error);
    return HttpResponse(res, 500, true, 'Internal Server Error');
  }
};
