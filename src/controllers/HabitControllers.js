// controllers/HabitController.js
import mongoose from 'mongoose';
import Habit from '../models/Habit.js';
import { HttpResponse } from '../utils/HttpResponse.js';

// Get all public habits
export const GetPublicHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ isPublic: true })
      .populate('creatorID', 'name email photoURL')
      .sort({ createdAt: -1 }) // newest first
      .limit(6) // optional: limit for featured habits
      .select('-__v');

    return HttpResponse(
      res,
      200,
      false,
      'Public habits fetched successfully',
      habits
    );
  } catch (error) {
    console.error(error);
    return HttpResponse(res, 500, true, 'Internal Server Error');
  }
};

// Get a habit by ID
export const GetHabitByID = async (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponse(res, 400, true, 'Habit ID is required');
  if (!mongoose.Types.ObjectId.isValid(id))
    return HttpResponse(res, 400, true, 'Invalid habit ID format');

  try {
    const habit = await Habit.findById(id)
      .populate('creatorID', 'name email photoURL')
      .select('-__v');

    if (!habit) return HttpResponse(res, 404, true, 'Habit not found');

    return HttpResponse(res, 200, false, 'Habit fetched successfully', habit);
  } catch (error) {
    console.error(error);
    return HttpResponse(res, 500, true, 'Internal Server Error');
  }
};

// Create a new habit
export const CreateHabit = async (req, res) => {
  const {
    title,
    description,
    category,
    reminderTime,
    image,
    creatorID,
    isPublic,
  } = req.body;

  if (!title || !description || !category || !creatorID)
    return HttpResponse(
      res,
      400,
      true,
      'Title, Description, Category, and CreatorID are required'
    );

  try {
    const newHabit = new Habit({
      title,
      description,
      category,
      reminderTime: reminderTime || '',
      image: image || '',
      creatorID,
      isPublic: isPublic ?? false,
    });

    await newHabit.save();
    return HttpResponse(
      res,
      201,
      false,
      'Habit created successfully',
      newHabit
    );
  } catch (error) {
    console.error(error);
    return HttpResponse(res, 500, true, 'Internal Server Error');
  }
};

// Update an existing habit
export const UpdateHabit = async (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponse(res, 400, true, 'Habit ID is required');
  if (!mongoose.Types.ObjectId.isValid(id))
    return HttpResponse(res, 400, true, 'Invalid habit ID format');

  try {
    const existingHabit = await Habit.findById(id);
    if (!existingHabit) return HttpResponse(res, 404, true, 'Habit not found');

    // Authorization: only creator can update
    if (!existingHabit.creatorID.equals(req.user._id))
      return HttpResponse(
        res,
        403,
        true,
        'Unauthorized: Not the habit creator'
      );

    const { title, description, category, reminderTime, image, isPublic } =
      req.body;
    if (
      !title &&
      !description &&
      !category &&
      !reminderTime &&
      !image &&
      isPublic === undefined
    )
      return HttpResponse(
        res,
        400,
        true,
        'At least one field is required to update'
      );

    if (title) existingHabit.title = title;
    if (description) existingHabit.description = description;
    if (category) existingHabit.category = category;
    if (reminderTime) existingHabit.reminderTime = reminderTime;
    if (image) existingHabit.image = image;
    if (isPublic !== undefined) existingHabit.isPublic = isPublic;

    await existingHabit.save();
    return HttpResponse(
      res,
      200,
      false,
      'Habit updated successfully',
      existingHabit
    );
  } catch (error) {
    console.error(error);
    return HttpResponse(res, 500, true, 'Internal Server Error');
  }
};

// Delete a habit
export const DeleteHabit = async (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponse(res, 400, true, 'Habit ID is required');
  if (!mongoose.Types.ObjectId.isValid(id))
    return HttpResponse(res, 400, true, 'Invalid habit ID format');

  try {
    const existingHabit = await Habit.findById(id);
    if (!existingHabit) return HttpResponse(res, 404, true, 'Habit not found');

    // Authorization: only creator can delete
    if (!existingHabit.creatorID.equals(req.user._id))
      return HttpResponse(
        res,
        403,
        true,
        'Unauthorized: Not the habit creator'
      );

    await Habit.findByIdAndDelete(id);
    return HttpResponse(res, 200, false, 'Habit deleted successfully');
  } catch (error) {
    console.error(error);
    return HttpResponse(res, 500, true, 'Internal Server Error');
  }
};
